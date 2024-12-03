<template>
  <div class="dashboard-page">
    <div class="logout-container">
      <button @click="logout" class="logout-button" data-testid="logout-button">Logout</button>
    </div>
    <div class="dashboard-content">
      <h2>Dashboard</h2>
      <div class="button-grid">
        <button @click="navigateTo('dashboard/list')" class="dashboard-button" data-testid="list-button">
          Listen
        </button>
        <button @click="navigateTo('dashboard/form')" class="dashboard-button" data-testid="form-button">
          Formular
        </button>
        <button @click="navigateTo('dashboard/taskList')" class="dashboard-button" data-testid="todo-button">
          Todo Liste
        </button>
        <button @click="navigateTo('dashboard/analytics')" class="dashboard-button" data-testid="analytic-button">
          Interaktive Datenvisualisierung
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push('/login');
    },
    navigateTo(page) {
      this.$router.push(`/${page}`);
    }
  }
};
</script>

<style scoped>
/* Dashboard Layout und Hintergrund */
.dashboard-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  padding: 1rem;
  box-sizing: border-box;
}

/* Logout-Button */
.logout-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.logout-button {
  background-color: #ef4444;
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #dc2626;
}

/* Dashboard-Inhalt */
.dashboard-content {
  background: #ffffff;
  padding: 3rem;
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
}

h2 {
  color: #333333;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

/* Button-Grid */
.button-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.dashboard-button {
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
}

.dashboard-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.dashboard-button:active {
  transform: translateY(1px);
}
</style>
