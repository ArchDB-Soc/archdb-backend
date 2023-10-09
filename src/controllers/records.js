const {
  getAllRecordsFromDb,
  getRecordByIdFromDb,
  updateRecordInDb,
  deleteRecordFromDb,
} = require("../repositories/records");
const { setError } = require("../config/error");
const {getContextByIdFromDb, updateContextInDb} = require("../repositories/contexts")
const { Record } = require("../models/mongo");

const getAllRecords = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const Records = await getAllRecordsFromDb(filter);
    res.status(200).json({ data: Records });
  } catch {
    return next(setError(400, "Can't find Records"));
  }
};

const getRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const Record = await getRecordByIdFromDb(id);
    res.status(200).json({ data: Record });
  } catch {
    return next(setError(400, "Can't find Record"));
  }
};

const addRecord = async (req, res,next) => {

  try
  {const id = req.params.id
    console.log(id)
  const newRecord = new Record({
    name: req.body.name,
    _context: id
  })
  
  await newRecord.save()
  let context = await getContextByIdFromDb(id)

context._records.push(newRecord)
const updatedContext = await updateContextInDb(id, context)
  res.status(201).json(newRecord)
  console.log(`New record ${newRecord._id} added to context ${updatedContext._id}`)}
  catch {
    return next(setError(400, "Can't add record"))
  }
}


const updateRecordById = async (req, res, next) => {
  try {
    const { recordid } = req.params;
    const Record = await updateRecordInDb(recordid, req.body);
    console.log(Record)
    res.status(200).json({ data: Record });
  } catch {
    return next(setError(400, "Can't update Record"));
  }
};

const deleteRecord = async (req, res, next) => {
  try
  {const {id} = req.params
  const {recordid} = req.params
  let context = await getContextByIdFromDb(id)
  context._records.pull(recordid)
  await updateContextInDb(id, context)
  await deleteRecordFromDb(recordid)
  res.status(200).json({data: "Record deleted from context and records table"})}
catch {
return next(setError(400, "Can't delete record"))
}
}

module.exports = {
  getAllRecords,
  getRecordById,
  updateRecordById,
  deleteRecord,
  addRecord
};