const express = require("express")
const { 
  getAllRecords, 
  getRecordById,
} = require("../controllers/records")
  // const {hasValidAuthJwt} = require("../middleware/auth")

const router = express.Router()
router.get("/", getAllRecords)
router.get("/:id", getRecordById)

module.exports = router