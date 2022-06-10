<template>
  <div class="home">
    <!-- <img alt="Talpa logo" src="../assets/logo.png" /> -->
    <h1>Sensor Details Page</h1>
    <div class="hello" ref="chartdiv"></div>
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
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default {
  name: "DetailsView",
  data() {
    return {
      //   sensorsTableTitle: "List of Sensors",
      //   headItems: ["Sensor", "Details"],
      //   isDetailedButtonAvailable: true,
    };
  },
  mounted() {
    let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({
        date: new Date(2018, 0, i),
        name: "name" + i,
        value: visits,
      });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  //   components: { SensorsTable },
};
</script>
