import Subscription from "@/models/subscription";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const offset = req.nextUrl.searchParams.get("offset");
    const session = await getServerSession();
    if (!session.user)
      return NextResponse.json({ error: "Unauthenticated", status: 401 });

    const sub = await Subscription.findById(id).populate({
      path: "resources",
      select: "name _id type",
      options: { limit: 7, skip: offset },
    });
    if (!sub)
      return NextResponse.json({
        error: "No Subscription found!",
        status: 404,
      });
    return NextResponse.json({ data: sub, status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const values = await req.json();
    const session = await getServerSession();
    if (!session.user)
      return NextResponse.json({ error: "Unauthenticated", status: 401 });
    const sub = await Subscription.findByIdAndUpdate(id, values);
    return NextResponse.json({ data: sub, status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const session = await getServerSession();
    if (!session.user)
      return NextResponse.json({ error: "Unauthenticated", status: 401 });
    await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $pull: {
          subscriptions: id,
        },
      }
    );
    await Subscription.findByIdAndDelete(id);
    return NextResponse.json({
      msg: "Subscription deleted successfully",
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Internal Error", status: 500 });
  }
}
