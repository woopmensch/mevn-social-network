<template>
    <div class="uk-card uk-card-default">
        <form class="uk-form uk-padding-small" @submit.prevent="createPost">
            <div class="uk-width-expand uk-flex">
                <span class="uk-margin-small-right" uk-icon="user" width="40"></span>
                <textarea
                    class="uk-textarea"
                    type="text"
                    v-model="postText"
                    placeholder="What's up?"
                    style="resize: none; overflow: hidden"
                />
                <!-- @input="mixin_autoResize_resize" -->
            </div>
            <div class="uk-flex uk-flex-right uk-margin-small-top">
                <button
                    class="uk-button uk-button-primary"
                    type="submit"
                    :disabled="!postText.length"
                >Post</button>
            </div>
        </form>
    </div>
</template>

<script>
import PostsService from "../services/PostsService";
// import mixinAutoResize from "../utils/autoResize.js";

export default {
    name: "createPost",
    // mixins: [mixinAutoResize],
    data: () => {
        return {
            postText: ""
        };
    },
    methods: {
        async createPost() {
            await PostsService.createPost({ text: this.postText });
            this.postText = "";
        }
    },

    sockets: {
        newPost: function(data) {
            this.$emit("newPost", JSON.parse(data));
        }
    }
};
</script>

<style>
</style>