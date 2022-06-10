<template>
  <div class="home">
    <!-- <img alt="Talpa logo" src="../assets/logo.png" /> -->
    <h1>Sensor Details Page</h1>
    <ApolloQuery
      :query="require('../graphql/sensorDetails.gql')"
      :variables="{
        id: 'sjkfhsjkfhjshgjlwheglkhe',
        from: '1994-04-11 12:32:04',
        to: '1992-09-09 20:46:39',
      }"
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <!-- Loading -->
        <div v-if="isLoading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">
          An error occurred : {{ error }}
        </div>

        <!-- Result -->
        <div v-else-if="data" class="data apollo">
          {{ data }}
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
// @ is an alias to /src
// import SensorsTable from "@/components/TableComponent.vue";

export default {
  name: "DetailsView",
  data() {
    return {
      //   sensorsTableTitle: "List of Sensors",
      //   headItems: ["Sensor", "Details"],
      //   isDetailedButtonAvailable: true,
    };
  },
  //   components: { SensorsTable },
};
</script>
