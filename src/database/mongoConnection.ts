import mongoose from "mongoose";

export const ConnectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "crud",
    });

    console.log(`MongoDB Connected!`);
  } catch (error) {
    console.log(`ERROR:While Connect to the MongoDB,${error}`);
  }
};
