const { Context } = require("../models/mongo");

const getAllContextsFromDb = async (filter) => {
  try {const nameFilterOptions = {
    name: { $regex: new RegExp(filter, "i") },
  };
  const Contexts = await Context.find(filter ? nameFilterOptions : {});
  return Contexts;}
  catch (error) { console.log("Error:", error)}
};

const getContextByIdFromDb = async (id) => {
  try {
    const context = await Context.findById(id);
    return context;
  } catch (error) {
    console.log(error);
  }
};

const createContextInDb = async (payload) => {
  const newContext = new Context(payload);
  await newContext.save();
  return newContext;
};

const updateContextInDb = async (id, payload) => {
  const context = await Context.findByIdAndUpdate(id, payload, { new: true });
  return context;
};

const deleteContextFromDb = async (id) => {
  await Context.deleteOne({ _id: id });
};

module.exports = {
  getAllContextsFromDb,
  getContextByIdFromDb,
  createContextInDb,
  updateContextInDb,
  deleteContextFromDb,
};
