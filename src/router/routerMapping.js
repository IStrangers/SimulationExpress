const Router = require("./router")

class RouterMapping {

  constructor() {
    this.routerMapping = new Map()
  }

  get(key) {
    return this.routerMapping.get(key)
  }

  push(routerInfo) {
    const { method,url,handlers } = routerInfo
    const key = `${method}:${url}`
    const router = new Router(method,url,handlers)
    this.routerMapping.set(key,router)
  }

}

module.exports = RouterMapping