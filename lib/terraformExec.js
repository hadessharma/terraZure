const cp = require("child_process");
const { promisify } = require("util");

// Promisify the cp.exec function
const execAsync = promisify(cp.exec);

// Function to run Terraform init
async function terraformInit() {
  try {
    const { stdout, stderr } = await execAsync(
      "cd ./terraform && terraform init"
    );
    if (stderr) {
      throw new Error(`Terraform init produced an error:\n${stderr}`);
    }
    console.log(`Terraform init completed successfully:\n${stdout}`);
    return { init: stdout };
  } catch (error) {
    console.error(`Error during Terraform init:\n${error.message}`);
    throw error;
  }
}

// Function to run Terraform plan
async function terraformPlan() {
  try {
    const { stdout, stderr } = await execAsync(
      "cd ./terraform && terraform plan -out=main.tfplan"
    );
    if (stderr) {
      throw new Error(`Terraform plan produced an error:\n${stderr}`);
    }
    console.log(`Terraform plan completed successfully:\n${stdout}`);
    return { plan: stdout };
  } catch (error) {
    console.error(`Error during Terraform plan:\n${error.message}`);
    throw error;
  }
}

// Function to run Terraform apply
async function terraformApply() {
  try {
    const { stdout, stderr } = await execAsync(
      "cd ./terraform && terraform apply main.tfplan"
    );
    if (stderr) {
      throw new Error(`Terraform apply produced an error:\n${stderr}`);
    }
    console.log(`Terraform apply completed successfully:\n${stdout}`);
    return { apply: stdout };
  } catch (error) {
    console.error(`Error during Terraform apply:\n${error.message}`);
    throw error;
  }
}

// Run all Terraform commands in sequence and return results
async function terraformExec() {
  try {
    const initResult = await terraformInit();
    const planResult = await terraformPlan();
    const applyResult = await terraformApply();

    console.log("All Terraform commands completed successfully.");

    return {
      init: initResult.init,
      plan: planResult.plan,
      apply: applyResult.apply,
    };
  } catch (error) {
    console.error("Error during Terraform execution:", error.message);
    throw error;
  }
}

module.exports = { terraformExec };

// const cp = require("child_process");

// // Run terraform init, plan and apply
// function terraformExec() {
//   return new Promise((resolve, reject) => {
//     cp.exec(
//       "cd ./terraform && terraform init && terraform plan -out=main.tfplan", // && terraform apply main.tfplan
//       (error, stdout, stderr) => {
//         if (error) {
//           console.log(`Error occured:\n${error.message}`);
//           reject(error.message);
//         } else if (stderr) {
//           console.log(`Terraform command produced an error:\n${stderr}`);
//           reject(stderr);
//         } else {
//           console.log(`Terraform command completed successfully:\n${stdout}`);
//           resolve(stdout);
//         }
//       }
//     );
//   });
// }

// module.exports = { terraformExec };
