'use strict'

const ParameterError = require('./parametererror')

class Checker {
  /**
   * Initializes a new instance of the {Checker} class.
   *
   * @param {string} paramName The name of the checked parameter.
   * @param {*} paramValue The value associated with the parameter, if any.
   */
  constructor (paramName, paramValue) {
    if (!paramName) {
      throw new ParameterError('The parameter \'paramName\' is required')
    } else if (typeof paramName !== 'string') {
      throw new ParameterError('The parameter \'paramName\' should be a string')
    }

    this.paramName = paramName
    this.paramValue = paramValue
    this.paramType = typeof paramValue
  }

  isDefined () {
    if (this.paramValue === undefined) {
      this.raiseError('should be defined')
    }
  }

  isAssigned () {
    if (this.paramValue === undefined || this.paramValue === null) {
      this.raiseError('should be assigned')
    }
  }

  isRequired () {
    if (!this.paramValue) {
      this.raiseError('is required')
    }
  }

  /**
   * Raises the error and build the error message.
   *
   * @private
   * @param {string} endMessage The end of the error message.
   */
  raiseError (endMessage) {
    throw new ParameterError(`The parameter '${this.paramName}' ${endMessage}`)
  }
}

module.exports = Checker
