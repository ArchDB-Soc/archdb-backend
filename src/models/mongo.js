const mongoose = require("mongoose");

const contextSchema = new mongoose.Schema({
  _records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
  _site: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
  checkedBy: { type: String, required: false },
  enteredBy: { type: String, required: false },
  eastings: { type: Number, required: false },
  northings: { type: Number, required: false },
  excavator: { type: String, required: false },
  excavatedOn: { type: String, required: false },
  recorder: { type: String, required: false },
  composition: { type: String, required: false },
  description: { type: String, required: false },
  notes: { type: String, required: false },
  contextType: { type: String, required: false },
  setNum: { type: Number, required: false },
  thickness: { type: Number, required: false },
  fillOf: { type: Number, required: false },
  associatedWith: { type: String, required: false },
  siteArea: { type: String, required: false },
  excavationMethod: { type: String, required: false },
  earliestDate: { type: Date, required: false },
  latestDate: { type: Date, required: false },
  spotX: { type: Number, required: false },
  spotY: { type: Number, required: false },
  sieved: { type: Boolean, required: false },
  dateText: { type: String, required: false },
  completed: { type: Boolean, required: false },
  planNA: { type: Boolean, required: false },
  excavationEnd: { type: Date, required: false },
  period: { type: String, required: false },
  dimensions: { type: String, required: false },
});

const recordSchema = new mongoose.Schema({
  _context: {type: mongoose.Schema.Types.ObjectId, 
    ref: "Context"},
    name: { type: String, required: false },
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
})

const Context = mongoose.model("Context", contextSchema);
const User = mongoose.model("User", userSchema);
const Record = mongoose.model("Record", recordSchema);


module.exports = {
  Context, User, Record
};
