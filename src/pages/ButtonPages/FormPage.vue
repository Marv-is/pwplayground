<template>
  <div class="form-page">
    <!-- Zurück zum Dashboard-Button -->
    <button @click="goToDashboard" class="back-button" data-testid="back-to-dashboard-button">
      ← Zurück zum Dashboard
    </button>

    <div class="form-content">
      <h2>Formular</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Name Input -->
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            placeholder="Dein Name"
            data-testid="input-name"
            required
          />
        </div>

        <!-- E-Mail Input -->
        <div class="form-group">
          <label for="email">E-Mail:</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="Deine E-Mail-Adresse"
            data-testid="input-email"
            required
          />
        </div>

        <!-- Passwort Input mit Toggle -->
        <div class="form-group">
          <label for="password">Passwort:</label>
          <input
            id="password"
            v-model="formData.password"
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="Passwort"
            data-testid="input-password"
            required
          />
          <label class="toggle-label">
            <input
              type="checkbox"
              v-model="passwordVisible"
              data-testid="toggle-password"
            />
            Passwort anzeigen
          </label>
        </div>

        <!-- Geschlecht Radio Buttons -->
        <div class="form-group">
          <label>Geschlecht:</label>
          <label>
            <input
              type="radio"
              value="Männlich"
              v-model="formData.gender"
              data-testid="radio-gender-male"
            />
            Männlich
          </label>
          <label>
            <input
              type="radio"
              value="Weiblich"
              v-model="formData.gender"
              data-testid="radio-gender-female"
            />
            Weiblich
          </label>
          <label>
            <input
              type="radio"
              value="Divers"
              v-model="formData.gender"
              data-testid="radio-gender-diverse"
            />
            Divers
          </label>
        </div>

        <!-- Land Dropdown Auswahl -->
        <div class="form-group">
          <label for="country">Land:</label>
          <select
            id="country"
            v-model="formData.country"
            data-testid="select-country"
            required
          >
            <option value="">Bitte wählen...</option>
            <option value="Deutschland">Deutschland</option>
            <option value="Österreich">Österreich</option>
            <option value="Schweiz">Schweiz</option>
          </select>
        </div>

        <!-- Geburtsdatum Input -->
        <div class="form-group">
          <label for="birthdate">Geburtsdatum:</label>
          <input
            id="birthdate"
            v-model="formData.birthdate"
            type="date"
            data-testid="input-birthdate"
          />
        </div>

        <!-- Erfahrung Schieberegler -->
        <div class="form-group">
          <label for="experience">Erfahrung (1-10):</label>
          <input
            id="experience"
            v-model="formData.experience"
            type="range"
            min="1"
            max="10"
            data-testid="slider-experience"
          />
          <span>{{ formData.experience }}</span>
        </div>

        <!-- Datei-Upload -->
        <div class="form-group">
          <label for="file">Datei hochladen:</label>
          <input
            id="file"
            type="file"
            @change="handleFileUpload"
            data-testid="input-file"
          />
          <p v-if="formData.fileName">Datei: {{ formData.fileName }}</p>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button" data-testid="submit-button">
          Abschicken
        </button>
      </form>

      <!-- Eingegebene Daten anzeigen -->
      <div v-if="submitted" class="form-data-display" data-testid="form-data-display">
        <h3>Eingegebene Daten:</h3>
        <p data-testid="output-name"><strong>Name:</strong> {{ formData.name }}</p>
        <p data-testid="output-email"><strong>E-Mail:</strong> {{ formData.email }}</p>
        <p data-testid="output-gender"><strong>Geschlecht:</strong> {{ formData.gender }}</p>
        <p data-testid="output-country"><strong>Land:</strong> {{ formData.country }}</p>
        <p data-testid="output-birthdate"><strong>Geburtsdatum:</strong> {{ formData.birthdate }}</p>
        <p data-testid="output-experience"><strong>Erfahrung:</strong> {{ formData.experience }}</p>
        <p v-if="formData.fileName" data-testid="output-file"><strong>Hochgeladene Datei:</strong> {{ formData.fileName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        gender: '',
        country: '',
        birthdate: '',
        experience: 5,
        fileName: '',
      },
      passwordVisible: false,
      submitted: false,
    };
  },
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    handleSubmit() {
      this.submitted = true;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.fileName = file.name;
      }
    },
  },
};
</script>

<style scoped>
/* Layout und Styling der FormPage */
.form-page {
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

.form-content {
  background: #ffffff;
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  text-align: left;
  box-sizing: border-box;
  margin: 0 auto; /* Zentriert den Inhalt symmetrisch */
}

h2 {
  color: #333333;
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  font-size: 1rem;
  color: #555555;
  margin-bottom: 0.5rem;
  display: block;
}

.toggle-label {
  font-size: 0.9rem;
  color: #555;
  display: block;
  margin-top: 0.5rem;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
select {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-top: 0.3rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input:focus,
select:focus {
  border-color: #3b82f6;
  outline: none;
}

.submit-button {
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #2563eb;
}

.form-data-display {
  margin-top: 2rem;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
</style>
