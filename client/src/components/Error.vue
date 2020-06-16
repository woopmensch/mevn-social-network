<template>
    <ul class="error-list">
        <li v-for="error in errors" :key="error" class="error-list__item">{{error}}</li>
    </ul>
</template>

<script>
export default {
    name: "Error",
    props: ["errors"]
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/error-list.scss";
</style>