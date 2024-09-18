import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://zolookorzoloo2004:VGno8yxaSMFTYnoo@team-1-db.sfhni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
