// db.js
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      ""
    );
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = connectDB;
