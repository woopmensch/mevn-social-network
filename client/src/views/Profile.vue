<template>
    <div id="profile">
        <h1 class="uk-text-primary">Profile</h1>
        <div class="uk-flex uk-flex-column uk-flex-center uk-flex-middle">
            <span uk-icon="user" width="100"></span>
            <span class="uk-card-title">{{user.name}}</span>
            <span class="uk-text-meta">@{{user._id}}</span>
            <p>{{user.status}}</p>
        </div>
        <CreatePost v-if="isProfilePersonal" @newPost="fetchNewPost"></CreatePost>
        <ul class="uk-tab">
            <li ref="userPosts" @click="fetchPostsByUser()">
                <a>My posts</a>
            </li>
            <li ref="likedPosts" @click="fetchLikedPosts()">
                <a>Liked posts</a>
            </li>
        </ul>
        <div v-if="activeTab === 'userPosts'">
            <Post
                class="uk-animation-fade"
                v-for="post in posts"
                v-bind:key="post._id"
                :post="post"
                :ref="post._id"
            ></Post>
        </div>
        <div v-if="activeTab === 'likedPosts'">
            <Post
                class="uk-animation-fade"
                v-for="post in posts"
                v-bind:key="post._id"
                :post="post"
                :ref="post._id"
            ></Post>
        </div>
    </div>
</template>

<script>
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import UserService from "../services/UserService";
import PostsService from "../services/PostsService";
import { mapState } from "vuex";

export default {
    props: ["userId"],
    name: "home",
    components: {
        CreatePost,
        Post
    },

    data: function() {
        return {
            user: {},
            posts: [],
            newPostText: "",
            activeTab: "userPosts"
        };
    },

    computed: {
        ...mapState(["currentUser"]),
        isProfilePersonal: function() {
            return this.currentUser._id === this.userId ? true : false;
        }
    },

    methods: {
        async fetchUserData() {
            this.user = await UserService.fetchUserById(this.userId);
            console.log(this.userId)
        },

        async fetchPostsByUser() {
            this.posts = await PostsService.fetchPostsByUser(this.userId);
            this.activeTab = "userPosts";
            this.$refs.likedPosts.classList.remove("uk-active");
            this.$refs.userPosts.classList.add("uk-active");
        },

        async fetchLikedPosts() {
            this.posts = await PostsService.fetchLikedPosts(this.userId);
            this.activeTab = "likedPosts";
            this.$refs.userPosts.classList.remove("uk-active");
            this.$refs.likedPosts.classList.add("uk-active");
        },

        fetchNewPost(data) {
            this.posts.unshift(data);
        }
    },

    mounted() {
        this.fetchUserData();
        this.fetchPostsByUser();
    },

    sockets: {
        deletePost: function(data) {
            const post = this.posts.filter(post => post._id === data);
            const postIndex = this.posts.indexOf(...post);
            this.posts.splice(postIndex, 1);
        },
        togglePostLike: function(data) {
            const post = this.posts.filter(
                post => post._id === data.targetPost
            );
            const postIndex = this.posts.indexOf(...post);
            this.posts[postIndex].likes = data.likes;
        },
        // updatePost: function(data) {
        //     const postId = data._id;
        //     const oldPost = this.posts.filter(i => i._id === postId);
        //     const oldPostIndex = this.posts.indexOf(...oldPost);
        //     Object.assign(this.posts[oldPostIndex], data);
        // },
        newComment: function(data) {
            const postId = data.post._id;
            const postComponent = this.$refs[postId][0];
            const post = postComponent.post;
            const postComments = postComponent.comments;
            Object.assign(post, data.post);
            postComments.push(data.comment);
        },
        toggleCommentLike: function(data) {
            const post = this.$refs[data.targetPost];
            const comment = post[0].comments.filter(
                comment => comment._id === data.targetComment
            );
            comment[0].likes = data.likes;
        },
        deleteComment: function(data) {
            const postId = data.targetPost._id;
            const postComponent = this.$refs[postId][0];
            const post = postComponent.post;
            const comments = postComponent.comments;
            const comment = comments.filter(comment => comment._id === data);
            const commentIndex = comments.indexOf(...comment);
            Object.assign(post, data.targetPost);
            comments.splice(commentIndex, 1);
        }
    },

    watch: {
        "$route.params.userId": function() {
            this.fetchUserData();
            this.fetchPostsByUser();
        }
    }
};
</script>