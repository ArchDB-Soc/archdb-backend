const express = require("express")
const { 
  getAllContexts, 
  getContextById, 
  createContext, 
  updateContextById,
deleteContext } = require("../controllers/contexts")
const { hasValidAuthJwt } = require("../middleware/auth")

const router = express.Router()
router.get("/", getAllContexts)
router.get("/:id", getContextById)
router.post("/", hasValidAuthJwt, createContext)
router.put("/:id", hasValidAuthJwt, updateContextById)
router.delete("/:id", hasValidAuthJwt, deleteContext)

module.exports = router