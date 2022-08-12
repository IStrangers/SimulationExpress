const Router = require("./router")
const URL = require("url")

class RouterMapping {

  constructor() {
    this.useRouters = []
    this.routerMapping = new Map()
  }

  get(key) {
    return this.routerMapping.get(key)
  }

  push(routerInfo) {
    const { method,url,handlers } = routerInfo
    const key = `${method}:${url}`
    const router = new Router(method,url,handlers)
    if(method === "use") {
      this.useRouters.push(router)
    } else {
      this.routerMapping.set(key,router)
    }
  }

  dispatch(req,res) {
    const method = req.method.toLowerCase()
    const { pathname } = URL.parse(req.url)
    this.useRouters.filter(router => {
      const { url } = router
      if((url instanceof RegExp && url.test(url)) || url === pathname) {
        return true
      }
      return false
    }).forEach(router => router.dispatch(req,res))
    const key = `${method}:${pathname}`
    const router = this.routerMapping.get(key)
    if(router) {
      return router.dispatch(req,res)
    } else {
      res.end(`Cannot ${key}`)
      return
    }
  }
  
}

module.exports = RouterMapping