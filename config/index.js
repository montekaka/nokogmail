// import { merge } from 'lodash'
const lodash = require('lodash');
const merge = lodash.merge;
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  // port: 3000,
  secrets: {
    jwt: 'helloworld',
    jwtExp: '100d'
  }
}
  
let envConfig = {}
  
switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev')
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing')
    break
  default:
    envConfig = require('./dev')
}

const config = merge(baseConfig, envConfig);

module.exports = config;