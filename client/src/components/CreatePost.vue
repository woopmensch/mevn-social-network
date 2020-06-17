<template>
    <form class="form" @submit.prevent="createPost">
        <div class="form__input-group">
            <textarea
                class="form__control"
                type="text"
                v-model="postText"
                placeholder="What's up?"
            />
        </div>
        <button class="btn btn--primary" type="submit" :disabled="!postText.length">Post</button>
    </form>
</template>

<script>
import PostsService from "../services/PostsService";

export default {
    name: "CreatePost",
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
            this.$emit("newPost", data);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/form.scss";
</style>