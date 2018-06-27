var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.render('search');
});
router.get('/:KEY', function (req, res, next) {
    res.render('product');
});
module.exports = router;