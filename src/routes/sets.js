const express = require("express")
const { 
  getAllSets, 
  getSetById, 
  // createSet, 
  updateSetById } = require("../controllers/sets")

const { hasValidAuthJwt } = require("../middleware/auth")

const router = express.Router()
router.get("/", getAllSets)
router.get("/:id", getSetById)
// router.post("/", hasValidAuthJwt, createSet)
router.put("/:id", hasValidAuthJwt, updateSetById)

module.exports = router