<template>
  <div class="home">
    <h1>Sensor Details Page</h1>
    <form>
      <div class="row">
        <div class="column">
          <label for="from">From:</label>
          <input type="date" id="from" name="from" ref="from" />
        </div>
        <div class="column">
          <label for="to">To:</label>
          <input type="date" id="to" name="to" ref="to" />
        </div>
      </div>
      <input type="submit" value="Submit" @click="onSubmit" />
    </form>
    <div id="chartdiv"></div>
    <ModalComponent
      :show="isModalOpen"
      :message="modalMessage"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script>
import sensorDetailsGQL from "../graphql/sensorDetails.gql";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import ModalComponent from "../components/ModalComponent";

// Apply chart themes
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);

export default {
  name: "DetailsView",
  data() {
    return {
      sensorData: [],
      sortedSensorData: [],
      filteredSensorData: [],
      defaultId: "5f7dd680-369e-4578-a231-683bd48275b4",
      defaultDateFrom: "1990-01-01 12:32:04",
      defaultDateTo: "2010-01-01 20:46:39",
      isModalOpen: false,
      modalMessage: "",
    };
  },
  components: { ModalComponent },
  methods: {
    async fetchEvents(
      id = this.defaultId,
      from = this.defaultDateFrom,
      to = this.defaultDateTo
    ) {
      try {
        const { data } = await this.$apollo.query({
          query: sensorDetailsGQL,
          variables: {
            id: id,
            from: from,
            to: to,
          },
        });

        this.sensorData = data.sensorData;
        this.sortedSensorData = this.sortDates(this.sensorData);
        this.loadChart(this.sortedSensorData);
      } catch (error) {
        console.log(error);
        this.modalMessage = error;
        this.isModalOpen = true;
      }
    },
    loadChart(data) {
      // Create chart instance
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      // Add data
      chart.data = data;

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "timestamp";
      categoryAxis.title.text = "Sensor Values History";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Expenditure (M)";

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "value";
      series.dataFields.categoryX = "timestamp";
      series.name = "Value";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      // This has no effect
      // series.stacked = true;

      let label = categoryAxis.renderer.labels.template;
      label.truncate = true;
      label.maxWidth = 80;

      // Add cursor
      chart.cursor = new am4charts.XYCursor();

      // Add legend
      chart.legend = new am4charts.Legend();
    },
    sortDates(dates) {
      return dates.sort(function (a, b) {
        let c = new Date(a.timestamp);
        let d = new Date(b.timestamp);
        return c - d;
      });
    },
    filterDates(dates, from, to) {
      return dates.filter(function (date) {
        return date.timestamp >= from && date.timestamp <= to;
      });
    },
    onSubmit(event) {
      event.preventDefault();
      this.filteredSensorData = this.filterDates(
        this.sortedSensorData,
        this.$refs.from.value,
        this.$refs.to.value
      );
      this.loadChart(this.filteredSensorData);
      // Or in case if you want to receive filtered data from backend.
      // this.fetchEvents(this.defaultId, this.$refs.from.value, this.$refs.to.value);
    },
  },
  mounted() {
    this.fetchEvents();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
#chartdiv {
  width: 100%;
  height: 100vh;
}

form {
  margin: 0 1.5rem;
}
</style>
