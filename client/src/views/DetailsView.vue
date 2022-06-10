<template>
  <div class="home">
    <!-- <img alt="Talpa logo" src="../assets/logo.png" /> -->
    <h1>Details Page</h1>
    <ApolloQuery :query="require('../graphql/machineDetails.gql')">
      <template v-slot="{ result: { error, data }, isLoading }">
        <!-- Loading -->
        <div v-if="isLoading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">
          An error occurred : {{ error }}
        </div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">{{ data.machine }}</div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
// @ is an alias to /src
// import MachineTable from "@/components/MachineTable.vue";

export default {
  name: "DetailsView",
  data() {
    return {};
  },
  components: {},
};
</script>
