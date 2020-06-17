<template>
    <div v-if="post.user" class="post">
        <div class="post__header">
            <router-link
                :to="{name: 'Profile', params: {userId: post.user._id}}"
                class="post__avatar-link link"
            >
                <ion-icon name="person-circle-outline" class="post__avatar"></ion-icon>
            </router-link>

            <div class="post__header-info">
                <router-link
                    :to="{name: 'Profile', params: {userId: post.user._id}}"
                    class="post__author link"
                >{{post.user.name}}</router-link>
                <span class="post__date">{{parseDate(post.created)}}</span>
            </div>

            <DropDown v-if="postByCurrentUser" class="post__dropdown">
                <template v-slot:btn-toggle="slotProps">
                    <button @click="slotProps.toggleDropdown" class="btn">
                        <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                    </button>
                </template>
                <template v-slot:content>
                    <button @click="deletePost" class="btn btn--no-shadow">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </template>
            </DropDown>
        </div>

        <div class="post__body">
            <span class="post__text">{{post.text}}</span>
            <hr class="post__divider" />
        </div>

        <div class="post__footer">
            <button @click="toggleLike" class="btn post__btn">
                <ion-icon
                    :name="likedByUser ? 'heart' : 'heart-outline'"
                    :style="{color: likedByUser ? 'red' : 'inherit'}"
                    class="post__btn-icon"
                ></ion-icon>
                <span v-if="!!post.likes.length" class="post__btn-amount">{{post.likes.length}}</span>
            </button>
            <button
                @click.once="loadComments"
                @click="showComments = !showComments"
                class="btn post__btn"
            >
                <ion-icon name="chatbox-outline" class="post__btn-icon"></ion-icon>
                <span
                    v-if="!!post.comments.length"
                    class="post__btn-amount"
                >{{post.comments.length}}</span>
            </button>
        </div>

        <hr v-if="showComments" class="post__divider" />

        <div v-if="showComments" class="post__comments">
            <Loader v-show="commentLoading" />

            <Comment
                v-show="!commentsLoading"
                v-for="(comment, index) in comments"
                @deleteComment="deleteComment"
                :key="comment._id"
                :comment="comment"
                :isLast="index === comments.length - 1"
            ></Comment>

            <div class="comment-create">
                <ion-icon name="person-circle-outline" class="comment-create__avatar"></ion-icon>
                <textarea
                    v-model="commentText"
                    placeholder="Leave a comment"
                    class="comment-create__text"
                ></textarea>
                <button
                    @click="addComment"
                    :disabled="!commentText.length"
                    class="btn btn--primary comment-create__button"
                >
                    <ion-icon name="send-outline" class="btn__icon"></ion-icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { parseDate } from "../utils/parseDate";
import Comment from "./Comment";
import CommentsService from "../services/CommentsService";
import DropDown from "../components/DropDown";
import Loader from "../components/Loader";
import PostsService from "../services/PostsService";

export default {
    name: "Post",
    components: {
        Comment,
        DropDown,
        Loader
    },

    props: ["post"],

    data: function() {
        return {
            commentText: "",
            comments: [],
            showComments: false,
            commentsLoading: false,
            likes: []
        };
    },

    computed: {
        ...mapState(["currentUser"]),

        postByCurrentUser() {
            return this.post.user._id === this.currentUser._id;
        },

        likedByUser() {
            return !!this.post.likes.filter(i => i._id === this.currentUser._id)
                .length;
        }
    },

    methods: {
        async loadComments() {
            this.commentLoading = true;
            this.comments = await CommentsService.fetchComments(this.post._id);
            this.commentLoading = false;
        },

        deletePost() {
            PostsService.deletePost(this.post._id);
        },

        async toggleLike() {
            await PostsService.likePost(this.post._id);
        },

        addComment() {
            CommentsService.addComment(this.post._id, {
                text: this.commentText
            });

            this.commentText = "";
        },

        deleteComment(commentId) {
            CommentsService.deleteComment(commentId);
        },

        parseDate(date) {
            return parseDate(date);
        }
        // editPost: async function() {
        //     // console.log(this.$refs.editedText.value)
        //     await PostsService.updatePost(
        //         this.post._id,
        //         this.$refs.editedText.value
        //     );
        // }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/form.scss";
@import "../assets/scss/components/post.scss";
</style>
