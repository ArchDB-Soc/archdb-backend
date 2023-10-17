const { Set } = require("../models/mongo");

const getAllSetsFromDb = async (filter) => {
  try {const descriptionFilterOptions = {
    description: { $regex: new RegExp(filter, "i") },
  };
  const Sets = await Set.find(filter ? descriptionFilterOptions : {});
  return Sets;}
  catch (error) { console.log("Error:", error)}
};

const getSetByIdFromDb = async (id) => {
  try {
    const set = await Set.findById(id);
    return set;
  } catch (error) {
    console.log(error);
  }
};

const createSetInDb = async (payload) => {
  const newSet = new Set(payload);
  await newSet.save();
  return newSet;
};

const updateSetInDb = async (id, payload) => {

  try 
  {console.log("checkpoint3", id, payload)
  const set = await Set.findByIdAndUpdate(id, payload, { new: true });
  console.log("checkpoint4", set)
  return set;}
  catch (error) {
    console.error
  }
};

const deleteSetFromDb = async (id) => {
  await Set.deleteOne({ _id: id });
};

const deleteAllSetsFromDb = async (siteid) => {
  await Set.deleteMany({_site: siteid})
}

module.exports = {
  getAllSetsFromDb,
  getSetByIdFromDb,
  createSetInDb,
  updateSetInDb,
  deleteSetFromDb,
  deleteAllSetsFromDb
};