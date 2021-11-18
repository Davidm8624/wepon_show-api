const jwt = require('jsonwebtoken')
require('dotenv').config()


const { UnauthError } = require('../Error')


const auth = async (req, res, next) => {
    //check the header
    const authheader = req.headers.authorization
    if (!authheader || !authheader.startsWith("Bearer")) {
        throw new UnauthError("not authized to access this part of the site")
    }
    
    const token = authheader.split(' ')[1]
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        console.log(payload);
        req.user = { userID: payload.userID, name: payload.name }
        next()
    } catch (err) {
        throw new UnauthError('authorization invlid');
    }
}


module.exports = auth