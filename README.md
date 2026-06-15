# JET-tech-task

A realistic e-commerce system built specifically for QA automation assessment.
It has real functionality, real bugs, and real edge cases.

## Technology Choice:

The automation framework is built using TypeScript and Playwright to provide a modern, reliable, and scalable testing solution.

**TypeScript** was selected as the primary programming language due to its strong typing, improved code maintainability, and enhanced developer experience. Static type checking helps reduce runtime errors and improves code quality, especially in continuously evolving automation projects.

**Playwright** was chosen as the automation framework because of its stability, speed, and comprehensive support for modern web applications.
The combination of TypeScript and Playwright provides a robust foundation for building maintainable end-to-end test automation with strong scalability and long-term support.

## Solution overview:

A dedicated folders structure was selected to ensure scalability, maintainability, and clear separation of responsibilities within the test automation framework.

The framework is organized into logical modules, allowing easy navigation and simplified test maintenance. Core components such as dto, controllers, tests and tests data, utils, configuration files, and test cases are separated into dedicated directories to improve reusability and reduce code duplication.

## Instructions:

IDE

- to setup environment, run `npm install` followed by `npx playwright install`
- to run tests, use `npm run pw-test`
- to see the test report, use `npm run pw-report`

GitHub

- to run tests from GitHub, go to Actions -> Run the workflow
- to see the test report, visit
  <a href="https://yellowkoodoo.github.io/redvike-tech-task/" target="_blank" rel="noopener noreferrer">
  GitHub Test Results
  </a>
  (`https://yellowkoodoo.github.io/redvike-tech-task/`)

## Test summary:

Based on time constraints I've build a framework and covered **3 tests**.

1 positive scenarios:

- happy path

2 negative scenarios:

- empty items
- invalid productId
