<template>
    <div>
        <ul id="xuy" class="uk-nav uk-nav-default uk-text-large uk-text-primary">
            <router-link :to="{name: 'profile', params: {userId: currentUser._id} }" tag="li">
                <a>Profile</a>
            </router-link>
            <router-link :to="{name :'news'}" exact tag="li">
                <a>News</a>
            </router-link>
            <router-link :to="{name :'messages'}" tag="li">
                <a>Messages</a>
            </router-link>
            <router-link :to="{name :'settings'}" tag="li">
                <a>Settings</a>
            </router-link>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Navigation",
    data: function() {
        return {};
    },
    computed: {
        ...mapState(["currentUser"])
    }
};
</script>

<style lang="scss" scoped>
</style>