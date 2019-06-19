const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');


const sequelize = require('./model').sequelize;
const mongo = require('./model').mongo;

const config = require('./config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// load PostgreSQL

sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL has been established successfully');
  })
  .catch((err) => {
    console.error('PostgreSQL unable to connect ', err);
  })

// load Mongo DB
mongo.on('error', () => console.error('Mongo connection error!'));
mongo.once('open', () => console.log('Mongo connecting!'));


// Set Session 
app.use(session({
  secret: config.secret , // as a secret key to sign session id  for verify signature of session id 
  // store:, // defaukt is MemorySpace
  saveUninitialized: false, // don't create session until something store 
  resave: false, // not save session to sessnio store if no modify
  autoRemove: 'interval', 
  autoRemoveInterval: 10, // after 10 minutes auto remove session
  cookie: {maxAge: 7**24*60*60**1000} // set session id store into cookie that default path: "/" , httpOnly: true, secure: false 
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json()); // express invoke body parser for parser request-body 
app.use(express.urlencoded({ extended: false })); // express invoke body parser  for parser request-body 


app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
