const {
  getAllContextsFromDb,
  getContextByIdFromDb,
  createContextInDb,
  updateContextInDb,
  deleteContextFromDb,
} = require("../repositories/contexts");
const { setError } = require("../config/error");

const getAllContexts = async (req, res, next) => {
  try {
    const { filter } = req.query;
    console.log("hello")
    const Contexts = await getAllContextsFromDb(filter);
    res.status(200).json({ data: Contexts });
  } catch {
    return next(setError(400, "Can't find Contexts hello"));
  }
};

const getContextById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const Context = await getContextByIdFromDb(id);
    res.status(200).json({ data: Context });
  } catch {
    return next(setError(400, "Can't find Context"));
  }
};

const createContext = async (req, res, next) => {
  try {
    const ContextObject = { ...req.body };
    const newContext = await createContextInDb(ContextObject);
    res.status(201).json({ data: newContext });
  } catch {
    return next(setError(400, "Can't create Context"));
  }
};

const updateContextById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Context = await updateContextInDb(id, req.body);
    res.status(200).json({ data: Context });
  } catch {
    return next(setError(400, "Can't update Context"));
  }
};

const deleteContext = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteContextFromDb(id);
    res.status(200).json({ data: "Context deleted" });
  } catch {
    return next(setError(400, "Can't delete Context"));
  }
};

module.exports = {
  getAllContexts,
  getContextById,
  createContext,
  updateContextById,
  deleteContext,
};
