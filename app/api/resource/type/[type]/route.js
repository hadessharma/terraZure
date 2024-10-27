import Resource from "@/models/resources";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { type } = params;
    const session = await getServerSession();
    if (!session.user)
      return NextResponse.json({ error: "Unauthenticated", status: 401 });

    const resource = await Resource.find({ type: type }).select(
      "name _id type"
    );
    if (!resource)
      return NextResponse.json({ error: "Resource not found", status: 404 });

    return NextResponse.json({ data: resource, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
