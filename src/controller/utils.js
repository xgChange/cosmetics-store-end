/**
 * @description utils controller
 */

const { uploadFileSizeFailInfo } = require('../model/errInfo')
const { ErrorModel, SuccessModel } = require('../model/resModel')
const fse = require('fs-extra')
const path = require('path')

// 如果没有uploadFiles文件夹
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
fse.pathExists(DIST_FOLDER_PATH).then((res) => {
  if (!res) {
    fse.ensureDir(DIST_FOLDER_PATH).then((r) => {
      console.log('创建uploadFiles文件夹完毕')
    })
  }
})

// 文件的最大体积 5M
const MAX_SIZE = 5 * 1024 * 1024 * 1024

async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // 移动到新文件夹下
  const fileName = Date.now() + '.' + name
  const newFilePath = path.join(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, newFilePath)

  // 返回链接
  return new SuccessModel({
    url: '/' + fileName,
    name,
  })
}

module.exports = {
  saveFile,
}
