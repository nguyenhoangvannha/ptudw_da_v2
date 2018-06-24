var express = require('express');
var router = express.Router();

router.get('/:ID', function (req, res, next) {
    res.render('product');
});
router.get('/:COMPANY/:ID', function (req, res, next) {
    res.render('product');
});
module.exports = router;