# redvike-tech-task

The application is a simple form that takes user information, including first name, last name, email, password, and an optional avatar image. The form also includes a slider captcha that the user needs to slide to unlock the form submission.

## Technology Choice:

The automation framework is built using TypeScript and Playwright to provide a modern, reliable, and scalable testing solution.

**TypeScript** was selected as the primary programming language due to its strong typing, improved code maintainability, and enhanced developer experience. Static type checking helps reduce runtime errors and improves code quality, especially in continuously evolving automation projects.

**Playwright** was chosen as the automation framework because of its stability, speed, and comprehensive support for modern web applications.
The combination of TypeScript and Playwright provides a robust foundation for building maintainable end-to-end test automation with strong scalability and long-term support.

## Solution overview:

A Page Object Model (POM) approach with a dedicated folder structure was selected to ensure scalability, maintainability, and clear separation of responsibilities within the test automation framework.

The framework is organized into logical modules, allowing easy navigation and simplified test maintenance. Core components such as page objects, test data, utilities, configuration files, and test cases are separated into dedicated directories to improve reusability and reduce code duplication.

## Instructions

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

## Test summary

Based on the defined requirements and feature importance, the MVP-stage coverage includes **18 tests**.

7 positive scenarios:

- Successful form submission | Required fields
- Successful form submission | Optional fields
- Successful form submission | Avatar is [bmp, gif, jpg, jpeg, png]

11 negative scenarios:

- Passwords | Mismatch (Required fields)
- Passwords | Mismatch (Optional fields)
- Passwords | Minimum length
- Passwords | Forbidden characters
- Email | Invalid Email format | @ missing
- Email | Invalid Email format | Incomplete email
- First Name | Value is missing
- Last Name | Value is missing
- Captcha | Not solved
- Avatar | Unsupported file type (.js)
- Avatar | File size exceeds the limit of 2 mb

### Results

Test results are:

- 1 / 7 positive cases pass and users cannot register using avatars at all which needs immediate addressing
- 7 / 11 negative tests pass, which sound like very basic level of validations, it posses a huge security risks as inputs are not protected from forbidden characters, potentially dangerous and huge files

### Issues

Main issues can be found in Issues tab in GitHub

### Suggestion

Main suggestions can be found in Issues tab in GitHub and Results section above
