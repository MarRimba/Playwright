# Playwright Automated Testing Project

[Polska wersja](README.md)

## 🎯 Project Purpose

- This repository contains end-to-end tests written in TypeScript using Playwright.
- The project is designed to verify the user login and registration flows.
- The tests run against an application available at `http://localhost:3000`.

## 🛠️ Technology Stack

- Playwright Test
- TypeScript
- Node.js
- `@faker-js/faker` for generating test data

## 📁 Project Structure

```text
.
|-- .gitignore
|-- package-lock.json
|-- package.json
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

- `package.json` - project dependencies and npm scripts
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration
- `tests/users/login.spec.ts` - login tests
- `tests/users/register.spec.ts` - registration tests
- `tests/users/test-data/login.data.ts` - login test data
- `tests/users/test-data/register.data.ts` - registration test data

## ✅ Prerequisites

- Node.js LTS version
- npm
- installed Playwright browsers
- the tested application running at `http://localhost:3000`

## 🌐 Tested Application

- Application repository: `https://github.com/jaktestowac/gad-gui-api-demo`
- Application startup command:

```bash
npm run start
```

- Before running the tests, make sure the application is available locally on port `3000`.

## 📦 Installation

- Install the test project dependencies:

```bash
npm install
```
