
class Router {

  constructor() {
    this.routerMapping = new Map()
  }

  get(key) {
    return this.routerMapping.get(key)
  }

  push(routerInfo) {
    const { method,url } = routerInfo
    const key = `${method}:${url}`
    this.routerMapping.set(key,routerInfo)
  }

}

module.exports = Router