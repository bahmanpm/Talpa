<template>
  <div class="container">
    <table>
      <caption>
        {{
          title
        }}
      </caption>
      <thead>
        <tr>
          <th>Machine Name</th>
          <th>More Info</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.name }}</td>
          <td>
            <DetailedButton title="Details" :id="item.id" :isOutlined="false" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DetailedButton from "./DetailsButton.vue";
export default {
  name: "MachineTable",
  props: {
    title: String,
    data: Array,
  },
  components: {
    DetailedButton,
  },
};
</script>

<style scoped>
caption {
  font-size: 2rem;
  font-weight: bold;
  color: gray;
  text-align: left;
}
</style>
