/**
 * @description blogs 相关
 */

const { createBlogsInfo, getAllBlogsByIndex } = require('../servers/blogs')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { createBlogsFailed } = require('../model/errInfo')

async function createBlogs({ content, picture, user_id, type }) {
  try {
    await createBlogsInfo({ content, picture, user_id, type })
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(createBlogsFailed)
  }
}

// 分页查询
async function getAllBlogs({ pageIndex = 1, pageSize = 5, user_id }) {
  // cache 获取数据
  const result = await getAllBlogsByIndex({
    pageIndex,
    pageSize,
    user_id,
  })
  return new SuccessModel({
    isEmpty: result.blogData.length === 0,
    count: result.count,
    blogList: result.blogData,
    pageSize,
    pageIndex,
  })
}

module.exports = {
  createBlogs,
  getAllBlogs,
}
