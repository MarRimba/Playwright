# 📋 Test Suite Documentation

Complete overview of automated tests organized by module and functionality. Tests are written in TypeScript with Playwright and follow AAA pattern (Arrange, Act, Assert).

## 📊 Test Categories

### 🔗 API Tests

API tests verify backend functionality through HTTP requests. All requests include proper headers and authorization where required.

#### 🔑 Authentication

| Test                            | File                            | Purpose                                                                                    |
| ------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------ |
| Verify generated token is valid | `tests/api/token/token.spec.ts` | Validates that the generated BEARER_TOKEN from global setup is active and accepts requests |

#### 👥 Users Management

**📥 GET Operations**

| Test                                          | File                                | Purpose                                                     |
| --------------------------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| Return all users from database                | `tests/api/users/get-users.spec.ts` | Fetches complete user list and validates response structure |
| Return randomly selected user from users list | `tests/api/users/get-users.spec.ts` | Retrieves specific user by ID and verifies correct data     |

**➕ POST Operations**

| Test                              | File                                | Purpose                                                                 |
| --------------------------------- | ----------------------------------- | ----------------------------------------------------------------------- |
| Create valid and unique user      | `tests/api/users/post-user.spec.ts` | Creates new user with valid payload and verifies creation               |
| POST validations (negative cases) | `tests/api/users/post-user.spec.ts` | Validates required fields: firstname, lastname, email, avatar, password |

**🔄 PUT Operations**

| Test                             | File                               | Purpose                                                  |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------- |
| Update all given user data       | `tests/api/users/put-user.spec.ts` | Performs full user record update and verifies all fields |
| PUT validations (negative cases) | `tests/api/users/put-user.spec.ts` | Validates required fields during full updates            |

**🛠️ PATCH Operations**

| Test                              | File                                 | Purpose                                                           |
| --------------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| User first name should be updated | `tests/api/users/patch-user.spec.ts` | Updates specific field (firstname) and verifies change is applied |

**🗑️ DELETE Operations**

| Test                                       | File                                  | Purpose                                                                        |
| ------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------ |
| Create new and unique user for delete test | `tests/api/users/delete-user.spec.ts` | Creates user, logs in with new credentials, deletes account, verifies deletion |

---

### 🎨 UI Tests

UI tests verify user-facing functionality through browser interactions. Tests execute in Chromium browser with tracing enabled.

#### 👤 Users - Authentication & Account Management

**🔓 Login Functionality**

| Test                                                     | File                           | Purpose                                                               |
| -------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------- |
| User should be logged with correct credentials           | `tests/ui/users/login.spec.ts` | Logs in with valid email/password and verifies user greeting          |
| Login with invalid credentials (multiple cases)          | `tests/ui/users/login.spec.ts` | Tests various invalid email/password combinations and error messages  |
| User should be logged and logged out correctly           | `tests/ui/users/login.spec.ts` | Logs in, validates session, logs out, verifies redirect to login page |
| User should be logged and next account should be deleted | `tests/ui/users/login.spec.ts` | Completes login flow and deletes account via UI dialog                |

**📝 Registration Functionality**

| Test                                                    | File                              | Purpose                                                                         |
| ------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| Should register a new user                              | `tests/ui/users/register.spec.ts` | Registers user with first name, last name, unique email, birthday, and password |
| Should register a new user with no birthday date        | `tests/ui/users/register.spec.ts` | Registers user while omitting optional birthday field                           |
| A new user should not be created due to not unique mail | `tests/ui/users/register.spec.ts` | Attempts registration with duplicate email and verifies error message           |
| Registration field validations (multiple cases)         | `tests/ui/users/register.spec.ts` | Tests various missing required fields: first name, last name, email, password   |

#### 📰 Content Management

**📄 Articles**

| Test                               | File                                      | Purpose                                                                                                             |
| ---------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Should display a list of articles  | `tests/ui/articles/list-articles.spec.ts` | Navigates to articles section, opens first article, goes to page 2, clicks second article, verifies it is displayed |
| Should add article with valid data | `tests/ui/articles/post-article.spec.ts`  | Creates article after login: fills title, body, selects image, saves, verifies success                              |

---

## 💾 Test Data

Test data files provide fixtures and reusable payloads:

| Data                                     | Location                                       |
| ---------------------------------------- | ---------------------------------------------- |
| User credentials and invalid login cases | `tests/ui/users/test-data/login.data.ts`       |
| User registration test data              | `tests/ui/users/test-data/register.data.ts`    |
| Article payload and test data            | `tests/ui/articles/test-data/articles.data.ts` |
| API user payloads and test IDs           | `tests/api/users/test-data/user.data.ts`       |

---

## Running Tests

Comprehensive command reference:

```bash
# All tests
npx playwright test

# Projects
npx playwright test --project=api
npx playwright test --project=chromium

# Specific scope
npx playwright test tests/api/users/
npx playwright test tests/ui/articles/
npx playwright test tests/api/users/post-user.spec.ts

# Filter tests
npx playwright test --grep "should create"
npx playwright test --grep @smoke

# Execution modes
npx playwright test --headed              # visible browser
npx playwright test --debug               # step-by-step debugging
npx playwright test --workers=1           # sequential execution

# Reports
npx playwright show-report                # HTML report
npx playwright test --reporter=list       # list format
```

For setup and prerequisites, see [README.md](README.md).
