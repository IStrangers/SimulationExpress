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
    if(method === "use") {
      this.useRouters.push(new Router(method,url,handlers))
    } else {
      const [path,restParamKeys] = resolvePathName(url)
      const key = `${method}:${path}`
      this.routerMapping.set(key,new Router(method,url,handlers,restParamKeys))
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
    let { pathname,query } = URL.parse(req.url)
    pathname = decodeURI(pathname)
    const [path,restValues] = resolvePathName(pathname)
    const key = `${method}:${path}`
    const router = this.routerMapping.get(key)
    if(router) {
      restParamsToParams(req,router.restParamKeys,restValues)
      queryToParams(req,query)
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

function resolvePathName(pathname) {
  const restValues = []
  const path = pathname.replace(/\{((?!\/).)*\}/g,function(param) {
    restValues.push(param.slice(1,param.length - 1))
    return ""
  }).replace("//","/")
  return [path,restValues]
}

function restParamsToParams(req,restParamKeys,restValues) {
  if(!req.params) {
    req.params = {}
  }
  for(let i = 0; i < restParamKeys.length; i++) {
    const paramName = restParamKeys[i]
    const paramValue = i < restValues.length ? restValues[i] : null
    req.params[paramName] = paramValue
  }
}

function queryToParams(req,query) {
  if(!req.params) {
    req.params = {}
  }
  query && query.split("&").forEach(param => {
    const kv = param.split("=")
    req.params[kv[0]] = kv[1]
  })
}

module.exports = RouterMapping