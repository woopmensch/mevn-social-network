<template>
    <div id="register" class="authorization">
        <form @submit.prevent="register" class="form">
            <span class="form__title lead">Register</span>
            <div class="form__input-group">
                <ion-icon name="mail-outline" class="form__icon"></ion-icon>
                <input v-model="email" type="text" class="form__control" placeholder="Email" />
            </div>
            <div class="form__input-group">
                <ion-icon name="lock-closed-outline" class="form__icon"></ion-icon>
                <input
                    v-model="password"
                    type="password"
                    class="form__control"
                    placeholder="Password"
                />
            </div>
            <div class="form__input-group">
                <ion-icon name="lock-closed-outline" class="form__icon"></ion-icon>
                <input
                    v-model="confirmPassword"
                    type="password"
                    class="form__control"
                    placeholder="Confirm password"
                />
            </div>
            <div class="form__input-group">
                <ion-icon name="person-outline" class="form__icon"></ion-icon>
                <input v-model="name" type="text" class="form__control" placeholder="Name" />
            </div>
            <div class="form__actions">
                <button type="submit" class="btn btn--primary form__submit">Register</button>
                <router-link :to="{name: 'Login'}" tag="button" class="btn btn--secondary">Login</router-link>
            </div>
        </form>

        <Error v-if="errors.length" :errors="errors"></Error>
    </div>
</template>

<script>
import { HTTP } from "../services/api";
import setAuthToken from "../utils/authToken";
import Error from "../components/Error";

export default {
    name: "Register",
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

<style lang="scss" scoped>
@import "../assets/scss/components/form.scss";
@import "../assets/scss/components/authorization.scss";
</style>