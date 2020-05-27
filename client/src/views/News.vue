<template>
    <div id="news">
        <h1 class="uk-text-primary">News</h1>
        <CreatePost @newPost="fetchNewPost"></CreatePost>
        <Post
            class="uk-animation-fade"
            v-for="post in posts"
            v-bind:key="post._id"
            :post="post"
            :ref="post._id"
        ></Post>
    </div>
</template>

<script>
import Post from "../components/Post";
import PostsService from "../services/PostsService";
import CreatePost from "../components/CreatePost";

export default {
    name: "news",
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
            this.posts = await PostsService.fetchPosts();
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
            const comment = comments.filter(comment => comment._id === data);
            const commentIndex = comments.indexOf(...comment);
            Object.assign(post, data.targetPost);
            comments.splice(commentIndex, 1);
        }
    }
};
</script>


<style lang="scss" scoped>
// .v-list-item {
//     user-select: text;
//     // font-family: 'roboto';
//     // display: flex;
//     // align-items: flex-start;
//     &__content {
//         // padding: 0;
//         // height: 100px;
//     }
// }

// .v-card__text-title {
//     padding: 0
// }
// .post {
// display: grid;
// grid-row-gap: 1rem;
// margin-top: 2rem;
// background-color: rgb(240, 240, 240);
// border-radius: 1rem;
// padding: 1.5rem;

// :nth-child(1) {
//     display: flex;
// }

// .post-wrapper {
//     display: grid;
// grid-gap: 1rem;
// background-color: black;
// flex-direction: column;
// width: 100%;
// padding: 1rem;

// .post-user-info {
// padding: 1rem;
// position: relative;
// display: ;
// justify-content: space-between;
// background-color: black;
// align-items: flex-start;
// align-content: flex-start;
//         .md-avatar {
//             margin-right: 0.5rem;
//         }

//         .post-user-name {
//             font-weight: 500;
//             color: #42b983;
//         }
//     }
//     .post-content {
//         margin-top: 0.5rem;
//         font-weight: 400;
//     }
// }
// .comment-text {
// margin-left: 0.5rem;

// .comment-name {
//     font-weight: 500;
//     font-size: 1rem;
//     color: #42b983;
//     padding-bottom: 2px;
// }

// .comment-content {
//     font-weight: 400;
//     font-size: 1rem;
// }

// .comment-date {
//     padding-top: 2px;
// font-weight: 00;
//         }
//     }
// }
// .md-list-item-content > .md-avatar:first-child {
//     margin-right: 10px;
// }

// .md-list {
// background-color: rgb(240, 240, 240);
// }
// }
</style>
