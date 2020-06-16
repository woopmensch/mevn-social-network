<template>
    <div class="dropdown">
        <slot name="btn-toggle" :toggleDropdown="toggle"></slot>
        <div v-if="open" class="dropdown__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "DropDown",
    data: function() {
        return {
            open: false
        };
    },
    methods: {
        listener(event) {
            // close dropdown when clicked outside
            if (!this.$el.contains(event.target)) {
                this.close();
            }
        },
        toggle() {
            this.open = !this.open;
            window.addEventListener("click", this.listener, false);
        },
        close() {
            this.open = false;
            window.removeEventListener("click", this.listener, false);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/dropdown.scss";
</style>