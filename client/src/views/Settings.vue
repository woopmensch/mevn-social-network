<template>
    <div id="settings">
        <h1 class="page__title">Settings</h1>
        <form @submit.prevent="updateUserInfo" class="form">
            <span class="form__title lead">Update user info</span>
            <div class="form__input-group">
                <label for="status" class="form__label">Status</label>
                <textarea
                    v-model="user.status"
                    type="text"
                    name="status"
                    class="form__control"
                    placeholder="Set status"
                />
            </div>
            <div class="form__input-group">
                <label for="name" class="form__label">Name</label>
                <input
                    v-model="user.name"
                    type="text"
                    name="name"
                    class="form__control"
                    placeholder="Set name"
                />
            </div>
            <div class="form__actions">
                <button type="submit" class="btn btn--primary form__btn form__submit">
                    <ion-icon name="sync-outline" class="btn__icon"></ion-icon>
                    <span class="btn__text">Update</span>
                </button>
                <button @click="logout" class="btn btn--secondary form__btn">
                    <ion-icon name="log-out-outline" class="btn__icon"></ion-icon>
                    <span class="btn__text">Logout</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserService from "../services/UserService";

export default {
    name: "Settings",
    data: function() {
        return {
            user: {
                status: "",
                name: ""
            }
        };
    },

    computed: mapState({
        _id: state => state.currentUser._id
    }),

    mounted() {
        this.fetchUserData();
    },

    methods: {
        ...mapActions(["toggleAuthState", "saveUserData"]),

        async fetchUserData() {
            this.$store.dispatch("setLoading", true);
            const id = this._id;
            this.user = await UserService.fetchUserById(id);
            this.$store.dispatch("setLoading", false);
        },

        async updateUserInfo() {
            await UserService.updateUserInfo(this.user);
        },

        logout() {
            localStorage.clear();
            this.$store.dispatch("toggleAuthState", false);
            this.$router.push({ name: "Login" });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/form.scss";
</style>