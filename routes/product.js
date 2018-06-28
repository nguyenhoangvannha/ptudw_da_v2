var express = require('express');
var router = express.Router();

router.get('/:ID', function (req, res, next) {
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
    res.render('product', vm);
});
router.get('/:COMPANY/:ID', function (req, res, next) {
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
    res.render('product', vm);
});
module.exports = router;