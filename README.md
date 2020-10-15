[![Build Status](https://dev.azure.com/alemag1986/ensuring-quality-releases/_apis/build/status/ensuring-quality-releases?branchName=master)](https://dev.azure.com/alemag1986/ensuring-quality-releases/_build/latest?definitionId=5&branchName=master)

# Overview

Udacity final project Ensuring Quality Releases.

# Instructions

## Dependencies/Pre-Requisites

## Steps to Run

0. Clone the repository and go inside the new folder
1. Run the command: `make setupenv` to set up the venv and update pip
2. Run the command: `make all` to install python dependencies, lint and test the code.  
3. Finally run the command: `make run` to run the application in localhost. 
4. Optionally, you could run a prediction by executing `make prediction`.

## Steps to Initial Deploy

0. Connect to Azure and open the Azure Cloud Shell
1. Upload/Clone the code into the Azure Cloud Shell
    - In case of forking in GitHub:
      - Generate ssh-keys (`ssh-keygen -t rsa`)
      - Upload publick key to GitHub
2. Make sure project run in Azure Cloud Shell
    - run `make setupenv`
    - run `make all`
    - run `make run`       
3. Once the application is tested locally proceed to deploy on azure, using the following commands:
    
    - `chmod +x command.sh`
    - `./command.sh`

    or you could potentially use the az cli:
    ```
    az webapp up -n <<replace-with-web-app-name>> -g <<replace-with-resource-group-name>> --plan <<replace-with-plan-name>> -l eastus2 --sku F1`
    ```
    Replace `replace-with-web-app-name` with the application name, `replace-with-resource-group-name` with the resource group name, `<<replace-with-plan-name>>` with plan name, and potentialy change the location (`-l`) and/or the server capacity (`--sku`).

    Possible values for locations (`az account list-locations -o table`).
    Possible values of [skus](https://azure.microsoft.com/en-us/pricing/details/app-service/linux/)
    
## Steps to kick the CI-CD

0. Clone the repository
1. Make you change 
2. Commit changes and push the changes to `main` branch in GitHub
3. CI-CD triggered
    - GitHub actions execute on changes in `main` branch: installing, testing and linting

        Action [details](https://github.com/alemag1986/udacity-cicd-pipelines/blob/main/.github/workflows/main.yml): `udacity-cicd-pipelines/.github/workflows/main.yml`

    -  AzureDevOps pipeline execute on changes in `main` branch: installing, linting and finally deploying the app to Azure.

        Pipeline [details](https://github.com/alemag1986/udacity-cicd-pipelines/blob/main/.devops/pipelines/azure-pipelines.yml): `udacity-cicd-pipelines/.devops/pipelines/azure-pipelines.yml`
        
        Azure DevOps [Link](https://dev.azure.com/alemag1986/udacity-cicd-pipelines/_build)


## Steps to run load tests (using locust)

0. Clone the repository 
1. Start venv `!important`: Python 3.6 minimun version supported for locust 
2. Run the following command: `pip install locust==1.2.3`
3. Run `locust` and browse to the url displayed in the console (like: 0.0.0.0:8089)
4. Complete the form with the numbers of users, the spwan rate and the url of the site. 

---

* **Terraform**

* **Azure Pipeline**

* **Integration Tests - Postman**

* **Functional UI Tests - Selenium**  

* **Performance Tests - JMeter**

* **Azure Monitoring** 


## Enhancements

- GitFlow or branching strategy; Having multiple branches to support the development process and to have different states of the project, like features in develop, a version in QA, and a clean brach for releases to production.

-  A long with the branching strategy, right now the proyect is running the CI and CD at the same time, if CI fails the CD will go on. It will be an imporvement to kick the CD once the CI passes the tests. A possible solution, the use of branches. 

- CI-CD and docker: Docker scripts are available, but they are not linted nor used anywhere in the project. :(

- Makefile; right now, it is very complete, but you still need 3 commands to run configure the environment, lint and test, and run. 

- MORE TESTS! and better coverage. 

- Naming convention guide missing and some service name using defaults (like Azure Service Plan).

- Include the load tests in Makefile.

- Upgrade to Python version. Some libraries, like locust, do not support Python 3.5.

## Demo