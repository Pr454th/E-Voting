const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = { connectDB };
