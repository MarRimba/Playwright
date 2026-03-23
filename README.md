# Playwright Automated Testing Project

## 🎯 Project Purpose

- This repository contains end-to-end tests written in TypeScript using Playwright.
- The project verifies user login and registration flows.
- Tests run against an application available at `http://localhost:3000`.

## 🛠️ Technology Stack

- Playwright Test
- TypeScript
- Node.js
- `@faker-js/faker` for test data generation
- `dotenv` for loading environment variables

## 📁 Project Structure

```text
.
|-- .env.example
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- pages/
|   |-- login.page.ts
|   `-- register.page.ts
|-- playwright.config.ts
|-- README.en.md
|-- README.md
|-- tsconfig.json
`-- tests/
    `-- users/
        |-- login.spec.ts
        |-- register.spec.ts
        `-- test-data/
            |-- login.data.ts
            `-- register.data.ts
```

- `pages/login.page.ts` - page object for login flow
- `pages/register.page.ts` - page object for registration flow
- `playwright.config.ts` - Playwright configuration and environment loading
- `tests/users/login.spec.ts` - login tests
- `tests/users/register.spec.ts` - registration tests
- `tests/users/test-data/login.data.ts` - login test data
- `tests/users/test-data/register.data.ts` - registration test data

## ✅ Prerequisites

- Node.js LTS
- npm
- installed Playwright browsers
- tested application running at `http://localhost:3000`

## 🌐 Tested Application

- Application repository: `https://github.com/jaktestowac/gad-gui-api-demo`
- Startup command:

```bash
npm run start
```

## 📦 Installation

```bash
npm install
```