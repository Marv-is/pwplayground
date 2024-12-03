<template>
  <div class="task-list-page">
    <!-- Zurück zum Dashboard-Button -->
    <button @click="goToDashboard" class="back-button" data-testid="back-to-dashboard-button">
      ← Zurück zum Dashboard
    </button>

    <div class="task-content">
      <h2>Aufgabenliste</h2>

      <!-- Neues Aufgabenformular -->
      <form @submit.prevent="addTask" class="task-form">
        <div class="form-group">
          <label for="task-title">Aufgabe:</label>
          <input
            id="task-title"
            v-model="newTask.title"
            type="text"
            placeholder="Aufgabenbeschreibung"
            data-testid="input-task-title"
            required
          />
        </div>

        <div class="form-group">
          <label for="due-date">Fälligkeitsdatum:</label>
          <input
            id="due-date"
            v-model="newTask.dueDate"
            type="date"
            data-testid="input-due-date"
          />
        </div>

        <div class="form-group">
          <label for="priority">Priorität:</label>
          <select
            id="priority"
            v-model="newTask.priority"
            data-testid="select-priority"
          >
            <option value="Niedrig">Niedrig</option>
            <option value="Mittel">Mittel</option>
            <option value="Hoch">Hoch</option>
          </select>
        </div>

        <button type="submit" class="submit-button" data-testid="submit-task-button">
          Aufgabe hinzufügen
        </button>
      </form>

      <!-- Filteroptionen -->
      <div class="filter-controls">
        <label>
          <input
            type="radio"
            value="Alle"
            v-model="filterStatus"
            data-testid="filter-all"
          />
          Alle
        </label>
        <label>
          <input
            type="radio"
            value="Erledigt"
            v-model="filterStatus"
            data-testid="filter-completed"
          />
          Erledigt
        </label>
        <label>
          <input
            type="radio"
            value="Offen"
            v-model="filterStatus"
            data-testid="filter-pending"
          />
          Offen
        </label>
      </div>

      <!-- Aufgabenliste -->
      <ul class="task-list" data-testid="task-list">
        <li
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-item"
          :class="{ completed: task.completed }"
          data-testid="task-item"
        >
          <div class="task-details">
            <input
              type="checkbox"
              v-model="task.completed"
              @change="toggleTaskCompletion(task)"
              data-testid="task-completed-checkbox"
            />
            <span :class="{ 'task-title': true, completed: task.completed }">
              {{ task.title }}
            </span>
            <span class="task-info">
              Fällig am: {{ task.dueDate }} | Priorität: {{ task.priority }}
            </span>
          </div>
          <button @click="editTask(task)" data-testid="edit-task-button">Bearbeiten</button>
          <button @click="deleteTask(task.id)" data-testid="delete-task-button">Löschen</button>
        </li>
      </ul>

      <!-- Bearbeitungsformular für die Aufgabe -->
      <div v-if="editingTask" class="edit-task-form" data-testid="edit-task-form">
        <h3>Aufgabe bearbeiten</h3>
        <form @submit.prevent="updateTask">
          <div class="form-group">
            <label for="edit-task-title">Aufgabe:</label>
            <input
              id="edit-task-title"
              v-model="editingTask.title"
              type="text"
              required
              data-testid="edit-task-title"
            />
          </div>

          <div class="form-group">
            <label for="edit-due-date">Fälligkeitsdatum:</label>
            <input
              id="edit-due-date"
              v-model="editingTask.dueDate"
              type="date"
              data-testid="edit-due-date"
            />
          </div>

          <div class="form-group">
            <label for="edit-priority">Priorität:</label>
            <select
              id="edit-priority"
              v-model="editingTask.priority"
              data-testid="edit-priority"
            >
              <option value="Niedrig">Niedrig</option>
              <option value="Mittel">Mittel</option>
              <option value="Hoch">Hoch</option>
            </select>
          </div>

          <button type="submit" class="update-button" data-testid="update-task-button">
            Änderungen speichern
          </button>
          <button @click="cancelEdit" class="cancel-button" data-testid="cancel-edit-button">
            Abbrechen
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      newTask: {
        title: '',
        dueDate: '',
        priority: 'Mittel',
        completed: false,
      },
      filterStatus: 'Alle',
      editingTask: null,
    };
  },
  computed: {
    filteredTasks() {
      if (this.filterStatus === 'Alle') {
        return this.tasks;
      } else if (this.filterStatus === 'Erledigt') {
        return this.tasks.filter((task) => task.completed);
      } else {
        return this.tasks.filter((task) => !task.completed);
      }
    },
  },
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    addTask() {
      const newTask = { ...this.newTask, id: Date.now() };
      this.tasks.push(newTask);
      this.newTask = { title: '', dueDate: '', priority: 'Mittel', completed: false };
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
    },
    editTask(task) {
      this.editingTask = { ...task };
    },
    updateTask() {
      const taskIndex = this.tasks.findIndex((t) => t.id === this.editingTask.id);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1, this.editingTask);
        this.editingTask = null;
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
    cancelEdit() {
      this.editingTask = null;
    },
  },
};
</script>

<style scoped>
/* Layout und Styling der TaskListPage */
.task-list-page {
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

.task-content {
  background: #ffffff;
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
  box-sizing: border-box;
  margin: 0 auto; /* Horizontales Zentrieren */
}

h2 {
  color: #333333;
  margin-bottom: 1.5rem;
}

.task-form, .edit-task-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  font-size: 1rem;
  color: #555555;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"], input[type="date"], select {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-top: 0.3rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input:focus, select:focus {
  border-color: #3b82f6;
  outline: none;
}

.submit-button, .update-button, .cancel-button {
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 0.5rem;
}

.submit-button:hover, .update-button:hover, .cancel-button:hover {
  background-color: #2563eb;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9fafb;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.task-details {
  display: flex;
  align-items: center;
}

.task-title {
  font-weight: bold;
  margin-left: 0.5rem;
}

.task-info {
  font-size: 0.9rem;
  color: #777;
  margin-left: 1rem;
}

.completed .task-title {
  text-decoration: line-through;
  color: #888;
}

</style>
