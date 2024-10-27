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
      "subscriptionName subscriptionId"
    );
    if (!resource)
      return NextResponse.json({ error: "Resource not found", status: 404 });

    return NextResponse.json({ data: resource, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Intern Error", status: 500 });
  }
}
