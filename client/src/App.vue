<template>
    <div id="app">
        <div v-if="!isMobile" class="uk-container uk-flex uk-flex-center">
            <div class="uk-margin-remove" style="width: 60vw;" uk-grid>
                <div
                    v-if="isLoggedIn"
                    class="uk-flex uk-flex-middle"
                    style="height: 100vh; width: 200px;"
                >
                    <Navbar class="uk-position-fixed"></Navbar>
                </div>
                <router-view class="uk-width-expand uk-animation-fade"></router-view>
            </div>
        </div>
        <div v-if="isMobile">
            <router-view class="uk-animation-fade uk-padding-large" style="margin-bottom: 3rem;"></router-view>
            <MobileNavbar class="uk-position-bottom"></MobileNavbar>
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

#app {
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
}
</style>
