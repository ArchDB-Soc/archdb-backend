const express = require("express")
const { 
  getAllContexts, 
  getContextById, 
  createContext, 
  updateContextById,
deleteContext } = require("../controllers/contexts")

const router = express.Router()
router.get("/", getAllContexts)
router.get("/:id", getContextById)
router.post("/", createContext)
router.put("/:id", updateContextById)
router.delete("/:id", deleteContext)

module.exports = router