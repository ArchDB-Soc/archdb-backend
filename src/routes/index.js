const express = require("express")
const userRouter = require("./users")
const authRouter = require("./auth")
const contextRouter = require("./contexts")
const siteRouter = require("./sites")

const router = express.Router()

router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/contexts", contextRouter)
router.use("/sites", siteRouter)

module.exports = router
