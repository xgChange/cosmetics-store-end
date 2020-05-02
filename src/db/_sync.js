/**
 * @description 更新数据库
 */

const seq = require('./seq')
require('./model/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('authen ok')
})

// 1. 只有当数据库不存在与模型同名的数据表时才会同步 seq.sync()

// 2. 修改同名数据表结构，以适用模型 seq.sync({alter: true})

// 3. 删除同名数据表后同步数据，会导致数据丢失 seq.sync({force: true})

// 执行同步 {force: true} 每次同步的时候都把表清空，重建 if exits
seq.sync({ force: true }).then(() => {
  process.exit()
})
