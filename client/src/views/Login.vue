<template>
    <div id="login" class="authorization">
        <form @submit.prevent="login" class="form">
            <span class="form__title lead">Login</span>

            <div class="form__input-group">
                <ion-icon name="mail-outline" class="form__icon"></ion-icon>
                <input
                    v-model="email"
                    name="email"
                    type="text"
                    class="form__control"
                    placeholder="Email"
                />
            </div>

            <div class="form__input-group">
                <ion-icon name="lock-closed-outline" class="form__icon"></ion-icon>
                <input
                    v-model="password"
                    name="password"
                    type="password"
                    class="form__control"
                    placeholder="Password"
                />
            </div>

            <div class="form__actions">
                <button class="btn btn--primary form__submit">Login</button>
                <router-link
                    :to="{name: 'Register'}"
                    tag="button"
                    class="btn btn--secondary"
                >Register</router-link>
            </div>
        </form>

        <Error v-if="errors.length" :errors="errors" class="error-list__item"></Error>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { HTTP } from "../services/api";
import Error from "../components/Error";
import setAuthToken from "../utils/authToken";

export default {
    name: "Login",
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

<style lang="scss" scoped>
@import "../assets/scss/components/form.scss";
@import "../assets/scss/components/authorization.scss";
</style>