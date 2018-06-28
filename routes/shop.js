var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('shop');
});
router.get('/:company', function (req, res, next) {
    res.render('shop');
});
module.exports = router;