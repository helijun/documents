var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  resourceUrl: '"https://www.helijun.com.cn/"'
})
