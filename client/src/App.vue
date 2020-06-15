<template>
    <div id="app" class="app">
        <Navbar v-if="loggedIn"></Navbar>
        <main class="main">
            <router-view
                v-show="!loading"
                class="page"
                @startLoading="startLoading"
                @endLoading="endLoading"
            />
            <Loader v-show="loading" />
        </main>
    </div>
</template>

  <script>
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { mapState } from "vuex";

export default {
    name: "App",
    components: {
        Navbar,
        Loader
    },
    data: function() {
        return {
            loading: false
        };
    },

    methods: {
        startLoading() {
            this.loading = true;
        },

        endLoading() {
            this.loading = false;
        }
    },

    computed: {
        ...mapState(["currentUser", "authState"]),

        loggedIn() {
            return this.authState;
        }
    }
};
</script>

<style lang="scss">
@import "./assets/scss/base/base.scss";
</style>
