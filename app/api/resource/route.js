import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import User from "@/models/user";
import Subscription from "@/models/subscription";
import { getServerSession } from "next-auth";
import { terraformExec } from "@/lib/terraformExec";
import { extractErrorCode } from "@/lib/extractCodeFromError";
import Resource from "@/models/resources";
import connectToDB from "@/lib/db";

export async function POST(req, res) {
  let values;
  try {
    await connectToDB();
    const session = await getServerSession();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 401 });

    values = await req.json();

    const subscription = await Subscription.findById(values.subscriptionId);
    if (!subscription) {
      return NextResponse.json({
        error: "Subscription not found",
        status: 404,
      });
    }

    let result = {};

    // Check if it's a Demo Subscription
    if (subscription.isDemo) {
      console.log("Demo Mode: Simulating deployment...");

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      result = {
        init: "Terraform initialized!",
        plan: "Plan: 1 to add, 0 to change, 0 to destroy.",
        apply: "Apply complete! Resources: 1 added, 0 changed, 0 destroyed.",
      };

    } else {
      // Real Mode: Isolated Execution

      // Define workspace directory: ./terraform_data/<subscription_id>
      const workspaceDir = path.resolve(process.cwd(), "terraform_data", subscription.subscriptionId);

      // Check if workspace exists, if not create it
      let isNewWorkspace = false;
      try {
        await fs.promises.access(workspaceDir);
      } catch (e) {
        isNewWorkspace = true;
        await fs.promises.mkdir(workspaceDir, { recursive: true });
        console.log(`Created new workspace: ${workspaceDir}`);
      }

      // Read global provider template (from the original location)
      // Note: We use the existing ./terraform/_provider.tf as a template source
      let providerData = await fs.promises.readFile(
        "./terraform/_provider.tf",
        "utf-8"
      );

      // Replace placeholders
      providerData = providerData.replace("@@subscription_id@@", subscription.subscriptionId);
      providerData = providerData.replace("@@tenant_id@@", subscription.tenantId);
      providerData = providerData.replace("@@client_id@@", subscription.clientId);
      providerData = providerData.replace("@@client_secret@@", subscription.clientSecret);

      // Write provider to the ISOLATED workspace
      await fs.promises.writeFile(
        path.join(workspaceDir, "_provider.tf"),
        providerData,
        "utf-8"
      );

      // Prepare Resource File
      let templateData = await fs.promises.readFile(
        `./terraform/templates/${values.type}.tf`,
        "utf-8"
      );

      let newFile = templateData;
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key) && key !== "type") {
          const value = values[key];
          if (key === "dnsServers" && value.length < 1) {
            newFile = newFile.replace(`["@@dnsServers@@"]`, "[]");
          } else {
            // Using replaceAll for broader compatibility if needed, matching original logic
            newFile = newFile.split(`@@${key}@@`).join(`${value}`);
          }
        }
      }

      // Write resource file to ISOLATED workspace
      const resourceFilePath = path.join(workspaceDir, `${values.resourceName}.tf`);
      await fs.promises.writeFile(resourceFilePath, newFile, "utf-8");

      console.log(`Exec in progress at ${workspaceDir}`);

      // Execute Terraform in the specific cwd
      // Pass isNewWorkspace to trigger 'terraform init' if needed
      result = await terraformExec(workspaceDir, isNewWorkspace);

      console.log("Exec completed successfully.");
    }

    console.log("RESULT:\n", result);

    const { resourceName, type, subscriptionId, ...details } = values;

    const resource = new Resource({
      name: resourceName,
      type: type,
      subscriptionId: subscription._id,
      details: details,
    });
    await resource.save();

    await User.findByIdAndUpdate(user._id, {
      $push: {
        resources: resource._id,
      },
    });

    await Subscription.findByIdAndUpdate(subscription._id, {
      $push: {
        resources: resource._id,
      },
    });

    return NextResponse.json({
      msg: "Resource created successfully.",
      status: 201,
      data: result,
      resource: resource,
    });
  } catch (error) {
    console.error("Error:", error);

    // Clean up file if needed (only for Real mode, check if values existed)
    // For now simplistic error handling as per original

    // Attempt to identify error code
    const resError = extractErrorCode(`${error.message || error.stderr || ""}`);

    // In a robust system we would delete the specific file in the specific workspace
    // skipping complicated cleanup logic for brevity as per instructions to keep it simple

    return NextResponse.json({
      error: "Resource creation failed.",
      status: 422,
      details: error.message,
    });
  }
}
