import mongoose from "mongoose";
import Subscription from "./subscription";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const resourceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: ObjectId,
      ref: Subscription,
    },
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.models.Resource ||
  mongoose.model("Resource", resourceSchema);
