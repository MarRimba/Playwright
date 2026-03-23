# Projekt testów automatycznych Playwright

[English version](README.en.md)

## 🎯 Cel projektu

- Repozytorium zawiera testy end-to-end napisane w TypeScript z wykorzystaniem Playwright.
- Projekt służy do weryfikacji procesów logowania i rejestracji użytkownika.
- Testy uruchamiane są w aplikacji dostępnej pod adresem `http://localhost:3000`.

## 🛠️ Stos technologiczny

- Playwright Test
- TypeScript
- Node.js
- `@faker-js/faker` do generowania danych testowych

## 📁 Struktura projektu

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

- `package.json` - definicja zależności projektu
- `playwright.config.ts` - konfiguracja Playwright
- `tsconfig.json` - konfiguracja TypeScript
- `tests/users/login.spec.ts` - testy logowania
- `tests/users/register.spec.ts` - testy rejestracji
- `tests/users/test-data/login.data.ts` - dane do testów logowania
- `tests/users/test-data/register.data.ts` - dane do testów rejestracji

## ✅ Wymagania wstępne

- Node.js w wersji LTS
- npm
- zainstalowane przeglądarki Playwright
- uruchomiona aplikacja testowana na `http://localhost:3000`

## 🌐 Aplikacja testowana

- Repozytorium aplikacji: `https://github.com/jaktestowac/gad-gui-api-demo`
- Komenda uruchomieniowa aplikacji:

```bash
npm run start
```

- Przed uruchomieniem testów upewnij się, że aplikacja działa lokalnie na porcie `3000`.

## 📦 Instalacja

- Zainstaluj zależności projektu testowego:

```bash
npm install
```
