const {
  getAllSitesFromDb,
  getSiteByIdFromDb,
  updateSiteInDb,
  createSiteInDb,
  deleteSiteFromDb,
} = require("../repositories/sites");
const { setError } = require("../config/error");
const {getContextByIdFromDb, updateContextInDb} = require("../repositories/contexts")
const { Site } = require("../models/mongo");

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
  await deleteSiteFromDb(id)
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