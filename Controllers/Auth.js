const { BadRequestError, NotFound, UnauthError } = require("../Error/Index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User Schema")
const bcrypt = require("bcrypt")


const Register = async (req, res) => {
  // encrypting is storing your data behind a firewall
  //hashing which scambles your data into a string of uniform size
  // const {name, password, email} = req.body
  // console.log(password);
  // //salt - a random bit combination (1101010) that is included in the hash
  // //the salt is then added to the hash so the verifier can check even with randomness

  // //pepper - adds a single letter [a-zA-Z] to the end of your
  // const salt = await bcrypt.genSalt(10)
  // const hashpass = await bcrypt.hash(password, salt)
  // console.log(hashpass);

  //   const newUser = await User.create({...req.body, password: hashpass})

  const newUser = await User.create(req.body)
  const token = newUser.createJWT()
  res.json({user: {name:newUser.name}, token})
  // res.json(req.body)

  // res.json({ status: 200, msg: "succuss- user created" });
}

const Login = async (req, res) => {
const {email, password} = req.body
if(!email || !password){
  throw new BadRequestError("please provide a email AND pasword")
}

const userLogin = await User.findOne({email})

if(!userLogin){
  throw new UnauthError('Invailid Creafentials')
}

const isPasswordCorrect = await userLogin.comparePassword(password)

if(!isPasswordCorrect){
  throw new UnauthError('Invailid Creafentials')
}

const token = userLogin.createJWT()
res.json({user: {name:userLogin.name}, token})
}

module.exports = { Register, Login };