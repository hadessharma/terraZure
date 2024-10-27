import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import User from "@/models/user";

export async function GET(req, res) {
  try {
    const session = await getServerSession();
    const user = await User.findOne({ email: session?.user?.email }).populate(
      "subscriptions"
    );
    if (!user)
      return NextResponse.json({ error: "User not found!", status: 404 });
    return NextResponse.json({ data: user, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
