# Bidshop SDET Technical Assessment

This repository contains API and UI automated tests for the Bidshop application.

## Frameworks

### API Testing — Playwright + TypeScript

I chose Playwright with TypeScript for API testing because the Bidshop backend is also written in TypeScript and runs on Node.js. Using the same technology stack makes the tests easier for developers to understand and contribute to, while keeping the tooling consistent with the application.

The API framework uses a layered design:

- **API layer** encapsulates HTTP endpoints and request/response contracts.
- **Scenes** represent reusable business actions and verification steps. A Scene can use one or multiple API domains.
- **Cases** compose Scenes into business test flows and bind their own test data.
- **Suites** group Cases for execution.
- **Context** manages static test data and runtime data within each test.

Playwright fixtures are used for dependency injection and lifecycle management, and Playwright's runner provides reporting and parallel execution support.

### UI Testing — Playwright + Python


## Install and Run

The Bidshop backend and frontend should be running before executing the tests.

### API Tests

```bash
cd api-tests
npm install
npx playwright test
```

To run with multiple workers:

```bash
npx playwright test --workers=2
```

To open the HTML report:

```bash
npx playwright show-report
```

### UI Tests



## Trade-offs and Future Improvements

The solution intentionally focuses on a small number of representative tests and framework structure rather than maximising test coverage.

The Bidshop backend stores data in shared in-memory state. Parallel tests that modify the same product can therefore interfere with each other's stock validation. The framework supports parallel execution, but in a larger test environment I would isolate test data per worker or provide controlled test-data setup and cleanup.

For this assessment, API response contracts are represented with TypeScript interfaces rather than runtime schema validation. With more time, I would add schema validation for key API responses, expand negative and boundary coverage, and integrate the suites into CI.

A known issue was identified during testing: the API documentation describes GST as 15%, while the current backend implementation calculates cart GST at 12.5%. I kept the expected business rule at 15% rather than changing the test configuration to match the implementation.