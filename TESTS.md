# 📋 Test Suite Documentation

Complete overview of automated tests organized by module and functionality. Tests are written in TypeScript with Playwright and mostly follow the AAA pattern.

## 📊 Test Categories

### 🔗 API Tests

API tests verify backend functionality through HTTP requests. Requests use shared config from `tests/config` (endpoints, headers, status codes) and authorization prepared in global setup.

#### 🔑 Authentication

| Test                            | File                            | Purpose                                                                                    |
| ------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------ |
| Verify generated token is valid | `tests/api/token/token.spec.ts` | Validates that the generated BEARER_TOKEN from global setup is active and accepts requests |

#### 👥 Users Management

**📥 GET operations**

| Test                                          | File                                | Purpose                                                     |
| --------------------------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| Return all users from database                | `tests/api/users/get-users.spec.ts` | Fetches complete user list and validates response structure |
| Return randomly selected user from users list | `tests/api/users/get-users.spec.ts` | Retrieves specific user by ID and verifies correct data     |

**➕ POST operations**

| Test                              | File                                | Purpose                                                                 |
| --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------- |
| Create valid and unique user      | `tests/api/users/post-user.spec.ts` | Creates new user with valid payload and verifies creation               |
| POST validations (negative cases) | `tests/api/users/post-user.spec.ts` | Validates required fields: firstname, lastname, email, avatar, password |

**🔄 PUT operations**

| Test                             | File                               | Purpose                                                  |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------- |
| Update all given user data       | `tests/api/users/put-user.spec.ts` | Performs full user record update and verifies all fields |
| PUT validations (negative cases) | `tests/api/users/put-user.spec.ts` | Validates required fields during full updates            |

**🛠️ PATCH operations**

| Test                              | File                                 | Purpose                                                           |
| --------------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| User first name should be updated | `tests/api/users/patch-user.spec.ts` | Updates specific field (firstname) and verifies change is applied |

**🗑️ DELETE operations**

| Test                                       | File                                  | Purpose                                                                        |
| ------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------ |
| Create new and unique user for delete test | `tests/api/users/delete-user.spec.ts` | Creates user, logs in with new credentials, deletes account, verifies deletion |

#### 📰 Articles Management

**📥 GET operations**

| Test                                                | File                                      | Purpose                                                           |
| --------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| Return list of articles                             | `tests/api/articles/get-articles.spec.ts` | Fetches article list and validates response shape                 |
| Return randomly selected article from articles list | `tests/api/articles/get-articles.spec.ts` | Retrieves a specific article by ID selected from the current list |

**➕ POST operations**

| Test                                      | File                                      | Purpose                                                               |
| ----------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------- |
| Create valid and unique article           | `tests/api/articles/post-article.spec.ts` | Creates article with valid payload and verifies creation with ID      |
| POST article validations (multiple cases) | `tests/api/articles/post-article.spec.ts` | Tests missing required fields: title, body, date - expects 422 status |
| Should create article without image       | `tests/api/articles/post-article.spec.ts` | Creates article without optional image field, expects 201 status      |

### 🎨 UI Tests

UI tests verify user-facing functionality through browser interactions. Tests run in the `chromium` project with tracing enabled on first retry.

#### 👤 Users - Authentication And Account Management

**🔓 Login functionality**

| Test                                                     | File                           | Purpose                                                               |
| -------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------- |
| User should be logged with correct credentials           | `tests/ui/users/login.spec.ts` | Logs in with valid email/password and verifies user greeting          |
| Login with invalid credentials (multiple cases)          | `tests/ui/users/login.spec.ts` | Tests various invalid email/password combinations and error messages  |
| User should be logged and logged out correctly           | `tests/ui/users/login.spec.ts` | Logs in, validates session, logs out, verifies redirect to login page |
| User should be logged and next account should be deleted | `tests/ui/users/login.spec.ts` | Completes login flow and deletes account via UI dialog                |

**📝 Registration functionality**

