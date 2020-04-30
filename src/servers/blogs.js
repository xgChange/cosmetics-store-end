/**
 * @description blogs相关
 */
const { Blogs, User } = require('../db/model/index')
var Sequelize = require('sequelize')
var Op = Sequelize.Op

async function createBlogsInfo({ content, picture, user_id, type }) {
  const info = await Blogs.create({ content, picture, user_id, type })
  return info
}

async function getAllBlogsByIndex({ pageSize = 5, pageIndex, user_id }) {
  const whereOp = {}
  if (user_id) {
    whereOp.id = user_id
  }
  // 假如数据库没有数据，则result.rows里面是空数组,所以blogData返回的也是空
  const result = await Blogs.findAndCountAll({
    limit: pageSize,
    offset: (pageIndex - 1) * pageSize,
    where: {
      type: 1,
    },
    include: [
      {
        model: User,
        attributes: ['username', 'nickname', 'picture'],
        where: whereOp,
      },
    ],
    order: [['id', 'desc']],
  })

  const blogData = result.rows.map((item) => {
    const blog = item.dataValues
    blog.t_user = item.t_user.dataValues
    return blog
  })
  return {
    blogData,
    count: result.count,
  }
}

module.exports = {
  createBlogsInfo,
  getAllBlogsByIndex,
}
