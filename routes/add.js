var express = require('express');
var router = express.Router();

var productRepo = require('../repos/productRepo');


var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
var upload = multer({ storage: storage }).single('hinh');


router.get('/', function (req, res) {
    res.render('add');
});
router.post('/',urlencodedParser, function(req,res){
    upload(req, res, function (err) {
        if (err) {
          res.send("LOI");
        }else{
          if(req.file == undefined){
            res.send("Ban chua chon file");
          }else{
            
            productRepo.add(req.body).then(value => {
              //var log=req.session.isLogged;
              //var name=req.session.username;
              //var admin = false;
              //if(name==='ThienNhan') admin = true;
              //var vm = {
                  //isAdmin: admin,
                  //layout: false,
                  //showAlert: true,
                 // isLogged: log,
                 // username: name
             // };
              //res.render('add');
          //}).catch(err => {
              //res.end('fail');
               res.redirect("/Governance");
          });
          }
            
        }
    
      })
    
});
module.exports = router;