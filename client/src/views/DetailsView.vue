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
        <SensorsTable
          v-else-if="data.machine.sensors"
          :title="sensorsTableTitle"
          :data="data.machine.sensors"
          :headItems="headItems"
          :isDetailedButtonAvailable="isDetailedButtonAvailable"
          :DetailedButtonPath="DetailedButtonPath"
        />

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
        {{ data.machine.sensors }}
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
// @ is an alias to /src
import SensorsTable from "@/components/TableComponent.vue";

export default {
  name: "DetailsView",
  data() {
    return {
      sensorsTableTitle: "List of Sensors",
      headItems: ["Sensor", "Details"],
      isDetailedButtonAvailable: true,
      DetailedButtonPath: "/sensor-details",
    };
  },
  components: { SensorsTable },
};
</script>
