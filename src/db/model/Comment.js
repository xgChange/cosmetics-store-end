/**
 * @description 评论表
 */
const Sequelize = require('sequelize')

const seq = require('../seq')

const Comment = seq.define('t_comment', {
  subject_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '基于主题去评论(blogs_id, reviews_id)',
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '谁发的评论',
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '评论的类型(1. 普通帖子评论 2. 基于商品的评价)',
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '评论的内容',
  },
})

module.exports = Comment
