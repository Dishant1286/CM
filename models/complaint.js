// const mongoose = require('mongoose')
// const dbconnect = require('../db')

// //Call the db to connect the mongo db
// dbconnect()

// // Complaint Schema
// const ComplaintSchema = mongoose.Schema({
//     name: {
//         type: String
//     },
//     email: {
//         type: String
//     },
//     contact: {
//         type: String
//     },
//     desc: {
//         type: String
//     }
// });

// const Complaint = module.exports = mongoose.model('Complaint', ComplaintSchema);

// module.exports.registerComplaint = function (newComplaint, callback) {
//     newComplaint.save(callback);
// }

// module.exports.getAllComplaints = function(callback){
//     Complaint.find(callback);
//   }

const mongoose = require("mongoose");
const dbconnect = require("../db");

// Call the db to connect to MongoDB
dbconnect();

// Complaint Schema
const ComplaintSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  desc: {
    type: String,
  },
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports = Complaint;

// Register a new Complaint
module.exports.registerComplaint = async function (newComplaint) {
  try {
    await newComplaint.save();
  } catch (err) {
    throw err;
  }
};

// Get All Complaints
module.exports.getAllComplaints = async function () {
  try {
    return await Complaint.find();
  } catch (err) {
    throw err;
  }
};
