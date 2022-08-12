const HTTP = require("http")

const { RouterMapping } = require("./router")
const methods = require("methods")

class Appliction {

  constructor() {
    this.routerMapping = new RouterMapping()
  }

  pushRouter(routerInfo) {
    this.routerMapping.push(routerInfo)
  }

  listen() {
    console.log(this.routerMapping)
    const server = HTTP.createServer((req,res) => {
      this.routerMapping.dispatch(req,res)
    })
    server.listen(...arguments)
  }

}

methods.push("use")
methods.forEach(method => {
  Appliction.prototype[method] = function(url,...handlers) {
    this.pushRouter({
      url,
      method: method,
      handlers
    })
  }
})

module.exports = Appliction