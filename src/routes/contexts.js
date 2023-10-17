const express = require("express")
const { 
  getAllContexts, 
  getContextById, 
  createContext, 
  updateContextById } = require("../controllers/contexts")

const { hasValidAuthJwt } = require("../middleware/auth")

const router = express.Router()
router.get("/", getAllContexts)
router.get("/:id", getContextById)
router.post("/", hasValidAuthJwt, createContext)
router.put("/:id", hasValidAuthJwt, updateContextById)

module.exports = router