/**
 * @description 数据模型的入口文件
 */

const User = require('./User')
const Goods = require('./Goods')
const Blogs = require('./Blogs')
const GoodsType = require('./GoodsType')

// 设置外键

// blogs user_id
Blogs.belongsTo(User, {
  foreignKey: 'user_id',
})
User.hasMany(Blogs, {
  foreignKey: 'user_id',
})

// goods type_id
Goods.belongsTo(GoodsType, {
  foreignKey: 'type_id',
})
GoodsType.hasMany(Goods, {
  foreignKey: 'type_id',
})

//

module.exports = {
  User,
  Goods,
  Blogs,
  GoodsType,
}
