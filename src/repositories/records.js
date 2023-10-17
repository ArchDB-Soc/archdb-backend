const { Record } = require("../models/mongo");

const getAllRecordsFromDb = async (filter) => {
  try {const descriptionFilterOptions = {
    description: { $regex: new RegExp(filter, "i") },
  };
  const Records = await Record.find(filter ? descriptionFilterOptions : {});
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

  try 
  {console.log("checkpoint3", id, payload)
  const record = await Record.findByIdAndUpdate(id, payload, { new: true });
  console.log("checkpoint4", record)
  return record;}
  catch (error) {
    console.error
  }
};

const deleteRecordFromDb = async (id) => {
  await Record.deleteOne({ _id: id });
};

const deleteAllRecordsFromDb = async (siteid) => {
  await Record.deleteMany({_site: siteid})
}

module.exports = {
  getAllRecordsFromDb,
  getRecordByIdFromDb,
  createRecordInDb,
  updateRecordInDb,
  deleteRecordFromDb,
  deleteAllRecordsFromDb
};
