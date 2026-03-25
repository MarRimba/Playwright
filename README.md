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
|-- .env                          # Environment variables (local, ignored in git)
|-- .env.example                  # Example environment variables template
|-- .gitignore
|-- global-setup.ts               # Global setup: authenticates and saves Bearer token
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
|           |-- get-users.spec.ts
|           |-- post-user.spec.ts
|           `-- test-data/
|               `-- post-user.data.ts
```

### Directory Descriptions

| Path                                          | Purpose                                           |
| --------------------------------------------- | ------------------------------------------------- |
| `global-setup.ts`                             | Global setup: authenticates user and saves token  |
| `playwright.config.ts`                        | Playwright configuration with UI and API projects |
| `pages/`                                      | Page Object Models for UI tests                   |
| `pages/login.page.ts`                         | Page object for login flow                        |
| `pages/register.page.ts`                      | Page object for registration flow                 |
| `tests/ui/`                                   | UI tests grouped by domain                        |
| `tests/ui/users/`                             | User management UI tests                          |
| `tests/ui/users/login.spec.ts`                | Login UI tests                                    |
| `tests/ui/users/register.spec.ts`             | Registration UI tests                             |
| `tests/ui/users/test-data/`                   | Test data for user UI tests                       |
| `tests/api/`                                  | API endpoint tests                                |
| `tests/api/users/`                            | API tests for users endpoints                     |
| `tests/api/users/get-users.spec.ts`           | Tests for GET /users endpoints                    |
| `tests/api/users/post-user.spec.ts`           | Tests for POST /users endpoint                    |
| `tests/api/users/test-data/`                  | Test data for API tests                           |
| `tests/api/users/test-data/post-user.data.ts` | User payloads and validation cases for POST tests |

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

## � Authentication

The project uses Bearer token authentication for API tests:

- **Global Setup**: `global-setup.ts` automatically runs before each test run
- **Authentication Flow**:
  1. Logs in with credentials from `.env` (`TEST_USER_EMAIL`, `TEST_USER_PASSWORD`)
  2. Receives `access_token` from `/api/login`
  3. Saves token to `.env` (`BEARER_TOKEN`)
  4. Token is available as `process.env.BEARER_TOKEN` during tests

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# UI Tests Credentials
LOGIN_EMAIL = your-email@example.com
LOGIN_PASSWORD = your-password

# API Authentication
TEST_USER_EMAIL = test-user@example.com
TEST_USER_PASSWORD = test-password
BEARER_TOKEN = (auto-populated by global-setup.ts)
```

**Note**: `.env` is ignored in git (see `.gitignore`) for security.

## �📦 Installation

```bash
npm install
```
