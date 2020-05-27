<template>
    <div class="uk-card" style="width: 100%;">
        <div class="uk-width-expand">
            <div
                class="uk-flex uk-padding-small uk-padding-remove-bottom"
                style="margin-bottom: 0.4em;"
            >
                <span uk-icon="user" width="40"></span>

                <div class="uk-width-expand">
                    <div class="uk-margin-small-left">
                        <router-link
                            class="uk-margin-remove"
                            :to="{name: 'profile', params: {userId: comment.user._id}}"
                            style="font-size: 1.3rem;"
                        >{{comment.user.name}}</router-link>
                    </div>

                    <div class="uk-card-body uk-padding-remove uk-margin-small-left">
                        <p class="uk-text-lead" style="font-size: 1.2rem;">{{comment.text}}</p>
                    </div>

                    <div class="uk-flex uk-flex-between uk-margin-small-left">
                        <span class style="font-size: 1.1rem;">{{this.$parsedDate(comment.created)}}</span>
                    </div>
                </div>
                <div class="uk-flex uk-flex-column uk-flex-between">
                    <div class v-if="isCommentByCurrentUser">
                        <button class="uk-icon-button" uk-icon="more-vertical"></button>
                        <div
                            class="uk-card uk-card-default uk-width-auto uk-border-rounded"
                            uk-drop="mode: click; pos: bottom-center; offset: 5"
                        >
                            <div
                                class="uk-flex uk-flex-column uk-padding-small uk-padding-remove-left uk-padding-remove-right"
                            >
                                <button
                                    class="uk-icon-button"
                                    uk-icon="trash"
                                    @click="$emit('deleteComment', comment._id)"
                                    title="delete"
                                ></button>
                            </div>
                        </div>
                    </div>
                    <Like :comment="comment"></Like>
                </div>
            </div>
        </div>
        <hr v-if="!isLast" class="uk-margin-remove" />
    </div>
</template>

<script>
import Like from "./Like";
import { mapState } from "vuex";

export default {
    name: "Comment",
    props: ["comment", "isLast"],
    components: {
        Like
    },
    computed: {
        ...mapState(["currentUser"]),
        isCommentByCurrentUser: function() {
            return this.comment.user._id === this.currentUser._id;
        }
    }
};
</script>