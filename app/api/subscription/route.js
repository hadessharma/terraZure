import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import User from "@/models/user";
import Subscription from "@/models/subscription";

export async function POST(req, res) {
  try {
    const values = await req.json();

    const session = await getServerSession();
    const user = await User.findOne({ email: session?.user?.email });
    if (!user) return NextResponse.json({ error: "Unauthorized", status: 201 });

    const newValues = { ...values, user: user._id };

    const sub = new Subscription(newValues);
    await sub.save();

    await User.findByIdAndUpdate(user._id, {
      $push: {
        subscriptions: sub._id,
      },
    });

    return NextResponse.json({
      message: "Subscription created successfully",
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse, json({ error: "Some error occured", status: 500 });
  }
}

