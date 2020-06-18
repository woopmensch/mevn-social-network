<template>
    <div id="app" class="app">
        <Navbar v-if="loggedIn"></Navbar>
        <main class="main">
            <Loader v-show="isLoading" />
            <router-view v-show="!isLoading" class="page" />
        </main>
    </div>
</template>

  <script>
import { mapState } from "vuex";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

export default {
    name: "App",
    components: {
        Loader,
        Navbar
    },

    computed: {
        ...mapState(["authState", "currentUser", "isLoading"]),

        loggedIn() {
            return this.authState;
        }
    },

    methods: {
        startLoading() {
            this.loading = true;
        },

        finishLoading() {
            this.loading = false;
        }
    }
};
</script>

<style lang="scss">
@import "./assets/scss/base/base.scss";
</style>
