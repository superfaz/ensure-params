'use strict'

/**
 * Raised when a parameter doesn't fullfil the expected requirements.
 */
class ParameterError extends Error {
  /**
   * Initializes a new instance of the {@link ParameterError} class.
   *
   * @param {string} message The details about the reason of the error.
   */
  constructor (message) {
    super(message)

    if (!message) {
      throw new Error('The parameter \'message\' is required')
    }

    this.message = message
    this.name = 'ParameterError'

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParameterError)
    }
  }
}

module.exports = ParameterError
