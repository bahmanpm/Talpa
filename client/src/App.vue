<template>
  <div id="app">
    <!-- <nav><router-link to="/">Home</router-link> |</nav> -->
    <router-view />
  </div>
</template>

<script>
// import gql from "graphql-tag";

export default {
  data() {
    return {
      machine: this.$apollo.queries.machine,
    };
  },
  methods: {
    // getMachines() {
    // },
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
