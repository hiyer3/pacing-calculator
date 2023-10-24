import mongoose from "mongoose";

async function connectMongoDB() {
  try {
    // Check if environment variable is accessible
    if (!process.env.MONGODB_URI) {
      console.log(
        "%cERROR: DB ENVIRONMENT VARIABLE MIGHT NOT BE SET",
        "font-weight: bold; color: red"
      );
    }

    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(process.env.MONGODB_URI);
    // Send a ping to confirm a successful connection
  } catch (e) {
    console.dir(e);
  }
}

async function closeMongoDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connection.close();
    // Send a ping to confirm a successful connection
  } catch (e) {
    console.dir(e);
  }
}
export { connectMongoDB, closeMongoDB };
