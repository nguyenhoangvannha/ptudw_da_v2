var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
     var log=req.session.isLogged;
              var name=req.session.username;
              var admin = false;
              if(name==='ThienNhan') admin = true;
              if(admin===false) res.redirect('/');
    res.render('Governance');
});

module.exports = router;