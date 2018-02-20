class ParameterError extends Error {
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
