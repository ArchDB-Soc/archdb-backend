const {
  getAllSetsFromDb,
  getSetByIdFromDb,
  createSetInDb,
  updateSetInDb,
  deleteSetFromDb,
} = require("../repositories/sets");
const { setError } = require("../config/error");
const { getSiteByIdFromDb, updateSiteInDb } = require("../repositories/sites");

const getAllSets = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const Sets = await getAllSetsFromDb(filter);
    res.status(200).json({ data: Sets });
  } catch {
    return next(setError(400, "Can't find Sets"));
  }
};

const getSetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Set = await getSetByIdFromDb(id);
    res.status(200).json({ data: Set });
  } catch {
    return next(setError(400, "Can't find Set"));
  }
};

// const createSet = async (req, res, next) => {
//   try {
//     const SetObject = { ...req.body };
//     const newSet = await createSetInDb(SetObject);
//     res.status(201).json({ data: newSet });
//   } catch {
//     return next(setError(400, "Can't create Set"));
//   }
// };

const addSetToSite = async (req, res,next) => {
  try {
    const id = req.params.id
    // console.log(id)
  const newSet = await createSetInDb(req.body)
  newSet._site = id
  
  let site = await getSiteByIdFromDb(id)
  console.log(site)
site._sets.push(newSet)
console.log("site", site)
const updatedSite = await updateSiteInDb(id, site)
console.log("updatedSite",updatedSite)
  res.status(201).json(newSet)
  console.log(`New set ${newSet._id} added to site ${updatedSite._id}`)
} catch {
    return next(setError(400, "Can't add set"))
  }
}

const updateSetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Set = await updateSetInDb(id, req.body);
    res.status(200).json({ data: Set });
  } catch {
    return next(setError(400, "Can't update Set"));
  }
};

// const deleteSet = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await deleteSetFromDb(id);
//     res.status(200).json({ data: "Set deleted" });
//   } catch {
//     return next(setError(400, "Can't delete Set"));
//   }
// };

const deleteSet = async (req,res,next)=>{
  try
  {const {siteid} = req.params
  const {setid} = req.params
  let site = await getSiteByIdFromDb(siteid)
  site._sets.pull(setid)
  await updateSiteInDb(siteid, site)
  await deleteSetFromDb(setid)
  res.status(200).json({data: "Set deleted from Site and Sets table"})}
catch {
return next(setError(400, "Can't delete Set"))
}
}

module.exports = {
  getAllSets,
  getSetById,
  // createSet,
  addSetToSite,
  updateSetById,
  deleteSet,
};
