# 📚 Book Library – QA Automation Framework

## 🚀 Overview

This project is a **comprehensive QA Automation Framework** built for a Book Library application. It combines:

* ✅ **End-to-End Testing** using Playwright
* ✅ **API + UI Validation**
* ✅ **Schema Validation (AJV)**
* ✅ **Custom Fixtures (Page Object Model)**
* ✅ **Responsive Testing (Real Devices)**
* ✅ **Visual Regression Testing**
* ✅ **Unit Testing (Vitest)**

The framework is designed to be **scalable, maintainable, and production-ready**.

---

## 🧰 Tech Stack

* **Playwright** – E2E Testing
* **TypeScript** – Strong typing
* **Vitest** – Unit testing
* **AJV** – JSON schema validation
* **Page Object Model (POM)** – Clean test structure

---

## 📁 Project Structure

```
├── page-objects/        # Page Object Models
├── tests/               # Playwright test specs
├── fixtures/            # Custom fixtures
├── test-data/           # Test data & builders
├── schema/              # API schemas
├── utils/               # Logger & helpers
├── errorMessages.ts     # Centralized validation messages
├── playwright.config.ts
├── vitest.config.ts
└── README.md
```

---

## ⚡ Getting Started

### 1️⃣ Install dependencies

```bash
npm install
```

---

### 2️⃣ Run Playwright tests

```bash
npx playwright test
```

---

### 3️⃣ Run specific test file

```bash
npx playwright test tests/addBook.spec.ts
```

---

### 4️⃣ Run tests in headed mode

```bash
npx playwright test --headed
```

---

### 5️⃣ Run unit tests (Vitest)

```bash
npm run test:unit
```

---

## 🧪 Test Coverage

### ✅ Functional Testing

* Home Page validations
* Add Book flow (positive & negative)
* Book Details verification

---

### 🔗 API + UI Testing

* Create book via API
* Validate response using schema
* Verify same data on UI

---

### 📱 Responsive Testing

* Mobile (iPhone, Pixel)
* Tablet (iPad)
* Desktop

---

### 🎨 Visual Regression Testing

* Homepage snapshot
* Add Book page snapshot
* Book Details snapshot

Detects unintended UI changes using:

```ts
await expect(page).toHaveScreenshot();
```

---

### ❌ Validation Testing

* Required fields
* Invalid inputs (rating, pages, year)
* Cross-browser validation handling

---

### 🧠 Unit Testing (Vitest)

* Data builders (`bookBuilder`)
* Validation helpers
* Logger utility
* Schema validation

---

## 🧩 Key Concepts Used

### 🔹 Page Object Model (POM)

Encapsulates UI interactions for better maintainability.

---

### 🔹 Custom Fixtures

Reusable test setup:

```ts
test('example', async ({ homePage, addBookPage }) => {
  await homePage.goToAddBook();
});
```

---

### 🔹 Cross-Browser Validation Handling

Different browsers return different validation messages:

* Chrome → *"Value must be greater than..."*
* Safari → *"range underflow"*

Handled using flexible matching:

```ts
expect(message.toLowerCase()).toMatch(/greater|underflow/);
```

---

### 🔹 Smart Waiting Strategy

Avoids flaky tests by waiting for UI state:

```ts
await expect(page).toHaveURL(/\/book\/\d+/);
await expect(locator).toBeVisible();
```

---

## 🧪 Visual Regression Workflow

1. First run → creates baseline screenshots
2. Future runs → compare against baseline
3. Differences → test fails with diff

---

## 📊 Best Practices Followed

* ✅ No hard waits (`waitForTimeout`)
* ✅ State-based assertions
* ✅ Reusable test data builders
* ✅ Centralized error messages
* ✅ Cross-browser compatibility
* ✅ Clean, readable test structure

---

## ⚠️ Common Challenges Handled

| Challenge                | Solution                |
| ------------------------ | ----------------------- |
| Slow navigation          | Wait for URL + UI       |
| Cross-browser validation | Flexible matching       |
| Dynamic data             | Data builders           |
| Flaky tests              | Smart waits             |
| Duplicate locators       | Strict locator strategy |

---

## 🚀 Future Enhancements

* 🔹 CI/CD Integration (GitHub Actions)
* 🔹 Accessibility Testing (axe-core)
* 🔹 Performance Testing
* 🔹 Test Reporting Dashboard

---

## 👩‍💻 Author

**Kavya M**

---

## ⭐ Final Note

This framework is designed not just to test functionality, but to ensure:

> ✅ Reliability
> ✅ Maintainability
> ✅ Real-world test coverage


