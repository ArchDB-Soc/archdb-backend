const mongoose = require("mongoose")

// decide how strict MongoDB will be
mongoose.set("strict", true)
mongoose.set("strictQuery", false)
mongoose.set("strictPopulate", true)

console.log("url", process.env.MONGO_URL)
mongoose
.connect(process.env.MONGO_URL, {useUnifiedTopology:true,
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(()=>{
  console.log("Connected to MongoDB")
})
.catch((err)=>{
  console.log("Error connecting:", err)
})