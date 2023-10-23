import mongoose from "mongoose";

async function connectMongoDB() {
  try {
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
