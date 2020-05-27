<template>
    <div id="settings">
        <h1 class="uk-text-primary">Settings</h1>
        <div class="uk-card">
            <form class="uk-form" @submit.prevent="updateUserInfo">
                <fieldset class="uk-fieldset">
                    <legend class="uk-legend">Update user info</legend>
                    <div class="uk-margin">
                        <textarea
                            class="uk-textarea"
                            v-model="user.status"
                            placeholder="Set status"
                            style="resize: none;"
                        />
                    </div>
                    <div class="uk-margin">
                        <input
                            type="text"
                            class="uk-input"
                            v-model="user.name"
                            placeholder="Set name"
                        />
                    </div>
                    <div class="uk-margin">
                        <button class="uk-button uk-button-primary" type="submit">Update</button>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="uk-margin">
            <button class="uk-button uk-button-secondary" @click="logout">Logout</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserService from "../services/UserService";
export default {
    name: "settings",
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

    methods: {
        ...mapActions(["toggleAuthState", "saveUserData"]),

        async fetchUserData() {
            const id = this._id;
            this.user = await UserService.fetchUserById(id);
        },

        async updateUserInfo() {
            await UserService.updateUserInfo(this.user);
        },

        logout() {
            localStorage.clear();
            this.$store.dispatch("toggleAuthState", false);
            this.$router.push({ name: "login" });
        }
    },
    created() {
        this.fetchUserData();
    }
};
</script>