const createApplication = require("../src")

const express = createApplication()

express.get("/test",function(req,res) {
  res.end("Test")
})

express.listen(666)