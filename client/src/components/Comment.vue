<template>
    <div class="comment">
        <div class="comment__inner">
            <div class="comment__avatar">
                <router-link
                    :to="{name: 'Profile', params: {userId: comment.user._id}}"
                    class="link comment__avatar-link"
                >
                    <ion-icon name="person-circle-outline" class="comment__avatar-icon"></ion-icon>
                </router-link>
            </div>

            <div class="comment__info">
                <router-link
                    :to="{name: 'Profile', params: {userId: comment.user._id}}"
                    class="comment__author link"
                >{{comment.user.name}}</router-link>
                <span class="comment__text">{{comment.text}}</span>
                <span class="comment__date">{{parseDate(comment.created)}}</span>
            </div>

            <div class="comment__actions">
                <button @click="toggleLike" class="btn comment__btn">
                    <ion-icon
                        :name="likedByUser ? 'heart' : 'heart-outline'"
                        :style="{color: likedByUser ? 'red' : 'inherit'}"
                        class="comment__btn-icon"
                    ></ion-icon>
                    <span
                        v-if="!!comment.likes.length"
                        class="comment__btn-amount"
                    >{{comment.likes.length}}</span>
                </button>
                <DropDown v-if="commentByCurrentUser" class="comment__dropdown">
                    <template v-slot:btn-toggle="slotProps">
                        <button @click="slotProps.toggleDropdown" class="btn comment__dropdown-btn">
                            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                        </button>
                    </template>
                    <template v-slot:content>
                        <button
                            @click="$emit('deleteComment', comment._id)"
                            class="btn btn--no-shadow comment__dropdown-btn"
                        >
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                    </template>
                </DropDown>
            </div>
        </div>
        <hr class="comment__divider" v-if="!isLast" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import { parseDate } from "../utils/parseDate";
import CommentsService from "../services/CommentsService";
import DropDown from "../components/DropDown";

export default {
    name: "Comment",
    components: {
        DropDown
    },

    props: ["comment", "isLast"],

    computed: {
        ...mapState(["currentUser"]),
        commentByCurrentUser() {
            return this.comment.user._id === this.currentUser._id;
        },

        likedByUser() {
            return !!this.comment.likes.filter(
                i => i._id === this.currentUser._id
            ).length;
        }
    },

    methods: {
        parseDate(date) {
            return parseDate(date);
        },

        async toggleLike() {
            await CommentsService.likeComment(this.comment._id);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/comment.scss";
</style>
