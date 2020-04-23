/**
 * 初始化
 * 自动加载路由 require-directory, 环境变量
 */
const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static init(app) {
    InitManager.app = app
    InitManager.initLoadRouters('api')
    InitManager.loadEnv()
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

  static loadEnv() {
    const EnvPath = `${process.cwd()}/src/config/env.js`
    const Env = require(EnvPath)
    global.Env = Env
  }
}

module.exports = InitManager
