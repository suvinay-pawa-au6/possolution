const express = require("express")
require('./db');
var bodyParser = require('body-parser')
const app = express();
const offers = require('./api/routes/offer');
// const inventory = require('./api/routes/inventory')
const products = require('./api/routes/Product')
// const Login = require('./api/routes/login')
// const Register = require('./api/routes/register')
// const Dashboard = require('./api/routes/dashoard')
// const Setting = require('./api/routes/setting')
// const Statboard = require('./api/routes/statBoard')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/offers",offers);
// app.use('/inventory',inventory)
app.use("/products",products)
// app.use("/login",Login)
// app.use('/Register',Register)
// app.use('/dashboard',Dashboard)
// app.use('/setting',Setting)
// app.use('/statboard',Statboard)

module.exports= app;
