const mongoose = require("mongoose");
const dbconnect = require("../db");

//Call the db to connect the mongo db
dbconnect();

// Complaint Schema
const ComplaintMappingSchema = mongoose.Schema({
  complaintID: {
    type: String,
    required: true,
  },
  engineerName: {
    type: String,
    required: true,
  },
});

const ComplaintMapping = mongoose.model(
  "ComplaintMapping",
  ComplaintMappingSchema
);
module.exports = ComplaintMapping;

module.exports.registerMapping = async function (newComplaintMapping) {
  try {
    await newComplaintMapping.save();
  } catch (err) {
    throw err;
  }
};
