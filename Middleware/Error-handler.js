const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    //create a default error
    let customError = {
        statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "something went worng try again later"
    }

    if (err.name === "VaildationError") {
        customError.msg = object.values(err.errors)
            .map((item) => item.message)
            .join(', ')
        customError.statusCode = 400
    }
    //this handles dup errors
    if (err.code && err.eode === 11000) {
        customError.msg = `entered user ${Object.keys(
            err.keyValue
        )}, already exists: ${Object.values(
            err.keyValue
        )},please enter a new ${object.keys(err.keyValue)}`;
        customError.statusCode = 400
    }
    //this handles vaildation errors
    if(err.name === 'CastError'){
        customError.msg = `no item found with id: ${err.value}`
        customError.statusCode = 400
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandler