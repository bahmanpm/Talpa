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
          <th v-for="(item, index) in headItems" :key="index">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.name }}</td>
          <td v-if="isDetailedButtonAvailable">
            <DetailedButton
              title="Details"
              :path="DetailedButtonPath"
              :id="item.id"
              :isOutlined="false"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DetailedButton from "./DetailsButton.vue";
export default {
  name: "TableComponent",
  props: {
    title: String,
    data: Array,
    headItems: Array,
    isDetailedButtonAvailable: Boolean,
    DetailedButtonPath: String,
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
