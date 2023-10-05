const express = require("express")
const userRouter = require("./users")
const authRouter = require("./auth")
const contextRouter = require("./contexts")

const router = express.Router()

router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/contexts", contextRouter)

module.exports = router
