<template>
    <div id="profile">
        <h1 class="page__title">Profile</h1>
        <div class="user-info">
            <ul class="user-info__list">
                <li class="user-info__list-item">
                    <ion-icon name="person-circle-outline" class="user-info__avatar" />
                </li>
                <li class="user-info__list-item">
                    <span class="user-info__name">{{user.name}}</span>
                </li>
                <li class="user-info__list-item">
                    <span class="user-info__id">@{{user._id}}</span>
                </li>
                <li class="user-info__list-item">
                    <span class="user-info__status">{{user.status}}</span>
                </li>
            </ul>
        </div>

        <CreatePost v-if="isProfilePersonal" @newPost="fetchNewPost"></CreatePost>

        <div class="post-tabs">
            <ul class="post-tabs__list">
                <li
                    :class="[activeTab === 'userPosts' ? 'post-tabs__list-item--active' : '']"
                    class="post-tabs__list-item"
                >
                    <button
                        @click="fetchPostsByUser"
                        class="btn btn--secondary btn--no-shadow post-tabs__link"
                    >My posts</button>
                </li>
                <li
                    :class="[activeTab === 'likedPosts' ? 'post-tabs__list-item--active' : '']"
                    class="post-tabs__list-item"
                >
                    <button
                        @click="fetchLikedPosts"
                        class="btn btn--secondary btn--no-shadow post-tabs__link"
                    >Liked posts</button>
                </li>
            </ul>

            <Loader v-show="postsLoading" />

            <section
                v-if="activeTab === 'userPosts'"
                v-show="!postsLoading"
                class="post-tabs__content"
            >
                <div class="post-tabs__body">
                    <ul class="post-list">
                        <li v-for="post in posts" :key="post._id" class="post-list__item">
                            <Post :post="post" :ref="post._id"></Post>
                        </li>
                    </ul>
                </div>
            </section>

            <section
                v-if="activeTab === 'likedPosts'"
                v-show="!postsLoading"
                class="post-tabs__content"
            >
                <div class="post-tabs__body">
                    <ul class="post-list">
                        <li v-for="post in posts" :key="post._id" class="post-list__item">
                            <Post :post="post" :ref="post._id"></Post>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import CreatePost from "../components/CreatePost";
import Loader from "../components/Loader";
import Post from "../components/Post";
import PostsService from "../services/PostsService";
import UserService from "../services/UserService";

export default {
    name: "Home",
    components: {
        CreatePost,
        Loader,
        Post
    },

    props: ["userId"],

    data: function() {
        return {
            user: {},
            posts: [],
            newPostText: "",
            activeTab: "userPosts",
            postsLoading: false
        };
    },

    computed: {
        ...mapState(["currentUser"]),

        isProfilePersonal: function() {
            return this.currentUser._id === this.userId ? true : false;
        }
    },

    watch: {
        "$route.params.userId": function() {
            this.fetchUserData();
            this.fetchPostsByUser();
        }
    },

    mounted() {
        this.fetchUserData();
        this.fetchPostsByUser();
    },

    methods: {
        async fetchUserData() {
            this.$store.dispatch("setLoading", true);

            this.user = await UserService.fetchUserById(this.userId);

            this.$store.dispatch("setLoading", false);
        },

        async fetchPostsByUser() {
            this.postsLoading = true;

            this.posts = await PostsService.fetchPostsByUser(this.userId);
            this.activeTab = "userPosts";

            this.postsLoading = false;
        },

        async fetchLikedPosts() {
            this.postsLoading = true;

            this.posts = await PostsService.fetchLikedPosts(this.userId);
            this.activeTab = "likedPosts";

            this.postsLoading = false;
        },

        fetchNewPost(data) {
            if (this.activeTab !== "likedPosts") {
                this.posts.unshift(data);
            }
        }
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
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/views/profile.scss";
</style>
