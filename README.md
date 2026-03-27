# Playwright Automated Testing Project

Automated UI and API tests written in TypeScript with Playwright.
The suite targets a local app running at `http://localhost:3000`.

## Stack

- Playwright Test
- TypeScript
- Node.js
- dotenv
- @faker-js/faker

## Project Structure

```text
.
|-- .env
|-- .env.example
|-- global-setup.ts
|-- global-teardown.ts
|-- playwright.config.ts
|-- pages/
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
        |   `-- post-article.spec.ts
        `-- users/
            |-- login.spec.ts
            |-- register.spec.ts
            `-- test-data/
                |-- login.data.ts
                `-- register.data.ts
```

## Prerequisites

- Node.js LTS
- npm
- Playwright browsers installed
- tested application running at `http://localhost:3000`

## Installation

```bash
npm install
```

## Environment Variables

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

## Test Lifecycle

- `global-setup.ts`
  - logs in via `/api/login`
  - stores `BEARER_TOKEN` in `.env`
- tests run (UI + API projects)
- `global-teardown.ts`
  - restores database state via `/api/restoreDB`
  - tries `POST`, then falls back to `GET` for compatibility

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run API tests only:

```bash
npx playwright test tests/api --project=api
```

Run UI tests only:

```bash
npx playwright test tests/ui --project=chromium
```

Run by tag examples:

```bash
npx playwright test --grep @smoke
npx playwright test --grep @users
npx playwright test --grep @putUser
npx playwright test --grep @deleteUser
npx playwright test --grep @postArticle

```

Open HTML report:

```bash
npx playwright show-report
```

## Tested Application

- repo: `https://github.com/jaktestowac/gad-gui-api-demo`
- local URL: `http://localhost:3000`
