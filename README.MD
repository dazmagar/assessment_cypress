# Cypress Test Automation Framework

## Description

This project is a test automation framework using [Cypress](https://www.cypress.io/) and JavaScript.
It includes `cypress-mochawesome-reporter` for detailed reporting, and integrates ESLint and Prettier for code quality and consistency.

## Requirements

-   [Node.js](https://nodejs.org/) (version 14.x or higher)
-   [Yarn](https://yarnpkg.com/) as the package manager

## Project Structure

```
|-- .vscode/                # VSCode workspace settings
|-- cypress/                # Cypress-related files
|   |-- fixtures/           # Static test data
|   |-- plugins/            # Cypress plugin configuration
|   |-- screenshots/        # Screenshots captured on failure
|   |-- support/            # Cypress custom commands and helpers
|   |-- test-results/       # Test result reports
|-- pages/                  # Page Object Model (POM) classes
|-- tests/                  # Test specifications (test scenarios)
|-- cypress.config.js       # Cypress configuration file
|-- package.json            # Node.js project file with dependencies and scripts
|-- yarn.lock               # Yarn lock file
```

## Setup Instructions

1. Clone the repository:

git clone `https://github.com/dazmagar/inst_cypress.git`

2. Navigate to the project directory:

`cd inst_cypress`

3. Install the required dependencies using Yarn:

`yarn install`

## Running Tests

### Opening the Cypress Test Runner

To run tests interactively using the Cypress GUI:

`yarn cypo`

### Running Tests in Headless Mode

To run tests in headless mode and generate reports:

`yarn cypr`

## Reports

Test reports are automatically generated in the `cypress/test-results` folder using the `cypress-mochawesome-reporter`.
You can find both HTML and JSON reports after running tests.

## ESLint and Prettier

To check the code for linting errors and formatting issues, run:

`yarn eslint .`

To automatically fix linting issues where possible, run:

`yarn eslint . --fix`

## Custom Commands and Utilities

-   **Custom Commands:** Additional Cypress commands are defined in `cypress/support/commands.js`.
-   **Gaussian Timeout:** Randomized delays for tests are implemented in `cypress/support/helpers.js` using a Gaussian distribution.

## Environment Variables

Some custom environment variables are defined in the `cypress.config.js` file:

-   `pacingTimeConst`: Default constant pacing time (500ms).
-   `pacingTimeDev`: Default deviation for pacing time (250ms).

You can override these variables when running tests by passing `--env` flags.

## License

This project is licensed under the ISC License.
