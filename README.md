# Demoblaze E2E Testing with Cypress + Cucumber

## Introduction

This project is focused on testing [Demoblaze](https://demoblaze.com) using Cypress and Cucumber.

## Covered Functionality

- Sign Up process including Log in / Log out verification
- Adding a product to the cart and deleting it
- Completing a purchase

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository.
2. From the root folder, download the dependencies:
   ```
   npm install
   ```

### Running the Tests

- To open the Cypress dashboard:
  ```
  npx cypress open
  ```
- For headless tests:
  ```
  npx cypress run
  ```

## Test Structure

- Product features each have their own folder in `cypress/e2e`. Inside, you'll find a feature file with test steps in Gherkin and the matching JavaScript code.
- Steps that might be common within test suites (e.g., login) are in `cypress/e2e/common`.
- Custom commands are used to simplify step definitions, making them easier to read & write.
- Fixtures contain test user data, including sensitive data like passwords. **Note**: This is a bad practice; use environment variables or solutions like Google Secrets for real tests.

## Testing Considerations (make better tests)

### Backend (BE)

- Use `cy.intercept()` to monitor network calls and ensure they complete successfully.

### Frontend (FE)

- Use explicit identifiers for more reliable element targeting. Example:
  ```javascript
  const cartButtonDashboard = '[id="cartur"]';
  ```

### External Services

E2E tests require Backend, Frontend, and external services to operate closely to a production state, making them usually expensive and slow. Test cleanup is also essential.

## When to Use E2E Tests

E2E tests are useful for verifying critical user flows before deploying to production. However, due to their inherent weaknesses (slow, expensive, brittle), they should not replace unit and integration tests. Contract testing is also advisable when working with microservices.

## Component Testing

Component testing with Cypress is another option to reduce reliance on E2E tests, as you can mock the Backend's response using `cy.intercept()`.
