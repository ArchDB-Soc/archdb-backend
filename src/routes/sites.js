const express = require("express")
const { 
  getAllSites, 
  getSiteById,
  createSite,
  updateSiteById,
  deleteSite
} = require("../controllers/sites")
const {hasValidAuthJwt} = require("../middleware/auth")
const { addRecordToSite, deleteRecord } = require("../controllers/records")
const { addSetToSite, deleteSet } = require("../controllers/sets")

const router = express.Router()
router.get("/", getAllSites)
router.get("/:id", getSiteById)
router.post("/", hasValidAuthJwt, createSite)
router.put("/:id", hasValidAuthJwt, updateSiteById)
router.put("/:id/records/", hasValidAuthJwt, addRecordToSite)
router.put("/:id/sets/", hasValidAuthJwt, addSetToSite)
router.delete("/:id", hasValidAuthJwt, deleteSite)
router.delete("/:siteid/records/:recordid", hasValidAuthJwt, deleteRecord)
router.delete("/:siteid/sets/:setid", hasValidAuthJwt, deleteSet)


module.exports = router