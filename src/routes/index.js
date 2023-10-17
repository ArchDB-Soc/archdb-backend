const express = require("express")
const userRouter = require("./users")
const authRouter = require("./auth")
const recordRouter = require("./records")
const siteRouter = require("./sites")
const setRouter = require("./sets")

const router = express.Router()

router.use("/users", userRouter)
router.use("/auth", authRouter)
router.use("/records", recordRouter)
router.use("/sites", siteRouter)
router.use("/sets", setRouter)

module.exports = router
