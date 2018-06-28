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
    res.render('search',vm);
});
router.get('/:KEY', function (req, res, next) {
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
    res.render('search',vm);
});
module.exports = router;