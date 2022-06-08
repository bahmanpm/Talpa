<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    {{ machine }}
    <div class="container">
      <div class="row">
        <div class="column">.column</div>
        <div class="column">.column</div>
        <div class="column">.column</div>
        <div class="column">.column</div>
      </div>

      <div class="row">
        <div class="column">.column</div>
        <div class="column column-50 column-offset-25">
          .column column-50 column-offset-25
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  apollo: {
    machine: gql`
      query {
        machine {
          name
        }
      }
    `,
  },
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
