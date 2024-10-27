import { NextResponse } from "next/server";
import fs from "fs";

import User from "@/models/user";
import Subscription from "@/models/subscription";
import { getServerSession } from "next-auth";
import { terraformExec } from "@/lib/terraformExec";
import { extractErrorCode } from "@/lib/extractCodeFromError";
import Resource from "@/models/resources";

export async function POST(req, res) {
  let values;
  try {
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

    // Update the provider file
    let providerData = await fs.promises.readFile(
      "./terraform/_provider.tf",
      "utf-8"
    );
    providerData = providerData.replace(
      "@@subscription_id@@",
      subscription.subscriptionId
    );
    providerData = providerData.replace("@@tenant_id@@", subscription.tenantId);
    providerData = providerData.replace("@@client_id@@", subscription.clientId);
    providerData = providerData.replace(
      "@@client_secret@@",
      subscription.clientSecret
    );
    await fs.promises.writeFile(
      "./terraform/_provider.tf",
      providerData,
      "utf-8"
    );

    // Update or Create <resource_name>.tf file according to type and values
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
          newFile = newFile.replaceAll(`@@${key}@@`, `${value}`);
        }
      }
    }

    await fs.promises.writeFile(
      `./terraform/${values.resourceName}.tf`,
      newFile,
      "utf-8"
    );

    console.log("Exec in progress.");
    const result = await terraformExec();

    // Change the provder file to initial state.
    providerData = await fs.promises.readFile(
      "./terraform/_provider.tf",
      "utf-8"
    );
    providerData = providerData.replace(
      subscription.subscriptionId,
      "@@subscription_id@@"
    );
    providerData = providerData.replace(subscription.tenantId, "@@tenant_id@@");
    providerData = providerData.replace(subscription.clientId, "@@client_id@@");
    providerData = providerData.replace(
      subscription.clientSecret,
      "@@client_secret@@"
    );
    await fs.promises.writeFile(
      "./terraform/_provider.tf",
      providerData,
      "utf-8"
    );

    console.log("Exec completed successfully.");
    console.log("RESULT:\n", result);

    // Additional handling or DB operations here

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
    });
  } catch (error) {
    console.error("Error:", error);

    //delete the file
    const resError = extractErrorCode(`${error.stderr}`);
    if (resError === "StorageAccountAlreadyTaken") {
      await fs.promises.unlink(`./terraform/${values.resourceName}.tf`);
    } else if (resError === "VaultAlreadyExists") {
      await fs.promises.unlink(`./terraform/${values.resourceName}.tf`);
    }

    return NextResponse.json({
      error: "Resource creation failed.",
      status: 422,
      error: error,
    });
  }
}
