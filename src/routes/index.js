const express = require("express")
const contextRouter = require("./contexts")

const router = express.Router()

router.use("/contexts", contextRouter)

module.exports = router
