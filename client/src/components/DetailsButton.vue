<template>
  <a class="button" v-bind:class="{ 'button-outline': isOutlined }" href="#">{{
    title
  }}</a>
</template>

<script>
export default {
  name: "DetailedButton",
  props: {
    title: String,
    isOutlined: Boolean,
  },
};
</script>

<style scoped></style>
