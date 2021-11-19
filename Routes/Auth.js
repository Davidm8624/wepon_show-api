const express = require("express");
const router = express.Router()

const { Register, Login } = require("../Controllers/Auth")

// const authMiddlewere = require('../Middleware/Auth')

router.route('/register').post(Register)
router.route('/login').post(Login)

module.exports = router