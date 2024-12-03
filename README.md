# playwright_playground

Kleines Übungsprojekt für Playwright.
In PlaywrightTasks.md findet man Beispiel Aufgaben, die man lösen kann.

Benutzername und Passwort sind admin/password
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)


Um Tests zu starten, muss man außerdem in den Ordner playwright_playground/playwright_playground/playwright navigieren.

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the tests with browser ui
npx playwright test .\login.spec.ts --headed
# Runs the tests only on Chromium
npx playwright test .\login.spec.ts -- --project=chromium
# Runs the tests of a specific file
npx playwright test .\login.spec.ts
# Runs the tests in debug mode
npx playwright test .\login.spec.ts --debug

```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

