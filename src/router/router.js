class Router {

  constructor(method,url,handlers,restParamKeys = []) {
    this.method = method
    this.url = url
    this.handlers = handlers
    this.restParamKeys = restParamKeys
  }

  dispatch(req,res) {
    let currentHandlerIndex = 0
    const firstHandler = this.handlers[0]
    const next = () => {
      const index = ++currentHandlerIndex
      if(index >= this.handlers.length) {
        res.end()
        return
      }
      return this.handlers[index](req,res,next)
    }
    return firstHandler(req,res,next)
  }

}

module.exports = Router