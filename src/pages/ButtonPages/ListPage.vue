<template>
  <div class="list-page">
    <!-- Zurück zum Dashboard-Button außerhalb des Inhaltsbereichs oben links -->
    <button @click="goToDashboard" class="back-button" data-testid="back-to-dashboard-button">
      ← Zurück zum Dashboard
    </button>

    <div class="list-content">
      <h2>Elemente durchsuchen</h2>

      <div class="controls">
        <!-- Suchleiste -->
        <div class="form-group">
          <label for="search">Suche:</label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Suche nach Element..."
            class="search-input"
            @input="applyFilters"
            data-testid="search-input"
          />
        </div>

        <!-- Kategorie Dropdown -->
        <div class="form-group">
          <label for="category-filter">Hauptkategorie:</label>
          <select
            id="category-filter"
            v-model="selectedCategory"
            @change="applyFilters"
            data-testid="category-filter"
            class="dropdown"
          >
            <option value="">Alle</option>
            <option value="Obst">Obst</option>
            <option value="Gemüse">Gemüse</option>
          </select>
        </div>

        <!-- Art Dropdown -->
        <div class="form-group">
          <label for="type-filter">Art:</label>
          <select
            id="type-filter"
            v-model="selectedType"
            @change="applyFilters"
            data-testid="type-filter"
            class="dropdown"
          >
            <option value="">Alle</option>
            <option value="Apfel">Apfel</option>
            <option value="Banane">Banane</option>
            <option value="Karotte">Karotte</option>
            <option value="Salat">Salat</option>
          </select>
        </div>

        <!-- Sortierung Dropdown -->
        <div class="form-group">
          <label for="sort-order">Sortieren nach:</label>
          <select
            id="sort-order"
            v-model="sortOrder"
            @change="applySort"
            data-testid="sort-order"
            class="dropdown"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>

        <!-- Refresh-Button -->
        <button @click="refreshList" class="refresh-button" data-testid="refresh-button">
          Liste aktualisieren
        </button>
      </div>

      <!-- Liste der gefilterten Elemente -->
      <ul class="item-list" data-testid="item-list">
        <li
          v-for="item in filteredItems"
          :key="item.id"
          class="item"
          data-testid="list-item"
        >
          <span class="item-name">{{ item.name }}</span>
          <span class="item-details">{{ item.category }} - {{ item.type }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: 'Golden Delicious', category: 'Obst', type: 'Apfel' },
        { id: 2, name: 'Gala', category: 'Obst', type: 'Apfel' },
        { id: 3, name: 'Cavendish', category: 'Obst', type: 'Banane' },
        { id: 4, name: 'Plantain', category: 'Obst', type: 'Banane' },
        { id: 5, name: 'Karottenbund', category: 'Gemüse', type: 'Karotte' },
        { id: 6, name: 'Nantes', category: 'Gemüse', type: 'Karotte' },
        { id: 7, name: 'Römersalat', category: 'Gemüse', type: 'Salat' },
        { id: 8, name: 'Eisbergsalat', category: 'Gemüse', type: 'Salat' },
      ],
      searchQuery: '',
      selectedCategory: '',
      selectedType: '',
      sortOrder: 'name-asc',
      filteredItems: [],
    };
  },
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    applyFilters() {
      this.filteredItems = this.items.filter(item => {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesCategory =
          this.selectedCategory === '' || item.category === this.selectedCategory;
        const matchesType =
          this.selectedType === '' || item.type === this.selectedType;
        return matchesSearch && matchesCategory && matchesType;
      });
      this.applySort();
    },
    applySort() {
      this.filteredItems.sort((a, b) => {
        if (this.sortOrder === 'name-asc') {
          return a.name.localeCompare(b.name);
        } else if (this.sortOrder === 'name-desc') {
          return b.name.localeCompare(a.name);
        }
      });
    },
    refreshList() {
      // Aktualisiert die Liste und setzt die Filter zurück
      this.searchQuery = '';
      this.selectedCategory = '';
      this.selectedType = '';
      this.sortOrder = 'name-asc';
      this.applyFilters();
    },
  },
  mounted() {
    this.applyFilters();
  },
};
</script>

<style scoped>
/* Layout und Styling der ListPage */
.list-page {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  padding: 1rem;
  box-sizing: border-box;
}

/* Zurück zum Dashboard-Button oben links */
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

.list-content {
  background: #ffffff;
  padding: 2.5rem;
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

/* Steuerungsfelder */
.controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1rem;
}

label {
  font-size: 0.9rem;
  color: #555555;
  margin-bottom: 0.5rem;
  display: block;
}

.search-input,
.dropdown {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.search-input:focus,
.dropdown:focus {
  border-color: #3b82f6;
  outline: none;
}

/* Refresh-Button */
.refresh-button {
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.refresh-button:hover {
  background-color: #2563eb;
}

/* Liste der Elemente */
.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
}

.item-name {
  font-weight: bold;
  color: #333;
}

.item-details {
  font-size: 0.9rem;
  color: #777;
}
</style>




