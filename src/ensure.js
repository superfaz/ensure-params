'use strict'

const Checker = require('./checker')

module.exports = {
  param (paramName, paramValue) {
    return new Checker(paramName, paramValue)
  }
}
