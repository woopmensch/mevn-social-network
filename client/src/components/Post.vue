<template>
    <div class="uk-card uk-card-default uk-margin" v-if="post.user">
        <div class="uk-flex uk-padding-small uk-padding-remove-bottom">
            <span uk-icon="user" width="50" />
            <div class="uk-margin-small-left">
                <router-link
                    class="uk-margin-remove"
                    style="font-size: 1.5rem;"
                    :to="{name: 'profile', params: {userId: post.user._id}}"
                >{{post.user.name}}</router-link>
                <p
                    class="uk-margin-remove"
                    style="font-size: 1.2rem;"
                >{{this.$parsedDate(post.created)}}</p>
            </div>

            <div class="uk-margin-auto-left" v-if="isPostByCurrentUser">
                <button class="uk-icon-button" uk-icon="more-vertical"></button>
                <div
                    class="uk-card uk-card-default uk-width-auto uk-border-rounded"
                    uk-drop="mode: click; pos: bottom-center; offset: 5"
                >
                    <div
                        class="uk-flex uk-flex-column uk-padding-small uk-padding-remove-left uk-padding-remove-right"
                    >
                        <!-- <button
                            class="uk-icon-button uk-margin-small-bottom"
                            uk-toggle="target: #modal-edit-post"
                            uk-icon="pencil"
                            title="edit"
                        ></button>-->

                        <!-- <div id="modal-edit-post" uk-modal>
                            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
                                <h2 class="uk-modal-title">Edit post</h2>
                                <input
                                    ref="editedText"
                                    type="text"
                                    class="uk-input"
                                    v-model="editedText"
                                />
                                <p>{{editedText}}</p>
                                <button class="uk-button uk-button-primary" @click="editPost">Save</button>
                                <button class="uk-button uk-button-default uk-modal-close">Cancel</button>
                            </div>
                        </div>-->

                        <button
                            class="uk-icon-button"
                            @click="deletePost"
                            uk-icon="trash"
                            title="delete"
                        ></button>
                    </div>
                </div>
            </div>
        </div>

        <div class="uk-card-body uk-padding-small">
            <p class="uk-text-large uk-text-lead" style="font-size: 1.4rem;">{{post.text}}</p>
        </div>

        <hr class="uk-margin-remove" />

        <div class="uk-flex uk-flex-middle uk-margin-small-left" style="padding: 10px 0;">
            <Like :post="post"></Like>
            <div>
                <button
                    class="uk-margin-left uk-padding-remove uk-icon-button"
                    @click.once="loadComments"
                    @click="showComments = !showComments"
                    uk-icon="comment"
                ></button>
                <span
                    v-if="post.comments.length"
                    class="uk-padding-small-left"
                >{{post.comments.length}}</span>
            </div>
        </div>
        <div v-if="showComments">
            <hr class="uk-margin-remove" />
            <div class="uk-padding-small uk-padding-remove-top">
                <Comment
                    v-for="(comment, index) in comments"
                    v-bind:key="comment._id"
                    :comment="comment"
                    :isLast="index === comments.length - 1"
                    @deleteComment="deleteComment"
                ></Comment>
                <form class="uk-form uk-flex uk-margin-top" @submit.prevent="addComment">
                    <span class="uk-margin-small-right" uk-icon="user" width="40"></span>
                    <textarea
                        class="uk-textarea"
                        type="text"
                        v-model="commentText"
                        placeholder="Leave a comment..."
                        style="resize: none; overflow: hidden;"
                    />
                    <!-- @input="mixin_autoResize_resize" -->
                    <div class="uk-margin-small-top">
                        <button
                            class="uk-button uk-button-small uk-button-primary uk-margin-small-left"
                            type="submit"
                            :disabled="!commentText.length"
                        >comment</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import PostsService from "../services/PostsService";
import CommentsService from "../services/CommentsService";
import Like from "./Like";
import Comment from "./Comment";
// import mixinAutoResize from "../utils/autoResize.js";

export default {
    name: "Post",
    // mixins: [mixinAutoResize],
    props: ["post"],
    components: {
        Like,
        Comment
    },
    data: function() {
        return {
            commentText: "",
            comments: [],
            showComments: false,
            likes: []
        };
    },

    computed: {
        ...mapState(["currentUser"]),
        isPostByCurrentUser: function() {
            return this.post.user._id === this.currentUser._id;
        }
    },

    methods: {
        loadComments: async function() {
            this.comments = await CommentsService.fetchComments(this.post._id);
        },

        addComment: async function() {
            CommentsService.addComment(this.post._id, {
                text: this.commentText
            });

            this.commentText = "";
        },

        deleteComment: async function(commentId) {
            CommentsService.deleteComment(commentId);
        },

        deletePost: async function() {
            PostsService.deletePost(this.post._id);
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
