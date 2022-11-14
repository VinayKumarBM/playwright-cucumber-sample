[![Test Execution](https://github.com/VinayKumarBM/playwright-cucumber-sample/actions/workflows/main.yml/badge.svg)](https://github.com/VinayKumarBM/playwright-cucumber-sample/actions/workflows/main.yml)
<br>
# playwright-cucumber-sample

## **Overview:**

This is a sample test automation framework developed using **Playwright** with **Cucumber**.

**Playwright** is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.

**Cucumber** is a tool for running automated tests written in plain language. Because they're written in plain language, they can be read by anyone on your team. Because they can be read by anyone, you can use them to help improve communication, collaboration and trust on your team. Cucumber supports behavior-driven development. Central to the Cucumber BDD approach is its ordinary language parser called Gherkin. 

For Demo purpose web UI test cases are created on [ecommerce-playground.lambdatest.io](https://ecommerce-playground.lambdatest.io/index.php) site and API test cases are created on these [SOAP Calculator API](http://www.dneonline.com/calculator.asmx) & [REST Library Information System API](https://www.libraryinformationsystem.org/Services/RestService.svc) endpoints.

## Features

- This testing framework supports Behavior Driven Development (BDD). Tests are written in plain English text called Gherkin
- Framework has built in library to operate on UI, API (both SOAP & REST API) and DB (MSSQL, DB2 & Oracle).
- Supports execution of tests in different browsers.
- Supports running scenarios in parallel mode. It runs 2 scenarios in parallel by default.
- Flaky scenario can be Retried multiple times until either it passes or the maximum number of attempts is reached. You can enable this via the retry configuration option.
- Supports rerun of the failed scenarios.
- Scenarios can be easily skipped by adding @ignore tag to scenarios
- Supports dry run of scenarios this helps to identifies the undefined and ambiguous steps.
- Has utility built in for file download, Read PDF files etc.
- Generates Cucumber HTML Report & HTML Report.
- HTML reports are included with snapshots and video in case of failed scenarios.
- Test execution logs are captured in the log file.
- All the configuration are controlled by .env file and environment variables can be modified at runtime.
- Easy and simple integration to CI/CD tools like Jenkins.

## Supported Browsers

1. Chrome - default browser
2. Firefox
3. MS Edge
4. WebKit - web browser engine used by Safari


#### Steps to use
##### 1. Installation

Playwright framework requires [Node.js](https://nodejs.org/) v14+ to run.

Code from github need to be [download](https://github.com/VinayKumarBM/playwright-cucumber-sample/archive/refs/heads/master.zip) OR [cloned](https://github.com/VinayKumarBM/playwright-cucumber-sample.git) using git command.

Installing the dependencies.
```sh
npm ci
```
##### 2. Test creation
- Test scenarios are organized into features and these feature files should be placed inside features folder.
- Step definitions connect Gherkin steps in feature files to programming code. A step definition carries out the action that should be performed by the scenario steps. These step definitions should placed inside steps folder in different packages.
- For web UI based tests maintain all the selectors inside pages folder.

##### 3. Execution
To run test scenarios use below command.
```sh
npm run test
```
To run specific scenario, use tags command. Below are few examples.
```sh
npm run test:tags @sanity
npm run test:tags "@calculator or @author"
npm run test:tags "@rest and @author"
```
To dry run test scenarios use below command.
```sh
npm run dry:test
```
To rerun the failed test scenarios use below command.
```sh
npm run failed:test
```
To change any environment configuration in .env file at run time use set command.
Eg: To change browser to Firefox use below command
```sh
set BROWSER=firefox
```
Similar command can be used to update other environment configuration

To generate HTML and Cucumber report use below command
```sh
npm run report
```
##### 4. Report & Logs
Cucumber HTML report will be present inside
```sh
test-results/reports/cucumber.html
```
HTML report will be present inside
```sh
test-results/reports/html/index.html
```
Execution log will be present in the log file.
```sh
test-results/logs/execution.log
```
##  ##
**:pencil: If you find my work interesting don't forget to give a Star :star: & Follow me :busts_in_silhouette:**
