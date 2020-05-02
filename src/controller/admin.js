const {
  getAllUsersInfo,
  updateInfoByUser,
  deleteBlogInfo,
  findCommentInfo,
  getAllGoodsInfo,
  getGoodsTypeInfo,
} = require('../servers/admin')
const { getAllBlogsByIndex } = require('../servers/blogs')
const { deleteGoodsInfo } = require('../servers/goods')
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { deleteBlogFailed, changeInfoFailed } = require('../model/errInfo')
const { getTree } = require('../utils/utils')

async function getAllUsers({ pageIndex = 1, pageSize = 10 }) {
  const result = await getAllUsersInfo({
    pageIndex,
    pageSize,
  })
  return new SuccessModel({
    users: result.users,
    count: result.count,
    pageSize,
  })
}

async function updateInfo({ user_id, role }) {
  const result = await updateInfoByUser({ user_id, role })
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailed)
}

async function findAllBlog({ pageIndex = 1, pageSize = 10 }) {
  const result = await getAllBlogsByIndex({
    pageIndex,
    pageSize,
  })
  return new SuccessModel({
    blogData: result.blogData,
    count: result.count,
    pageSize,
  })
}

async function deleteBlog(id) {
  try {
    await deleteBlogInfo(id)
    await findCommentInfo(id)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(deleteBlogFailed)
  }
}

async function getAllGoods({ pageIndex = 1, pageSize = 10 }) {
  const info = await getAllGoodsInfo({ pageIndex, pageSize })
  return new SuccessModel({
    goodsList: info.goodsList,
    count: info.count,
    pageSize,
  })
}

async function getGoodsType() {
  const info = await getGoodsTypeInfo()
  let result = getTree(info, 0)
  return new SuccessModel(result)
}

async function deleteGoodsById(id) {
  try {
    await deleteGoodsInfo(id)
    return new SuccessModel()
  } catch (error) {
    return new ErrorModel(deleteBlogFailed)
  }
}

module.exports = {
  getAllUsers,
  updateInfo,
  findAllBlog,
  deleteBlog,
  getAllGoods,
  getGoodsType,
  deleteGoodsById,
}
