var express = require('express');
var router = express.Router();

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
            res.send("ok");
        }
    
        // Everything went fine
      })
    
});
module.exports = router;