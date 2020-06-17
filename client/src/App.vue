<template>
    <div id="app" class="app">
        <Navbar v-if="loggedIn"></Navbar>
        <main class="main">
            <Loader v-show="loading" />
            <router-view
                v-show="!loading"
                class="page"
                @startLoading="startLoading"
                @finishLoading="finishLoading"
            />
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

    data: function() {
        return {
            loading: false
        };
    },

    computed: {
        ...mapState(["authState", "currentUser"]),

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
