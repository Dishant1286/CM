
const mongoose = require("mongoose");
const dbconnect = require("../db");
const bcrypt = require("bcryptjs");

// Call the db to connect the MongoDB
dbconnect();

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

// Register a user with async/await
module.exports.registerUser = async function (newUser) {
  try {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    return newUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get a user by username with async/await
module.exports.getUserByUsername = async function (username) {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get a user by ID with async/await
module.exports.getUserById = async function (id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Compare passwords with async/await
module.exports.comparePassword = async function (candidatePassword, hash) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, hash);
    return isMatch;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get all engineers with async/await
module.exports.getEngineer = async function () {
  try {
    const engineers = await User.find({ role: "jeng" });
    return engineers;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
