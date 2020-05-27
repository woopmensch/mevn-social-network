<template>
    <div id="register" class="uk-container uk-flex uk-flex-middle uk-flex-column uk-flex-center">
        <form @submit.prevent="register" class="uk-width-auto">
            <fieldset class="uk-fieldset">
                <legend class="uk-legend">Register</legend>
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
                <div class="uk-margin">
                    <div class="uk-inline">
                        <span class="uk-form-icon" uk-icon="icon: lock"></span>
                        <input
                            class="uk-input"
                            type="text"
                            v-model="confirmPassword"
                            placeholder="Confirm password"
                        />
                    </div>
                </div>
                <div class="uk-margin">
                    <div class="uk-inline">
                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                        <input class="uk-input" type="text" v-model="name" placeholder="Name" />
                    </div>
                </div>
                <div class="uk-margin uk-flex uk-flex-between uk-width-auto">
                    <button class="uk-button uk-button-primary" type="submit">Register</button>
                    <router-link
                        to="/login"
                        tag="button"
                        class="uk-button uk-button-secondary"
                    >Login</router-link>
                </div>
            </fieldset>
        </form>
        <div v-if="errors.length" class>
            <Error v-for="error in errors" v-bind:key="error" :errorMessage="error"></Error>
        </div>
    </div>
</template>

<script>
import { HTTP } from "../services/api";
import setAuthToken from "../utils/authToken";
import Error from "../components/Error";

export default {
    name: "register",
    components: {
        Error
    },
    data: () => {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            errors: []
        };
    },

    methods: {
        register() {
            let user = {
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
                name: this.name
            };

            HTTP({
                url: "/auth/register",
                method: "POST",
                data: user,
                crossdomain: true
            })
                .then(res => {
                    localStorage.setItem("token", res.data.user.token);
                    this.$store.dispatch("toggleAuthState", true);
                    this.$store.dispatch("saveUserData", res.data.user);

                    setAuthToken(res.data.user.token);

                    this.$router.push({ name: "News" });
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