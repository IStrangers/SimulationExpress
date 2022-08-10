const HTTP = require("http")
const URL = require("url")
const Path = require("path")
const Router = require("./router")

class Appliction {

  constructor() {
    this.router = new Router()
  }

  get(url,handler) {
    this.push({
      url,
      method: "get",
      handler
    })
  }

  post() {
    this.push({
      url,
      method: "post",
      handler
    })
  }

  push(routerInfo) {
    this.router.push(routerInfo)
  }

  listen() {
    const server = HTTP.createServer((req,res) => {
      const method = req.method.toLowerCase()
      const { pathname } = URL.parse(req.url)
      const key = `${method}:${pathname}`
      const routerInfo = this.router.get(key)
      if(routerInfo) {
        const { handler } = routerInfo
        return handler(req,res)
      } else {
        res.end(`Cannot ${key}`)
        return
      }
    })
    server.listen(...arguments)
  }

}

module.exports = Appliction