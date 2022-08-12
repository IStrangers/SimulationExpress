const createApplication = require("../src")

const app = createApplication()

app.use(/\/[A-z]+/,function(req,res,next) {
  req.use = "TestUse"
  console.log(req.use)
  next()
})
app.use("/test",function(req,res,next) {
  req.use1 = "TestUse1"
  console.log(req.use1)
  next()
})

app.get("/test",function(req,res,next) {
  console.log(1)
  next()
},function(req,res,next) {
  console.log(2)
  next()
},function(req,res,next) {
  console.log(3)
  next()
},function(req,res,next) {
  console.log(4)
  next()
},function(req,res,next) {
  console.log(5)
  res.end(req.use + req.use1)
})

app.post("/test",function(req,res) {
  console.log("post")
})

app.listen(8848)