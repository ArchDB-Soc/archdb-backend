const express = require("express")
const { 
  getAllSites, 
  getSiteById,
  createSite,
  updateSiteById,
  deleteSite
} = require("../controllers/sites")
const {hasValidAuthJwt} = require("../middleware/auth")

const router = express.Router()
router.get("/", getAllSites)
router.get("/:id", getSiteById)
router.post("/", hasValidAuthJwt, createSite)
router.put("/:id", hasValidAuthJwt, updateSiteById)
router.delete("/:id", hasValidAuthJwt, deleteSite)


module.exports = router