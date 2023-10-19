const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  type: { type: String, required: false },
  date: { type: Date, required: false },
  excavator: { type: String, required: false },
  abstract: { type: String, required: false },
  _records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
  _sets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Set" }],
})

const setSchema = new mongoose.Schema({
  _site: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
  siteName: { type: String, required: false },
  title: { type: String, required: false },
  period: { type: String, required: false },
  notes: { type: String, required: false },
  _records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
})

const recordSchema = new mongoose.Schema({
  _records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],
  _set: { type: mongoose.Schema.Types.ObjectId, ref: "Set" },
  _site: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
  siteName: { type: String, required: false },
  friendlyId: { type: String, required: false },
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
  recordType: { type: String, required: false },
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
  dateText: { type: String, required: false },
  excavationEnd: { type: Date, required: false },
  period: { type: String, required: false },
  dimensions: { type: String, required: false },
  sieved: { type: Boolean, required: false },
  completed: { type: Boolean, required: false },
  planNA: { type: Boolean, required: false },
});

recordSchema.pre('save', async function (next) {
  
  if (!this.isNew) {
    return next(); 
  }

  // const count = await Record.countDocuments({}).exec();
  // const paddedCount = String(count + 1).padStart(3, '0'); 
  //  this.friendlyId = `${this.siteName.substring(0, 3)}${paddedCount}`;
  
  let isUnique = false;
    let count = 1; 

    while (!isUnique) {
      const paddedCount = String(count).padStart(3, '0');
      this.friendlyId = `${this.siteName.substring(0, 3)}${paddedCount}`;

      // Check if the generated name is unique
      const existingRecord = await Record.findOne({ friendlyId: this.friendlyId }).exec();
      if (!existingRecord) {
        isUnique = true;
      } else {
        count++; // Increment the count and try again
      }
    }
  
   next();
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
})

const Site = mongoose.model("Site", siteSchema);
const Set = mongoose.model("Set", setSchema);
const Record = mongoose.model("Record", recordSchema);
const User = mongoose.model("User", userSchema);

module.exports = {
  Site, Set, Record, User
};
