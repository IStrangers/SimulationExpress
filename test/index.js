const createApplication = require("../src")

const express = createApplication()

express.get("/test",function(req,res,next) {
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
  res.end()
})

express.listen(666)