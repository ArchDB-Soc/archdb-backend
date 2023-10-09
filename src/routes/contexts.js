const express = require("express")
const { 
  getAllContexts, 
  getContextById, 
  createContext, 
  updateContextById,
deleteContext } = require("../controllers/contexts")
const { addRecord, deleteRecord, updateRecordById } = require("../controllers/records")

const { hasValidAuthJwt } = require("../middleware/auth")

const router = express.Router()
router.get("/", getAllContexts)
router.get("/:id", getContextById)
router.post("/", hasValidAuthJwt, createContext)
router.put("/:id", hasValidAuthJwt, updateContextById)
router.delete("/:id", hasValidAuthJwt, deleteContext)

router.put("/:id/records", hasValidAuthJwt, addRecord)
router.put("/:id/records/:recordid", hasValidAuthJwt, updateRecordById)
router.delete("/:id/records/:recordid", hasValidAuthJwt, deleteRecord)

module.exports = router