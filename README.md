[![Build Status](https://dev.azure.com/alemag1986/ensuring-quality-releases/_apis/build/status/ensuring-quality-releases?branchName=master)](https://dev.azure.com/alemag1986/ensuring-quality-releases/_build/latest?definitionId=5&branchName=master)

[[_TOC_]]

# Overview

Udacity final project Ensuring Quality Releases.

![pipeline](pipeline-diagram.png)

# Project Structure 

- **.devops/pipelines**: azure pipelines yaml
- **automatedtesting**: suites of different tests
  - **jmeter**: load test (JMeterPlan.jmx), CSV inputs, and TestReports (endurance-report, stress-report)
  - **postman**: functional tests postman collections and environments
  - **selenium**: ui tests (uitests.py)
- **fakerestapi**: api files to deplopy webapp
- **screenshoots**: all screen shots requests
- **terraform**: terraform scripts

---

# Screenshoots Log

## Environment Creation & Deployment

- Terraform to apply Infrastructure as Code (IaC)
  - screenshot of the log output of Terraform when executed by the CI/CD pipeline
   ![capture-1-terraform-output](screenshots/capture-1-terraform-output.png)
   ![capture-1-terraform-state](screenshots/capture-1-terraform-state.png)

- Automated testing tasks
  - screenshot of the successful execution of the pipeline build results page (/_build/results?buildId={id}&view=results)
    ![capture-2-pipeline](screenshots/capture-2-pipeline.png)

## Automated Testing

- Load test suite 
  - screenshot of the log output of JMeter when executed by the CI/CD pipeline
    ![capture-3-load-test](screenshots/capture-3-load-test-part1.png)
    ![capture-3-load-test](screenshots/capture-3-load-test-part2.png)
  
- Functional test suites 
  - screenshot of the execution of the test suite by the CI/CD pipeline
   ![capture-4-functional-test](screenshots/capture-4-functional-test.png)

- API-integration tests
  - screenshot of the Run Summary page (which contains 4 graphs)
    ![capture-5-summary-page-part1](screenshots/capture-5-summary-page-part1.png)
  - screenshot of the Test Results page (which contains the test case titles from each test) 
    ![capture-5-test-result-page-part2](screenshots/capture-5-test-result-page-part2.png)
  - screenshot of the output of the Publish Test Results step
    ![capture-5-publish-tests-output-part3](screenshots/capture-5-publish-tests-output-part3.png)

## Monitoring & Observability

- Configure Azure Monitor
  - screenshots of the email received when the alert is triggered
    ![capture-6-emails-part1](screenshots/capture-6-emails-part1.png)
  - screenshots of the graphs of the resource that the alert was triggered
    ![capture-6-webapp-part2](screenshots/capture-6-webapp-part2.png)
  - screenshots of the alert rule
    ![capture-6-alerts-part3a](screenshots/capture-6-alerts-part3c.png)
    ![capture-6-alerts-part3b](screenshots/capture-6-alerts-part3c.png)
    ![capture-6-alerts-part3c](screenshots/capture-6-alerts-part3c.png)

- Azure Log Analytics
  - screenshots of log analytics queries and result sets which will show specific output of the Azure resource
    ![capture-7-log-analytics](screenshots/capture-7-log-analytics.png)