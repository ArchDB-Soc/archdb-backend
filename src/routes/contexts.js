const express = require("express")
const { 
  getAllRecords, 
  getRecordById, 
  createRecord, 
  updateRecordById } = require("../controllers/records")

const { hasValidAuthJwt } = require("../middleware/auth")

const router = express.Router()
router.get("/", getAllRecords)
router.get("/:id", getRecordById)
router.post("/", hasValidAuthJwt, createRecord)
router.put("/:id", hasValidAuthJwt, updateRecordById)

module.exports = router