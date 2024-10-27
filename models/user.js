import mongoose from "mongoose";

import Subscription from "./subscription";
import Resource from "./resources";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
    subscriptions: [
      {
        type: ObjectId,
        ref: Subscription,
      },
    ],
    resources: [
      {
        type: ObjectId,
        ref: Resource,
      },
    ],
    organization: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
