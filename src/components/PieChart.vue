<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: "PieChart",
  props: ["chartData"],
  components: {
    Pie,
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `Wert: ${tooltipItem.raw}`,
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
