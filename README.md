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
|-- playwright.config.ts
|-- README.md
|-- tsconfig.json
|-- pages/
|   |-- login.page.ts
|   `-- register.page.ts
|-- tests/
|   |-- ui/
|   |   `-- users/
|   |       |-- login.spec.ts
|   |       |-- register.spec.ts
|   |       `-- test-data/
|   |           |-- login.data.ts
|   |           `-- register.data.ts
|   `-- api/
|       `-- users/
|           `-- get-users.spec.ts
```

### Directory Descriptions

| Path                                | Purpose                                           |
| ----------------------------------- | ------------------------------------------------- |
| `pages/`                            | Page Object Models for UI tests                   |
| `pages/login.page.ts`               | Page object for login flow                        |
| `pages/register.page.ts`            | Page object for registration flow                 |
| `tests/ui/`                         | UI tests grouped by domain                        |
| `tests/ui/users/`                   | User management UI tests                          |
| `tests/ui/users/login.spec.ts`      | Login UI tests                                    |
| `tests/ui/users/register.spec.ts`   | Registration UI tests                             |
| `tests/ui/users/test-data/`         | Test data for user UI tests                       |
| `tests/api/`                        | API endpoint tests                                |
| `tests/api/users/`                  | API tests for users endpoints                     |
| `tests/api/users/get-users.spec.ts` | Tests for GET /users endpoints                    |
| `playwright.config.ts`              | Playwright configuration with UI and API projects |

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
