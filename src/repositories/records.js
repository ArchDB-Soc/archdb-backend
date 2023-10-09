const { Record } = require("../models/mongo");

const getAllRecordsFromDb = async (filter) => {
  try {const nameFilterOptions = {
    name: { $regex: new RegExp(filter, "i") },
  };
  const Records = await Record.find(filter ? nameFilterOptions : {});
  return Records;}
  catch (error) { console.log("Error:", error)}
};

const getRecordByIdFromDb = async (id) => {
  try {
    const record = await Record.findById(id);
    return record;
  } catch (error) {
    console.log(error);
  }
};

const createRecordInDb = async (payload) => {
  const newRecord = new Record(payload);
  await newRecord.save();
  return newRecord;
};

const updateRecordInDb = async (id, payload) => {
  const record = await Record.findByIdAndUpdate(id, payload, { new: true });
  
  return record;
  
};

const deleteRecordFromDb = async (id) => {
  await Record.deleteOne({ _id: id });
};

const deleteAllRecordsFromDb = async (contextid) => {
  await Record.deleteMany({_context: contextid})
}

module.exports = {
  getAllRecordsFromDb,
  getRecordByIdFromDb,
  createRecordInDb,
  updateRecordInDb,
  deleteRecordFromDb,
  deleteAllRecordsFromDb
};
