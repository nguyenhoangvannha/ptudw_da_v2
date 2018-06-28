var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
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
    res.render('shop', vm);
});
router.get('/:company', function (req, res, next) {
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
    res.render('shop', vm);
});
module.exports = router;