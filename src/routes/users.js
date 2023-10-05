const express = require("express")
const { 
  getAllUsers, 
  getUserById, 
  updateUserById,
deleteUser } = require("../controllers/users")
const {hasValidAuthJwt} = require("../middleware/auth")

const router = express.Router()
router.get("/", hasValidAuthJwt, getAllUsers)
router.get("/:id", hasValidAuthJwt, getUserById)
router.put("/:id", hasValidAuthJwt, updateUserById)
router.delete("/:id", hasValidAuthJwt, deleteUser)

module.exports = router