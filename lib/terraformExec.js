const cp = require("child_process");
const { promisify } = require("util");

// Promisify the cp.exec function
const execAsync = promisify(cp.exec);

// Function to run Terraform init
async function terraformInit(cwd) {
  try {
    const { stdout, stderr } = await execAsync("terraform init", { cwd });
    if (stderr) {
      // Terraform init often writes to stderr even on success, so we just log it
      console.log(`Terraform init output:\n${stderr}`);
    }
    console.log(`Terraform init completed successfully:\n${stdout}`);
    return { init: stdout };
  } catch (error) {
    console.error(`Error during Terraform init:\n${error.message}`);
    throw error;
  }
}

// Function to run Terraform plan
async function terraformPlan(cwd) {
  try {
    const { stdout, stderr } = await execAsync(
      "terraform plan -out=main.tfplan",
      { cwd }
    );
    // Terraform plan can write to stderr for warnings
    if (stderr) {
      console.log(`Terraform plan warnings/output:\n${stderr}`);
    }
    console.log(`Terraform plan completed successfully:\n${stdout}`);
    return { plan: stdout };
  } catch (error) {
    console.error(`Error during Terraform plan:\n${error.message}`);
    throw error;
  }
}

// Function to run Terraform apply
async function terraformApply(cwd) {
  try {
    const { stdout, stderr } = await execAsync(
      "terraform apply main.tfplan",
      { cwd }
    );
    if (stderr) {
      console.log(`Terraform apply output:\n${stderr}`);
    }
    console.log(`Terraform apply completed successfully:\n${stdout}`);
    return { apply: stdout };
  } catch (error) {
    console.error(`Error during Terraform apply:\n${error.message}`);
    throw error;
  }
}

// Function to run Terraform destroy
async function terraformDestroy(cwd) {
  try {
    const { stdout, stderr } = await execAsync(
      "terraform destroy -auto-approve",
      { cwd }
    );
    if (stderr) {
      console.log(`Terraform destroy output:\n${stderr}`);
    }
    console.log(`Terraform destroy completed successfully:\n${stdout}`);
    return { destroy: stdout };
  } catch (error) {
    console.error(`Error during Terraform destroy:\n${error.message}`);
    throw error;
  }
}

// Run all Terraform commands in sequence and return results
async function terraformExec(cwd, runInit = false) {
  try {
    let initResult = {};
    if (runInit) {
      initResult = await terraformInit(cwd);
    }

    const planResult = await terraformPlan(cwd);
    const applyResult = await terraformApply(cwd);

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

module.exports = { terraformExec, terraformDestroy };

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
