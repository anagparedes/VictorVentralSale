const mongoose = require("mongoose");
require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONN_STRING, {});
    console.log("Connected to Database!");
  } catch (error) {
    console.error("Connection failed!", error);
  }
};

module.exports = { connectToDatabase };
