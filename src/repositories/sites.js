const { Site } = require("../models/mongo");

const getAllSitesFromDb = async (filter) => {
  try {const nameFilterOptions = {
    name: { $regex: new RegExp(filter, "i") },
  };
  const Sites = await Site.find(filter ? nameFilterOptions : {});
  return Sites;}
  catch (error) { console.log("Error:", error)}
};

const getSiteByIdFromDb = async (id) => {
  try {
 
    const site = await Site.findById(id);
    
    return site;
  } catch (error) {
    console.log(error);
  }
};

const createSiteInDb = async (payload) => {
  const newSite = new Site(payload);
  await newSite.save();
  return newSite;
};

const updateSiteInDb = async (id, payload) => {
  const site = await Site.findByIdAndUpdate(id, payload, { new: true });
  
  return site;
  
};

const deleteSiteFromDb = async (id) => {
  await Site.deleteOne({ _id: id });
};

const deleteAllSitesFromDb = async (recordid) => {
  await Site.deleteMany({_record: recordid})
}

module.exports = {
  getAllSitesFromDb,
  getSiteByIdFromDb,
  createSiteInDb,
  updateSiteInDb,
  deleteSiteFromDb,
  deleteAllSitesFromDb
};
