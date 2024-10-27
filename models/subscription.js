import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const subscriptionSchema = new Schema(
  {
    subscriptionName: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: String,
      required: true,
    },
    tenantId: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    clientSecret: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    resources: [
      {
        type: ObjectId,
        ref: "Resource",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
