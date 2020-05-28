<template>
    <div id="login" class="uk-container uk-flex uk-flex-middle uk-flex-column uk-flex-center">
        <form @submit.prevent="login">
            <fieldset class="uk-fieldset">
                <legend class="uk-legend">Login</legend>
                <div class="uk-margin">
                    <div class="uk-inline">
                        <span class="uk-form-icon" uk-icon="icon: mail"></span>
                        <input class="uk-input" type="text" v-model="email" placeholder="Email" />
                    </div>
                </div>
                <div class="uk-margin">
                    <div class="uk-inline">
                        <span class="uk-form-icon" uk-icon="icon: lock"></span>
                        <input
                            class="uk-input"
                            type="text"
                            v-model="password"
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div class="uk-margin uk-flex uk-flex-between">
                    <button class="uk-button uk-button-primary" type="submit">Login</button>
                    <!-- <button class="uk-button uk-button-secondary"></button> -->
                    <router-link
                        to="/register"
                        tag="button"
                        class="uk-button uk-button-secondary"
                    >Register</router-link>
                </div>
            </fieldset>
        </form>
        <div v-if="errors.length">
            <Error v-for="error in errors" v-bind:key="error" :errorMessage="error"></Error>
        </div>
    </div>
</template>

<script>
import { HTTP } from "../services/api";
import setAuthToken from "../utils/authToken";
import { mapActions } from "vuex";
import Error from "../components/Error";

export default {
    name: "login",
    components: {
        Error
    },
    data: () => {
        return {
            email: "",
            password: "",
            errors: []
        };
    },
    methods: {
        ...mapActions(["saveUserData", "toggleAuthState"]),

        login() {
            const user = {
                email: this.email,
                password: this.password
            };

            HTTP({
                url: "/auth/login",
                method: "POST",
                data: user,
                crossdomain: true
            })
                .then(res => {
                    localStorage.setItem("token", res.data.user.token);
                    this.$store.dispatch("toggleAuthState", true);
                    this.$store.dispatch("saveUserData", res.data.user);
                    setAuthToken(res.data.user.token);

                    this.$router.push({ name: "news" });
                })
                .catch(error => {
                    this.errors = error.response.data.error;
                });

            setTimeout(() => {
                this.errors = [];
            }, 1500);
        }
    }
};
</script>

<style>
</style>