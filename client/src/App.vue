<template>
    <div id="app">
        <div v-if="!isMobile" class="uk-container uk-flex uk-flex-center">
            <div
                class="uk-margin-remove uk-width-expand uk-height-expand"
                style="width: 60vw;"
                uk-grid
            >
                <div
                    v-if="isLoggedIn"
                    class="uk-flex uk-flex-middle"
                    style="width: 200px; height: 100vh;"
                >
                    <Navbar class="uk-position-fixed"></Navbar>
                </div>
                <div class="uk-container">
                    <div v-show="loading" uk-spinner="ratio: 4"></div>
                </div>
                <router-view
                    v-show="!loading"
                    class="uk-width-expand uk-animation-fade"
                    @startLoading="startLoading"
                    @endLoading="endLoading"
                ></router-view>
            </div>
        </div>
        <div v-if="isMobile">
            <router-view class="uk-animation-fade uk-padding-large" style="margin-bottom: 3rem;"></router-view>
            <MobileNavbar v-if="isLoggedIn" class="uk-position-bottom uk-position-fixed"></MobileNavbar>
        </div>
    </div>
</template>

  <script>
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import { mapState } from "vuex";

import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);

export default {
    name: "app",
    components: {
        Navbar,
        MobileNavbar
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

        isLoggedIn() {
            return this.authState;
        },
        isMobile() {
            return window.innerWidth < 1080;
        }
    }
};
</script>

<style lang="scss">
// 1. Your custom variables and variable overwrites.
$global-link-color: #42b983;
$global-primary-background: #42b983;
$global-link-hover-color: #42b983;

// 2. Import default variables and available mixins.
@import "uikit/src/scss/variables-theme.scss";
@import "uikit/src/scss/mixins-theme.scss";

// 4. Import UIkit.
@import "uikit/src/scss/uikit-theme.scss";

.uk-active > a {
    color: $global-primary-background !important;
}
html,
body {
    height: 100%;
}
#app {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
}
</style>
