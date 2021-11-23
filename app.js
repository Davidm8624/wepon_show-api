//Enviroment setup
require("dotenv").config();
require("express-async-errors");

//app cores
const express = require("express");
const app = express();
const connectDB = require("./DB/connect");

//routes
const { Auth, Weapons } = require("./Routes");

//middleware
const middleAuth = require('./Middleware/Auth')
const errorMiddlewere = require("./Middleware/Errorhandler");
const notFoundMiddlewere = require("./Middleware/Notfound")

//swaggerUI
const swaggerUI = require("swagger-ui-express")
// const YAML= require("yamljs")
// const swaggerDocs = YAML.load("./swagger.yaml")

//sercurity
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//rateLimiter just limits the amount of alls that an ip can make to your api
.set('trust proxy', 1)
.use(rateLimiter({
  windowMs: 1000 * 60 *15, //15 min
  max: 100
}))
.use([express.urlencoded({extended: false}), express.json()])
//general securty blanket
.use(helmet())
//pervent cores error
.use(cors())
//user sanitation, this pervents SOME user based hacking
.use(xss())

.get('/', (req, res)=>{
  res.send('<h1>Job API</h1><a href="/api-docs">Documation<a>')
})
//
// .use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

  .use("/api/v1/weapon", middleAuth, Weapons)
  .use("/api/v1/auth", Auth)
// .use(errorMiddlewere)
.use(notFoundMiddlewere)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Variable Declarations
const port = process.env.PORT || 3000;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server @ ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
