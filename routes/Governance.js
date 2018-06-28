var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.render('Governance');
});

router.get('Governance/delete/:ID',function(req, res){
    res.send(req.params.ID);


});
module.exports = router;