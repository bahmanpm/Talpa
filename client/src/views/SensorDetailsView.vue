<template>
  <div class="home">
    <h1>Sensor Details Page</h1>
    <div id="chartdiv"></div>
  </div>
</template>

<script>
import sensorDetailsGQL from "../graphql/sensorDetails.gql";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";

am4core.useTheme(am4themes_animated);

export default {
  name: "DetailsView",
  data() {
    return {};
  },
  methods: {
    async fetchEvents() {
      const { data } = await this.$apollo.query({
        query: sensorDetailsGQL,
        variables: {
          id: "sjkfhsjkfhjshgjlwheglkhe",
          from: "1994-04-11 12:32:04",
          to: "1992-09-09 20:46:39",
        },
      });
      this.data = data;
      this.loadChart(this.data.sensorData);
    },
    loadChart(data) {
      // Apply chart themes
      am4core.useTheme(am4themes_animated);
      am4core.useTheme(am4themes_kelly);

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
</style>
