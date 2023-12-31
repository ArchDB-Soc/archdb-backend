const {
  getAllSitesFromDb,
  getSiteByIdFromDb,
  updateSiteInDb,
  createSiteInDb,
  deleteSiteFromDb,
} = require("../repositories/sites");
const { setError } = require("../config/error");
const {getRecordByIdFromDb, updateRecordInDb, deleteAllRecordsFromDb} = require("../repositories/records")
const { Site } = require("../models/mongo");
const { deleteAllSetsFromDb } = require("../repositories/sets");

const getAllSites = async (req, res, next) => {
  try {
    const { filter } = req.query;
    const Sites = await getAllSitesFromDb(filter);
    res.status(200).json({ data: Sites });
  } catch {
    return next(setError(400, "Can't find Sites"));
  }
};

const getSiteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const Site = await getSiteByIdFromDb(id);
    res.status(200).json({ data: Site });
  } catch {
    return next(setError(400, "Can't find Site"));
  }
};

const createSite = async (req, res, next) => {
  try {
    const SiteObject = { ...req.body };
    const newSite = await createSiteInDb(SiteObject);
    res.status(201).json({ data: newSite });
  } catch {
    return next(setError(400, "Can't create Site"));
  }
};


const updateSiteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Site = await updateSiteInDb(id, req.body);
    console.log(Site)
    res.status(200).json({ data: Site });
  } catch {
    return next(setError(400, "Can't update Site"));
  }
};

const deleteSite = async (req, res, next) => {
  try
  {const {id} = req.params
  await deleteSiteFromDb(id) // remove Site from database
  await deleteAllRecordsFromDb(id) // remove any associated Records
  await deleteAllSetsFromDb(id) // remove any associated Sets
  res.status(200).json({data: "Site deleted"})}
catch {
return next(setError(400, "Can't delete site"))
}
}

module.exports = {
  getAllSites,
  getSiteById,
  updateSiteById,
  deleteSite,
  createSite
};