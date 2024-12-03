<template>
  <div class="login-page">
    <div class="login-form">
      <h2>Willkommen zurück!</h2>
      <p class="welcome-text">Melde dich an, um fortzufahren</p>
      <form @submit.prevent="onLogin">
        <div class="form-group">
          <label for="username">Benutzername</label>
          <input
            v-model="username"
            id="username"
            type="text"
            placeholder="Benutzername"
            data-testid="username-input"
          />
        </div>
        <div class="form-group">
          <label for="password">Passwort</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Passwort"
            data-testid="password-input"
          />
        </div>
        <button type="submit" class="login-button" data-testid="login-button">
          Anmelden
        </button>
        <p v-if="errorMessage" class="error-message" data-testid="error-message">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    onLogin() {
      // Einfache Login-Überprüfung
      if (this.username === 'admin' && this.password === 'password') {
        // Navigiere zur Dashboard-Seite
        this.$router.push('/dashboard');
      } else {
        this.errorMessage = 'Ungültige Anmeldedaten';
      }
    },
  },
};
</script>

<style scoped>
/* Layout-Styling mit Hintergrund-Verlauf */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  padding: 1rem;
  box-sizing: border-box;
}

/* Formular-Styling */
.login-form {
  background: #ffffff;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
}

.login-form:hover {
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

h2 {
  color: #333333;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.welcome-text {
  color: #555555;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

/* Eingabefelder */
.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  font-size: 0.9rem;
  color: #555555;
}

input {
  width: 100%;
  padding: 0.9rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  margin-top: 0.3rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  outline: none;
}

/* Login-Button */
.login-button {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.login-button:active {
  transform: translateY(1px);
}

/* Fehlermeldung */
.error-message {
  color: #ef4444;
  font-size: 1rem;
  margin-top: 1.5rem;
}
</style>




