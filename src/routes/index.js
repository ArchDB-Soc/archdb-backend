const express = require("express")
const userRouter = require("./users")
const authRouter = require("./auth")
const contextRouter = require("./contexts")
const recordRouter = require("./records")

const router = express.Router()

router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/contexts", contextRouter)
router.use("/records", recordRouter)

module.exports = router
