<template>
  <div class="analytics-page">
    <!-- Zurück zum Dashboard-Button -->
    <button @click="goToDashboard" class="back-button" data-testid="back-to-dashboard-button">
      ← Zurück zum Dashboard
    </button>

    <div class="analytics-content">
      <h2>Datenanalyse und Visualisierung</h2>

      <!-- Tab-Navigation für Diagramme -->
      <div class="tab-nav">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
          data-testid="tab-button"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Filteroptionen -->
      <div class="filters">
        <div class="form-group">
          <label for="year">Jahr:</label>
          <select id="year" v-model="selectedYear" @change="updateData" data-testid="year-select">
            <option value="">Alle Jahre</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="category">Kategorie:</label>
          <select id="category" v-model="selectedCategory" @change="updateData" data-testid="category-select">
            <option value="">Alle Kategorien</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="value-range">Wertebereich:</label>
          <input
            id="value-range"
            type="range"
            min="0"
            max="100"
            v-model="valueRange"
            @input="updateData"
            data-testid="value-range"
          />
          <span>{{ valueRange }}</span>
        </div>
      </div>

      <!-- Diagrammbereich -->
      <div v-if="activeTab === 'Balkendiagramm'" class="chart-container" data-testid="bar-chart">
        <bar-chart :chart-data="chartData" />
      </div>

      <div v-if="activeTab === 'Liniendiagramm'" class="chart-container" data-testid="line-chart">
        <line-chart :chart-data="chartData" />
      </div>

      <div v-if="activeTab === 'Tortendiagramm'" class="chart-container" data-testid="pie-chart">
        <pie-chart :chart-data="chartData" />
      </div>

      <!-- Export Button -->
      <button @click="exportChart" class="export-button" data-testid="export-chart-button">
        Diagramm exportieren
      </button>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import PieChart from "@/components/PieChart.vue";

export default {
  components: {
    BarChart,
    LineChart,
    PieChart,
  },
  data() {
    return {
      tabs: ["Balkendiagramm", "Liniendiagramm", "Tortendiagramm"],
      activeTab: "Balkendiagramm",
      years: [2020, 2021, 2022, 2023],
      categories: ["Kategorie A", "Kategorie B", "Kategorie C"],
      selectedYear: "",
      selectedCategory: "",
      valueRange: 50,
      data: [
        { year: 2020, category: "Kategorie A", value: 30 },
        { year: 2020, category: "Kategorie B", value: 70 },
        { year: 2021, category: "Kategorie A", value: 45 },
        { year: 2021, category: "Kategorie C", value: 20 },
        { year: 2022, category: "Kategorie B", value: 80 },
        { year: 2023, category: "Kategorie A", value: 90 },
      ],
    };
  },
  computed: {
    filteredData() {
      return this.data.filter((item) => {
        return (
          (this.selectedYear === "" || item.year === parseInt(this.selectedYear)) &&
          (this.selectedCategory === "" || item.category === this.selectedCategory) &&
          item.value <= this.valueRange
        );
      });
    },
    chartData() {
      return {
        labels: this.filteredData.map((item) => `${item.year} - ${item.category}`),
        datasets: [
          {
            label: "Wert",
            backgroundColor: "#3b82f6",
            data: this.filteredData.map((item) => item.value),
          },
        ],
      };
    },
  },
  methods: {
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    updateData() {
      // Daten werden automatisch durch computed properties aktualisiert
    },
    exportChart() {
      alert("Diagramm wurde exportiert.");
    },
  },
};
</script>

<style scoped>
/* Layout und Styling der AnalyticsPage */
.analytics-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  padding: 1rem;
  box-sizing: border-box;
}

/* Zurück zum Dashboard-Button */
.back-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2563eb;
}

.analytics-content {
  background: #ffffff;
  padding: 2.5rem;
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  box-sizing: border-box;
}

h2 {
  color: #333333;
  margin-bottom: 1.5rem;
}

.tab-nav {
  display: flex;
  margin-bottom: 1.5rem;
}

.tab-nav button {
  flex: 1;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #f1f5f9;
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
}

.tab-nav button.active {
  background-color: #3b82f6;
  color: #ffffff;
}

.filters {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  flex: 1;
}

.chart-container {
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.export-button {
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.export-button:hover {
  background-color: #2563eb;
}
</style>

