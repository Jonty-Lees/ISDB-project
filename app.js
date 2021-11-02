const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require("mongoose");
const passport = require("passport");
const path = require('path');
require('dotenv').config();


// import auth middleware
require('./middleware/auth');


// import router(s)
const authRoute = require('./routes/auth');
const indexRouter = require('./routes/index');
const musicRoute = require('./routes/music');


// import swagger ui, swagger.json
const swaggerUi = require('swagger-ui-express');
const swaggerDocumentation = require('./swagger.json')

// access hidden mongodb address
const mongodb_address = process.env.MONGO_DB;

// mongoose.connect("mongodb://127.0.0.1/ISDB_db")
mongoose.connect(mongodb_address)

// app.use
const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));


// utilise router(s)
app.use("/api", authRoute);
app.use("/api", musicRoute);
app.use('/', indexRouter);


// ask swagger-ui to render / serve documentation (swagger.json) on an endpoint
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation)); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





module.exports = app;
