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

  getUseRoutersByPathName(pathname) {
    const useRouters = this.useRouters.filter(router => {
      const { url } = router
      if((url instanceof RegExp && url.test(pathname)) || url === pathname) {
        return true
      }
      return false
    })
    return useRouters
  }

  dispatch(req,res) {
    const method = req.method.toLowerCase()
    const { pathname,query } = URL.parse(req.url)
    const key = `${method}:${pathname}`
    const router = this.routerMapping.get(key)
    if(router) {
      toParams(req,query)
      const useRouters = this.getUseRoutersByPathName(pathname)
      if(useRouters && useRouters.length > 0) {
        const handlers = [];
        for(let i = 0; i < useRouters.length; i++) {
          handlers.push(...useRouters[i].handlers)
        }
        handlers.push(...router.handlers)
        useRouters[0].dispatch.call({handlers},req,res)
      } else {
        return router.dispatch(req,res)
      }
    } else {
      res.end(`Cannot ${key}`)
      return
    }
  }
  
}

function toParams(req,query) {
  req.params = {}
  query && query.split("&").forEach(param => {
    const kv = param.split("=")
    req.params[kv[0]] = kv[1]
  })
}

module.exports = RouterMapping