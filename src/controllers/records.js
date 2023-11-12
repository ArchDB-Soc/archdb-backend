const {
  getAllRecordsFromDb,
  getRecordByIdFromDb,
  createRecordInDb,
  updateRecordInDb,
  deleteRecordFromDb,
  getRecordsFromDb
} = require("../repositories/records");
const { setError } = require("../config/error");
const { getSiteByIdFromDb, updateSiteInDb } = require("../repositories/sites");
const { getSetByIdFromDb, updateSetInDb } = require("../repositories/sets");

const itemsPerPage = 10

const getAllRecords = async (req, res, next) => {
  try {
    // const { filter } = req.query;
    // const Records = await getAllRecordsFromDb(filter);
    // res.status(200).json({ data: Records });
    const page = parseInt(req.query.page) || 1
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const itemsForPage = await getRecordsFromDb(startIndex, itemsPerPage);
    res.status(200).json({
      currentPage: page,
      // totalPages: Math.ceil(allItems.length / itemsPerPage),
      data: itemsForPage,
    });

  } catch {
    return next(setError(400, "Can't find Records"));
  }
};

const getRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Record = await getRecordByIdFromDb(id);
    res.status(200).json({ data: Record });
  } catch {
    return next(setError(400, "Can't find Record"));
  }
};

const createRecord = async (req, res, next) => {
  try {
    const RecordObject = { ...req.body };
    const newRecord = await createRecordInDb(RecordObject);
    res.status(201).json({ data: newRecord });
  } catch {
    return next(setError(400, "Can't create Record"));
  }
};

const addRecordToSite = async (req, res,next) => {

  try {
    
    const id = req.params.id
  const newRecord = await createRecordInDb(req.body)
  newRecord._site = id
  let site = await getSiteByIdFromDb(id)
site._records.push(newRecord)
const updatedSite = await updateSiteInDb(id, site)
  res.status(201).json(newRecord)
  console.log(`New record ${newRecord._id} added to site ${updatedSite._id}`)
} catch {
    return next(setError(400, "Can't add record"))
  }
}

const addExistingRecordToSet = async (req, res,next) => {

  try {
    const setId = req.params.setid
    const recordId = req.params.recordid
  const recordToChange = await getRecordByIdFromDb(recordId)
  recordToChange._set = setId
  let set = await getSetByIdFromDb(setId)
set._records.push(recordToChange)
const updatedSet = await updateSetInDb(setId, set)
  res.status(201).json(recordToChange)
  console.log(`Record ${recordToChange._id} added to set ${updatedSet._id}`)
} catch {
    return next(setError(400, "Can't add record"))
  }
}

const updateRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const Record = await updateRecordInDb(id, req.body);
    res.status(200).json({ data: Record });
  } catch {
    return next(setError(400, "Can't update Record"));
  }
};

const deleteRecord = async (req,res,next)=>{
  try
  {const {siteid} = req.params
  const {recordid} = req.params
  let site = await getSiteByIdFromDb(siteid)
  site._records.pull(recordid)
  await updateSiteInDb(siteid, site)
  await deleteRecordFromDb(recordid)
  res.status(200).json({data: "Record deleted from Site and Records table"})}
catch {
return next(setError(400, "Can't delete Record"))
}
}

module.exports = {
  getAllRecords,
  getRecordById,
  createRecord,
  addRecordToSite,
  updateRecordById,
  deleteRecord,
  addExistingRecordToSet
};
