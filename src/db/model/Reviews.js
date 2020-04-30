/**
 * @description 评论表
 */
const Sequelize = require('sequelize')

const seq = require('../seq')

const Reviews = seq.define('t_reviews', {
  goods_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '商品id',
  },
  blog_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '博客id',
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '评价的分数',
  },
})

module.exports = Reviews
