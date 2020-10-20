- Terraform in Azure ==> DONE
  - Configure the storage account and state backend => DONE
  - Create a Service Principal for Terraform => DONE

- Azure DevOps
  - azure-pipelines.yaml
  - StarterAPIs.json

- Selenium ==> DONE
  - latest Chrome driver

  ```bash
  pip install -U selenium
  sudo apt-get install -y chromium-browser
  ```
  - In the Project Starter Resources folder, in the Selenium folder, execute the login.py file to open the demo site.

- JMeter ==> DONE
  - Use JMeter to open the Starter.jmx
  - Replace the APPSERVICEURL
- Postman
  - starterAPIs.json

- Dev Environment ==> TODO

Dev Environment
Open the files in the Project Starter Resources folder using the IDE of your choice.
Complete the "Getting Started,” and each of the "Installation" sections.
Create an SSH key pair for the linux machine. Use the reference to the file for the Dev Environment. Use the actual public key itself when using Terraform in the CI/CD pipeline.
Run the terraform commands to create the resources in Azure.
.\path\to\terraform\terraform.exe init
.\path\to\terraform\terraform.exe apply
At this point, you are able to:

Write automated tests in Postman, JMeter and Selenium.
Check-in changes to the Git repo in Azure DevOps.
Run the CI/CD pipeline to deploy changes to an AppService. If this does not load, you may need to check the AppService Configuration in Azure and ensure WEBSITE_RUN_FROM_PACKAGE is set to 0.
Note that the deployment to the VM will fail since it is not configured as a deployment target yet.
Configure the Linux VM for deployment:

SSH into the VM using the Public IP
Alternatively, you can use the 'Reset Password' function in Azure for the VM resource and then try SSH using those credentials.
Follow the instructions to create an environment in Azure DevOps
If the registration script shows "sudo: ./svc.sh: command not found":
sudo bin/installdependencies.sh
cd ..
sudo rm -rf azagent
Run the registration script again.
Add your user to the sudoers file.
Update azure-pipelines.yaml with the Environment, and run the pipeline. You can now deploy to the Linux VM.
Configure Logging for the VM in the Azure Portal.



backendAzureRmResourceGroupName: 'RG-SUPPORT'
        backendAzureRmStorageAccountName: 'sageneralsupport'
        backendAzureRmContainerName: 'terraform-state'
        backendAzureRmKey: 'ensuring-quality-releases.tfstate'