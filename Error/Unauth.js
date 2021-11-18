const customAPIError = require('./Custom-api-error')
const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('./Custom-api-error')

class UnauthError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
      }
}

module.exports = UnauthError