| Test                                                    | File                              | Purpose                                                                         |
| ------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| Should register a new user                              | `tests/ui/users/register.spec.ts` | Registers user with first name, last name, unique email, birthday, and password |
| Should register a new user with no birthday date        | `tests/ui/users/register.spec.ts` | Registers user while omitting optional birthday field                           |
| A new user should not be created due to not unique mail | `tests/ui/users/register.spec.ts` | Attempts registration with duplicate email and verifies error message           |
| Registration field validations (multiple cases)         | `tests/ui/users/register.spec.ts` | Tests various missing required fields: first name, last name, email, password   |

#### 📰 Content Management

**📄 Articles**

| Test                                        | File                                       | Purpose                                                                                                            |
| ------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Should display a list of articles           | `tests/ui/articles/list-articles.spec.ts`  | Navigates to articles section, opens an article, moves to the next page, and verifies another article is displayed |
| Should add article with valid data          | `tests/ui/articles/post-article.spec.ts`   | Creates an article after login by filling title, body, image, and verifying the success message                    |
| Should update article title with valid data | `tests/ui/articles/update-article.spec.ts` | Logs in as test user, navigates to an owned article, edits title, and verifies the success alert                   |
| Should delete article                       | `tests/ui/articles/delete-article.spec.ts` | Creates an article, opens it from the list, confirms the delete dialog, and verifies the article disappears        |

## 💾 Test Data

Test data files provide fixtures and reusable payloads:

| Data                                     | Location                                       |
| ---------------------------------------- | ---------------------------------------------- |
| User credentials and invalid login cases | `tests/ui/users/test-data/login.data.ts`       |
| User registration test data              | `tests/ui/users/test-data/register.data.ts`    |
| Article payload, test user credentials   | `tests/ui/articles/test-data/articles.data.ts` |
| API user payloads and test IDs           | `tests/api/users/test-data/user.data.ts`       |
| API article payloads and validations     | `tests/api/articles/test-data/article.data.ts` |

## ⚙️ Configuration Files

All configuration constants are stored in `tests/config/`:

| File               | Purpose                                                                  |
| ------------------ | ------------------------------------------------------------------------ |
| `api-constants.ts` | API endpoints and HTTP status codes used across all API tests            |
| `api-headers.ts`   | Authorization headers helper and BEARER_TOKEN logic from global setup    |
| `test-tags.ts`     | Test tags for filtering (e.g., @smoke, @api, @ui) used in all spec files |
| `ui-constants.ts`  | UI route URLs for navigation in browser tests                            |

## Running Tests

Full command reference:

```bash
# All tests
npm test
npx playwright test

# npm scripts
npm run test:headed
npm run test:debug
npm run test:ui
npm run test:login
npm run test:register
npm run test:api:get-users
npm run test:smoke
npm run report
npm run install:browsers

# Projects
npx playwright test --project=chromium
npx playwright test --project=api
npx playwright test tests/ui --project=chromium
npx playwright test tests/api --project=api

# Specific scope
npx playwright test tests/api/articles/
npx playwright test tests/api/users/
npx playwright test tests/ui/users/
npx playwright test tests/ui/articles/
npx playwright test tests/api/articles/get-articles.spec.ts --project=api
npx playwright test tests/api/users/get-users.spec.ts --project=api
npx playwright test tests/api/users/post-user.spec.ts
npx playwright test tests/ui/users/login.spec.ts --project=chromium
npx playwright test tests/ui/users/register.spec.ts --project=chromium
npx playwright test tests/ui/articles/delete-article.spec.ts --project=chromium

# Filter tests
npx playwright test --grep "should create"
npx playwright test --grep @smoke
npx playwright test --grep @api
npx playwright test --grep @ui
npx playwright test --grep "@users.*@login|@login.*@users"

# Execution modes
npx playwright test --headed              # visible browser
npx playwright test --debug               # step-by-step debugging
npx playwright test --workers=1           # sequential execution

# Reports
npx playwright show-report                # HTML report
npx playwright test --reporter=list       # list format
```

## Notes

- `global-setup.ts` refreshes the API token before tests.
- `global-teardown.ts` restores database state after the run.
- `playwright.config.ts` uses `workers: 1`, so tests run sequentially.

For setup and prerequisites, see [README.md](README.md).
