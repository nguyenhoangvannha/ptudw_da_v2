var express = require('express');
var router = express.Router();

router.get('/:ID', function (req, res, next) {
    res.render('product', {ID: req.params.ID});
});
router.get('/:COMPANY/:ID', function (req, res, next) {
    res.render('product', {ID: req.params.ID});
});
module.exports = router;