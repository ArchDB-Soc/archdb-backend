const { Record } = require("../models/mongo");

const getAllRecordsFromDb = async (filter) => {
  try {const descriptionFilterOptions = {
    description: { $regex: new RegExp(filter, "i") },
  };
  const Records = await Record.find(filter ? descriptionFilterOptions : {});
  return Records;}
  catch (error) { console.log("Error:", error)}
};

const getRecordsFromDb = async (startIndex, itemsPerPage) => {
  console.log("checkpoint1")
  console.log(startIndex, itemsPerPage)
  const Records = await Record.find({})
      .skip(startIndex)
      .limit(itemsPerPage)
      // .toArray();

   return Records
}

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
  console.log(newRecord)
  await newRecord.save()
  return newRecord
};

const updateRecordInDb = async (id, payload) => {

  try 
  {console.log("6 id/payload", id, payload)
  const record = await Record.findByIdAndUpdate(id, payload, { new: true });
  return record;}
  catch (error) {
    console.error
  }
};

const removeSetFromRecordsInDb = async (setid) => {
  try {
    const result = await Record.updateMany(
      { _set: setid},
      { $unset: { _set: 1 } }
    );
return result
  } catch (error) {
    console.error
  }
}

const deleteRecordFromDb = async (id) => {
  await Record.deleteOne({ _id: id });
};

const deleteAllRecordsFromDb = async (siteId) => {
  await Record.deleteMany({_site: siteId})
}

const getRecordsBySetIdFromDb = async (setId) => {
    const records = await Record.find({ _set: setId});
   console.log(records)
    return records;
  
  }

module.exports = {
  getAllRecordsFromDb,
  getRecordByIdFromDb,
  createRecordInDb,
  updateRecordInDb,
  deleteRecordFromDb,
  deleteAllRecordsFromDb,
  getRecordsBySetIdFromDb,
  getRecordsFromDb,
  removeSetFromRecordsInDb
};
