const {
  getAllRecordsFromDb,
  getRecordByIdFromDb,
  createRecordInDb,
  updateRecordInDb,
  deleteRecordFromDb,
} = require("../repositories/records");
const { setError } = require("../config/error");
const { getSiteByIdFromDb, updateSiteInDb } = require("../repositories/sites");

const getAllRecords = async (req, res, next) => {
  try {
    const { filter } = req.query;
    console.log("hello")
    const Records = await getAllRecordsFromDb(filter);
    res.status(200).json({ data: Records });
  } catch {
    return next(setError(400, "Can't find Records hello"));
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
    console.log("checkpoint1",id)
  const newRecord = await createRecordInDb(req.body)
  console.log("checkpoint2",newRecord)
  newRecord._site = id
  console.log("checkpoint3",newRecord)
  let site = await getSiteByIdFromDb(id)
  console.log("checkpoint4",site)
site._records.push(newRecord)
const updatedSite = await updateSiteInDb(id, site)
console.log("checkpoint5",updatedSite)
  res.status(201).json(newRecord)
  console.log(`New record ${newRecord._id} added to site ${updatedSite._id}`)
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

// const deleteRecord = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await deleteRecordFromDb(id);
//     res.status(200).json({ data: "Record deleted" });
//   } catch {
//     return next(setError(400, "Can't delete Record"));
//   }
// };

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
};
