/**
 * @description 文章模型
 */
const Sequelize = require('sequelize')

const seq = require('../seq')

// Goods
const Blogs = seq.define('t_blogs', {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '文章内容',
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '发表人',
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '文章类型',
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '文章图片',
  },
})

module.exports = Blogs
