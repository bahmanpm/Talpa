<template>
  <a
    class="button"
    v-bind:class="{ 'button-outline': isOutlined }"
    @click="navigate('/details', id)"
    >{{ title }}</a
  >
</template>

<script>
import navigationMixin from "../mixins/navigationMixin";

export default {
  name: "DetailedButton",
  props: {
    title: String,
    id: String,
    isOutlined: Boolean,
  },
  mixins: [navigationMixin],
};
</script>

<style scoped></style>
