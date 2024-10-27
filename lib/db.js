import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection successfull");
  } catch (err) {
    console.log("DB connection failed: ", err);
  }
}
