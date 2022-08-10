const HTTP = require("http")
const URL = require("url")
const Path = require("path")
const { RouterMapping } = require("./router")

class Appliction {

  constructor() {
    this.routerMapping = new RouterMapping()
  }

  get(url,...handlers) {
    this.push({
      url,
      method: "get",
      handlers
    })
  }

  post(url,...handlers) {
    this.push({
      url,
      method: "post",
      handlers
    })
  }

  push(routerInfo) {
    this.routerMapping.push(routerInfo)
  }

  listen() {
    const server = HTTP.createServer((req,res) => {
      const method = req.method.toLowerCase()
      const { pathname } = URL.parse(req.url)
      const key = `${method}:${pathname}`
      const router = this.routerMapping.get(key)
      if(router) {
        return router.dispatch(req,res)
      } else {
        res.end(`Cannot ${key}`)
        return
      }
    })
    server.listen(...arguments)
  }

}

module.exports = Appliction