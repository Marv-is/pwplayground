<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script>
import { Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

export default {
  name: "LineChart",
  props: ["chartData"],
  components: {
    Line,
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Kategorie / Jahr",
            },
          },
          y: {
            title: {
              display: true,
              text: "Wert",
            },
          },
        },
      };
    },
  },
};
</script>

<style scoped>
</style>
