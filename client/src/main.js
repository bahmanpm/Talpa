import Vue from "vue";
import VueApollo from "vue-apollo";
import App from "./App.vue";
import router from "./router";
import ApolloClient from "apollo-boost";
import milligram from "milligram";

const apolloClient = new ApolloClient({
  uri: "http://localhost:9000/graphql",
});

Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

Vue.use(milligram);

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
