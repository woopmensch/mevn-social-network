<template>
    <nav class="nav">
        <ul class="nav__list">
            <li class="nav__list-item">
                <router-link
                    :to="{name: 'Profile', params: {userId: currentUser._id} }"
                    class="link nav__link"
                >
                    <ion-icon name="person-outline" class="nav__link-icon"></ion-icon>
                    <span class="nav__link-text">Profile</span>
                </router-link>
            </li>
            <li class="nav__list-item">
                <router-link :to="{name :'News'}" exact class="link nav__link">
                    <ion-icon name="newspaper-outline" class="nav__link-icon"></ion-icon>
                    <span class="nav__link-text">News</span>
                </router-link>
            </li>
            <li class="nav__list-item">
                <router-link :to="{name :'Messages'}" class="link nav__link">
                    <ion-icon name="mail-outline" class="nav__link-icon"></ion-icon>
                    <span class="nav__link-text">Messages</span>
                </router-link>
            </li>
            <li class="nav__list-item">
                <router-link :to="{name :'Settings'}" class="link nav__link">
                    <ion-icon name="settings-outline" class="nav__link-icon"></ion-icon>
                    <span class="nav__link-text">Settings</span>
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Navigation",
    computed: {
        ...mapState(["currentUser"])
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/navbar.scss";
</style>