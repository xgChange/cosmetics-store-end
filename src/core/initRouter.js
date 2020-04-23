/**
 * 自动加载路由 require-directory
 */
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static init(app) {
    InitManager.app = app
    InitManager.initLoadRouters('api')
  }

  static initLoadRouters(str) {
    const apiDirectory = `${process.cwd()}/src/routes/${str}`
    requireDirectory(module, apiDirectory, {
      visit: (obj) => {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes(), obj.allowedMethods())
        }
      },
    })
  }
}

module.exports = InitManager
