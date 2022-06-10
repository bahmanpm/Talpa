<template>
  <div class="home">
    <!-- <img alt="Talpa logo" src="../assets/logo.png" /> -->
    <ApolloQuery :query="require('../graphql/allMachines.gql')">
      <template v-slot="{ result: { error, data }, isLoading }">
        <!-- Loading -->
        <div v-if="isLoading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">
          An error occurred : {{ error }}
        </div>

        <!-- Result -->
        <!-- <div v-else-if="data" class="result apollo">{{ data.machines }}</div> -->
        <MachineTable
          v-else-if="data"
          :title="machineTableTitle"
          :data="data.machines"
          :headItems="headItems"
          :isDetailedButtonAvailable="isDetailedButtonAvailable"
          :DetailedButtonPath="DetailedButtonPath"
        />

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
// @ is an alias to /src
import MachineTable from "@/components/TableComponent.vue";

export default {
  name: "HomeView",
  data() {
    return {
      machineTableTitle: "List of Machines",
      headItems: ["Machine", "More Info"],
      isDetailedButtonAvailable: true,
      DetailedButtonPath: "/details",
    };
  },
  components: {
    MachineTable,
  },
};
</script>
