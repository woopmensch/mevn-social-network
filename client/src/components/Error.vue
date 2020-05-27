<template>
    <div id="error" class="uk-alert-danger" uk-alert>{{errorMessage}}</div>
</template>

<script>
export default {
    name: "error",
    props: ["errorMessage"]
};
</script>

<style>
</style>