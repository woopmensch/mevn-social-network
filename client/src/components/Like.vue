<template>
    <div id="like" v-if="this.parent">
        <div>
            <button @click="toggleLike" class="uk-icon-button" ref="likeButton" uk-icon="heart"></button>
            <span v-if="parent.likes.length" class="uk-padding-small-left">{{parent.likes.length}}</span>
        </div>
        <div
            class="uk-card uk-card-default uk-padding-small uk-width-small"
            v-if="parent.likes.length"
            uk-drop="offset: 5; delay-show: 400; delay-hide: 200;"
        >
            <div>
                <p class="uk-margin-small-bottom">Liked by:</p>
                <router-link
                    class="uk-icon-button"
                    uk-icon="user"
                    v-for="user in parent.likes"
                    :key="user._id"
                    :to="{name: 'profile', params: {userId: parent.user._id}}"
                    :title="user.name"
                ></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import PostsService from "../services/PostsService";
import CommentsService from "../services/CommentsService";
import { mapState } from "vuex";

export default {
    name: "like",
    props: ["post", "comment"],
    data: function() {
        return {
            parent: this.post ? this.post : this.comment //define where like component is used, in post or comment
        };
    },

    computed: {
        ...mapState({ currentUserId: state => state.currentUser._id })
    },

    methods: {
        toggleLike: async function() {
            if (this.post) {
                await PostsService.likePost(this.parent._id);
            } else if (this.comment) {
                await CommentsService.likeComment(this.parent._id);
            }
            this.setButtonColor();
        },

        setButtonColor: function() {
            if (
                //check if user liked this post
                this.parent.likes.filter(like => like.id === this.currentUserId)
                    .length
            ) {
                this.$refs.likeButton.style.color = "red";
            } else {
                this.$refs.likeButton.style.color = "grey";
            }
        }
    },

    mounted() {
        this.setButtonColor();
    }
};
</script>