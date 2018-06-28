var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var log=req.session.isLogged;
	var name=req.session.username;
	var admin = false;
	var vm = {
		isAdmin: admin,
		layout: false,
		isLogged: log,
		showError: false,
		username: name
	};
  res.render('index', vm);
});

module.exports = router;
