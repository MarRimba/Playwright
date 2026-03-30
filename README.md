# 🎭 Playwright Automated Testing Project

Automated UI and API tests written in TypeScript with Playwright.
The suite targets a local app running at `http://localhost:3000`.

## 📚 Stack

- 🎭 Playwright Test
- 🔷 TypeScript
- 💚 Node.js
- 📝 dotenv
- 🔀 @faker-js/faker

## 🗂️ Project Structure

```text
.
|-- .env
|-- .env.example
|-- global-setup.ts
|-- global-teardown.ts
|-- playwright.config.ts
|-- pages/
|   |-- articles.page.ts
|   |-- login.page.ts
|   `-- register.page.ts
`-- tests/
    |-- api/
    |   |-- config/
    |   |   |-- api-endpoints.ts
    |   |   |-- api-headers.ts
    |   |   `-- api-status-codes.ts
    |   |-- token/
    |   |   `-- token.spec.ts
    |   `-- users/
    |       |-- delete-user.spec.ts
    |       |-- get-users.spec.ts
    |       |-- patch-user.spec.ts
    |       |-- post-user.spec.ts
    |       |-- put-user.spec.ts
    |       `-- test-data/
    |           `-- user.data.ts
    `-- ui/
        |-- articles/
        |   |-- list-articles.spec.ts
        |   |-- post-article.spec.ts
        |   `-- test-data/
        |       `-- articles.data.ts
        `-- users/
            |-- login.spec.ts
            |-- register.spec.ts
            `-- test-data/
                |-- login.data.ts
                `-- register.data.ts
```

## ✅ Prerequisites

- Node.js LTS
- npm
- Playwright browsers installed
- tested application running at `http://localhost:3000`

## 📦 Installation

```bash
npm install
```

## 🔐 Environment Variables

Create `.env` based on `.env.example`:

```bash
# UI credentials
LOGIN_EMAIL=your-email@example.com
LOGIN_PASSWORD=your-password

# API auth credentials
TEST_USER_EMAIL=test-user@example.com
TEST_USER_PASSWORD=test-password

# populated automatically in global setup
BEARER_TOKEN=
```

## ⏳ Test Lifecycle

- `global-setup.ts`
  - logs in via `/api/login`
  - stores `BEARER_TOKEN` in `.env`
- tests run (UI + API projects)
- `global-teardown.ts`
  - restores database state via `/api/restoreDB`
  - tries `POST`, then falls back to `GET` for compatibility

## ▶️ Running Tests

Quick start:

```bash
# Run all tests
npx playwright test

# Run API tests only
npx playwright test tests/api --project=api

# Run UI tests only
npx playwright test tests/ui --project=chromium

# Open HTML report
npx playwright show-report
```

For complete list of commands and more options, see [Test Suite Documentation](TESTS.md).

## Tested Application

- repo: `https://github.com/jaktestowac/gad-gui-api-demo`
- local URL: `http://localhost:3000`
