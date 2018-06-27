var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var productRouter = require('./routes/product');
var shopRouter = require('./routes/shop');
var searchRouter = require('./routes/search');
var SingLogRouter = require('./routes/SignLog');

var app = express();

var port = process.env.PORT || 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/product', productRouter);
app.use('/shop', shopRouter);
app.use('/search',searchRouter);
app.use('/SignLog',SingLogRouter);
app.listen(port, function () {
  console.log('App listeing on port', port);
});