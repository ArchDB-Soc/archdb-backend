const mongoose = require("mongoose")

// decide how strict MongoDB will be
mongoose.set("strict", true)
mongoose.set("strictQuery", false)
mongoose.set("strictPopulate", true)

mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("Connected to MongoDB")
})
.catch((err)=>{
  console.log("Error connecting:", err)
})