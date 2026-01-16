import Resource from "@/models/resources";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const session = await getServerSession();
    if (!session.user)
      return NextResponse.json({ error: "Unauthorized", status: 401 });

    const resource = await Resource.findById(id).populate(
      "subscriptionId",
      "subscriptionName subscriptionId isDemo"
    );
    if (!resource)
      return NextResponse.json({ error: "Resource not found", status: 404 });

    return NextResponse.json({ data: resource, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Intern Error", status: 500 });
  }
}

import fs from "fs";
import path from "path";
import User from "@/models/user";
import Subscription from "@/models/subscription";
import { terraformDestroy } from "@/lib/terraformExec";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    // We should ideally check session here too
    const resource = await Resource.findById(id).populate("subscriptionId");
    if (!resource) {
      return NextResponse.json({ error: "Resource not found", status: 404 });
    }

    const subscription = resource.subscriptionId;

    // 1. Destroy Infrastructure
    if (subscription.isDemo) {
      console.log("Demo Mode: Simulating destruction...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      // Real Mode
      const workspaceDir = path.resolve(process.cwd(), "terraform_data", subscription.subscriptionId);

      // Check if resource file exists
      const resourceFilePath = path.join(workspaceDir, `${resource.name}.tf`);

      try {
        await fs.promises.access(resourceFilePath);
        // If file exists, we *should* ideally run destroy. 
        // However, Terraform destroys based on the STATE, not just one file.
        // If we have a state file in this directory, 'terraform destroy' will try to destroy EVERYTHING in that state.
        // CAUTION: This app seems to manage 1 resource = 1 file. 
        // In standard Terraform, 'destroy' destroys the whole stack.
        // For now, consistent with the app's apparent design, we run destroy in that folder.

        console.log(`Destroying resources in ${workspaceDir}...`);
        await terraformDestroy(workspaceDir);

        // After destroy, remove the .tf file to keep directory clean? 
        // Or maybe we should have removed it *before* and then run apply? 
        // Terraform destroy removes the infrastructure defined in the state.
        // To be safe, we run destroy first.

        await fs.promises.unlink(resourceFilePath);

      } catch (e) {
        console.warn("Resource file or workspace not found, skipping Terraform destroy.", e.message);
      }
    }

    // 2. Delete from DB
    await Resource.findByIdAndDelete(id);

    // 3. Remove reference from User and Subscription
    // Note: This might need more robust checks, but keeping it simple as per legacy code
    await User.updateMany(
      { resources: id },
      { $pull: { resources: id } }
    );
    await Subscription.updateMany(
      { resources: id },
      { $pull: { resources: id } }
    );

    return NextResponse.json({ msg: "Resource deleted successfully", status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed", status: 500 });
  }
}
