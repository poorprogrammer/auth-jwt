const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

const tokenVerifier = require("./middleware/token.verifier"); 
const routes = require('./routes/index');
let users = require('./routes/users');
const auth = require("./routes/auth")

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use("/ext/auth", auth);
app.use("/ext/users", tokenVerifier, users);
app.use("/", routes);

module.exports = app;
