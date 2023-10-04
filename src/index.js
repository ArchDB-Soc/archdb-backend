require("dotenv").config() // handles environment variables
const express = require('express')
require("./config/db")
const rateLimit = require('express-rate-limit')
const mainRouter = require("./routes")
const { setError } = require("./config/error")
const app = express()

// Limit each IP to 100 requests every 5 mins
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 100,
	standardHeaders: false,
	legacyHeaders: false,
})
app.use(limiter)
app.use(express.json({limit: "1mb"}))
app.use(express.urlencoded({limit:"1mb", extended: true}))
app.use((_req,res,next)=>{
res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
res.header("Access-Control-Allow-Headers", "Content-Type")
next()
})
// app.disable("x-powered-by") // remove info about headers for security

app.use("/api", mainRouter)

app.use("*", (req, res, next)=>{
  return next(setError(404, "Not found"))
})

app.use((error, req, res, next)=>{
return res.status(error.status || 500).json(error.message || "Internal server error 🧯")
})

const PORT = process.env.port || 4001
app.listen(PORT, ()=>{
  console.log(`App running in: http://localhost:${PORT}`)
})

module.exports = app