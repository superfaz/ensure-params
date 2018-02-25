'use strict'

const ParameterError = require('./parametererror')

/**
 * Defines the checks that can be executed for a specific parameter.
 *
 * All methods will return the current {@link Checker} instance (`this`) to allow function chain like:
 * ```
 * var checker = new Checker('param', 'test')
 * checker.isRequired().isString()
 * ```
 */
class Checker {
  /**
   * Initializes a new instance of the {@link Checker} class.
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

  /**
   * Ensures that the parameter is not `undefined`.
   *
   * @returns {Checker} the current instance of the checker.
   */
  isDefined () {
    if (this.paramValue === undefined) {
      this.raiseError('should be defined')
    }

    return this
  }

  /**
   * Ensures that the parameter is not `undefined` or `null`.
   *
   * @returns {Checker} the current instance of the checker.
   */
  isAssigned () {
    if (this.paramValue === undefined || this.paramValue === null) {
      this.raiseError('should be assigned')
    }

    return this
  }

  /**
   * Ensures that the parameter is not falsy.
   *
   * @returns {Checker} the current instance of the checker.
   */
  isRequired () {
    if (!this.paramValue) {
      this.raiseError('is required')
    }

    return this
  }

  /**
   * Ensures that the parameter is a string.
   *
   * @returns {Checker} the current instance of the checker.
   */
  isString () {
    if (this.paramType !== 'string') {
      this.raiseOptionalError(`is not a string (current value: ${this.paramValue})`)
    }

    return this
  }

  /**
   * Ensures that the parameter is a number.
   *
   * Infinites values are excluded by default.
   *
   * @returns {Checker} the current instance of the checker.
   */
  isNumber () {
    if (this.paramType !== 'number' ||
        this.paramValue === Number.POSITIVE_INFINITY ||
        this.paramValue === Number.NEGATIVE_INFINITY) {
      this.raiseOptionalError(`is not a number (current value: ${this.paramValue})`)
    }

    return this
  }

  /**
   * Ensures that the parameter is an integer.
   *
   * @returns {Checker} the current instance of the checker.
   */
  isInteger () {
    if (this.paramType !== 'number' || this.paramValue % 1 !== 0) {
      this.raiseOptionalError(`is not an integer (current value: ${this.paramValue})`)
    }

    return this
  }

  /**
   * Raises the error and build the error message, if the value of the parameter
   * is different from `undefined` and `null`.
   *
   * @private
   * @param {string} endMessage The end of the error message.
   */
  raiseOptionalError (endMessage) {
    if (this.paramValue !== undefined && this.paramValue !== null) {
      throw new ParameterError(`The parameter '${this.paramName}' ${endMessage}`)
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
