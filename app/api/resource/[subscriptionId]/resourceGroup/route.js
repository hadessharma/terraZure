import Resource from "@/models/resources";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { subscriptionId } = params;
    const resources = await Resource.find({
      subscriptionId,
      type: "resourceGroup",
    });
    return NextResponse.json({
      data: resources,
      msg: "Resource Group details fetched successfully.",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal error", status: 500 });
  }
}
