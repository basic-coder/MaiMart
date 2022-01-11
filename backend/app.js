const cookieParser = require('cookie-parser');
const express = require('express')
const app = express()
const errorMiddleware =require('./middleware/error')
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload')
const env = require('dotenv')
const path = require("path");

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileupload())


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}


//Route import 
const product = require('./routes/productRoute');
const user = require('./routes/userRoutes')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')

app.use('/api',product)
app.use('/api',user)
app.use('/api',order)
app.use('/api',payment)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware)

module.exports = app