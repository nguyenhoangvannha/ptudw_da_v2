var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var cartRouter = require('./routes/cart');
var productRouter = require('./routes/product');
var shopRouter = require('./routes/shop');
var searchRouter = require('./routes/search');
var GovernanceRouter = require('./routes/Governance');
var addRouter = require('./routes/add');
//////////////Nhân///////////////////////////
var signlogRouter = require('./routes/signlog');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
///////////////////Nhân////////////////////////////////////

var app = express();

var port = process.env.PORT || 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//////////////////////////Nhân///////////////////////
var sessionStore = new MySQLStore({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'linhkienfitdb',
	createDatabaseTable: true,
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
});

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));
///////////////////////////Nhân//////////////////////////

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
app.use('/cart', cartRouter);
app.use('/product', productRouter);
app.use('/shop', shopRouter);
app.use('/search',searchRouter);
app.use('/Governance',GovernanceRouter);
app.use('/add',addRouter);
app.use('/signlog', signlogRouter);
app.listen(port, function () {
  console.log('App listeing on port', port);
});