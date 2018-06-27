var express = require('express');
var router = express.Router();


var bodyParser = require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended : false});
var accountRepo = require('../repos/accountRepo');

SHA256 = require('crypto-js/sha256'),
moment = require('moment');

/* GET signin page. */
router.get('/', (req, res) => {
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
	res.render('SignLog/signlog', vm);
});

router.get('/success',(req,res) =>{
	res.redirect('/');
});

router.post('/success', urlencodedParser, (req, res) => {
	var log=req.session.isLogged;
	var name=req.session.username;
	var admin = false;
	var vm = {
		isAdmin: admin,
		layout: true,
		isLogged: log,
		username: name
	};
	var user = {
		username: req.body.username,
		password: SHA256(req.body.rawPass).toString(),
		name: req.body.name,
		email: req.body.email,
		permission: 0
	};
	accountRepo.add(user).then(value => {
		res.render('SignLog/RegSuccessful', vm);
	});
});

router.post('/', urlencodedParser, (req, res) => {
	var user = {
		username: req.body.username,
		password: SHA256(req.body.rawPass).toString()
	};
	accountRepo.login(user).then(rows => {
		if (rows.length > 0) {
            // user = rows[0];

            req.session.isLogged = true;
            req.session.username = user.username;
            res.redirect('/');

        } else {
        	var log=req.session.isLogged;
        	var name=req.session.username;
        	var admin = false;
        	var vm = {
        		isAdmin: admin,
        		layout: false,
        		showError: true,
        		errorMsg: 'Login failed',
        		isLogged: log,
        		username: name
        	};
	res.render('SignLog/signlog', vm);
        }
    });
});

router.get('/logout', urlencodedParser, (req, res) => {

	req.session.isLogged = false;
	req.session.username = null;
	res.redirect('/signlog');
});

router.get('/profile/:id', (req, res) => {
    var id = req.params['id']; 
    accountRepo.load(id).then(rows => {
        var log=req.session.isLogged;
        var name=req.session.username;
        var admin = false;
        if(name==='ThienNhan') admin = true;
        var vm = {
            isAdmin: admin,
            layout: false,
            nguoidung: rows,
            isLogged: log,
            username: name
        };
        res.render('SignLog/profile', vm);
        
    });
});

router.get('/profile/edit',(req,res) =>{
	res.redirect('/');
});

router.post('/profile/edit', urlencodedParser, (req, res) => {
	var log=req.session.isLogged;
	var name=req.session.username;
	var admin = false;
	var vm = {
		isAdmin: admin,
		layout: true,
		isLogged: log,
		username: name
	};
	var user = {
		username: req.body.username,
		linkanh: req.body.linkanh,
		address: req.body.address,
		sdt: req.body.sdt,
		name: req.body.name,
		email: req.body.email,
		permission: 0
	};
	accountRepo.update(user).then(value => {
		res.redirect('/signlog/profile/'+name);
	});
});

module.exports = router;
