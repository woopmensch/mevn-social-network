<template>
    <div id="news">
        <h1 class="page__title">News</h1>
        <CreatePost @newPost="fetchNewPost"></CreatePost>
        <ul class="post-list">
            <li v-for="post in posts" :key="post._id" class="post-list__item">
                <Post :post="post" :ref="post._id"></Post>
            </li>
        </ul>
    </div>
</template>

<script>
import Post from "../components/Post";
import PostsService from "../services/PostsService";
import CreatePost from "../components/CreatePost";

export default {
    name: "News",
    components: {
        CreatePost,
        Post
    },

    data: function() {
        return {
            posts: []
        };
    },

    methods: {
        async getPosts() {
            this.$emit("startLoading");
            this.posts = await PostsService.fetchPosts();
            this.$emit("endLoading");
        },

        fetchNewPost(data) {
            this.posts.unshift(data);
        }
    },

    created() {
        this.getPosts();
    },

    sockets: {
        deletePost: function(data) {
            const post = this.posts.filter(post => post._id === data);
            const postIndex = this.posts.indexOf(...post);
            this.posts.splice(postIndex, 1);
        },

        newComment: function(data) {
            const postId = data.post._id;
            const postComponent = this.$refs[postId][0];
            const post = postComponent.post;
            const postComments = postComponent.comments;
            Object.assign(post, data.post);
            postComments.push(data.comment);
        },

        togglePostLike: function(data) {
            const post = this.posts.filter(
                post => post._id === data.targetPost
            );
            const postIndex = this.posts.indexOf(...post);
            this.posts[postIndex].likes = data.likes;
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
            const comment = comments.filter(
                comment => comment._id === data.targetComment
            );
            const commentIndex = comments.indexOf(...comment);
            Object.assign(post, data.targetPost);
            comments.splice(commentIndex, 1);
        }
    }
};
</script>


<style lang="scss" scoped>
</style>
