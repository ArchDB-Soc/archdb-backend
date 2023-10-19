const express = require("express")
const { 
  getAllSets, 
  getSetById,  
  updateSetById } = require("../controllers/sets")

const { hasValidAuthJwt } = require("../middleware/auth")
const { addExistingRecordToSet } = require("../controllers/records")

const router = express.Router()
router.get("/", getAllSets)
router.get("/:id", getSetById)
router.put("/:id", hasValidAuthJwt, updateSetById)
router.put("/:setid/records/:recordid", hasValidAuthJwt, addExistingRecordToSet)

module.exports = router