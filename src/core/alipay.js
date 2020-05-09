const fs = require('fs')
const path = require('path')
const AlipaySDK = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default
let privateKey = path.join(__dirname, '..', 'utils/pem/private-key.pem')

const alipay = new AlipaySDK({
  appId: '2016102200734940',
  privateKey: fs.readFileSync(privateKey, 'ascii'),
  gateway: 'https://openapi.alipaydev.com/gateway.do', // 沙箱环境的请求网关与正式环境不一样，需要在此更改，如果是使用正式环境则去掉此处的设置
  timeout: 10000,
})

const formData = new AlipayFormData()

module.exports = { alipay, formData }
