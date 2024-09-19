const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/complaintapp", {
      // No additional options are necessary
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = dbconnect;
