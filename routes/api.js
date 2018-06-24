var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var configValues = require("../config/index");

var connection = mysql.createConnection({
    host: configValues.host,
    user: configValues.username,
    password: configValues.password,
    database: configValues.database
});

connection.connect();

function getProduct(res, ID) {
    connection.query(`SELECT * FROM ${configValues.tbl_sanpham}  WHERE ID=${ID}`, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(404).send(err);
        } else {
            res.send(result);
            console.log(result,ID);
        }
    });
}

function getProducts(res) {
    connection.query(`SELECT * FROM ${configValues.tbl_sanpham}`, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(404).send([]);
        } else {
            res.send(result);
        }
    });
}
function getCompanyProducts(res, company) {
    connection.query(`SELECT * FROM ${configValues.tbl_sanpham} WHERE NHASANXUAT='${company}'`, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(404).send([]);
        } else {
            res.send(result);
        }
    });
}
function getCompanies(res) {
    var sql = `SELECT NHASANXUAT FROM ${configValues.tbl_sanpham} GROUP BY NHASANXUAT HAVING count(*) > 0`;
    connection.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(404).send([]);
        } else {
            res.send(result);
        }
    });
}
router.get('/products', function (req, res, next) {
    getProducts(res);
})
router.get('/products/:COMPANY', function (req, res, next) {
    getCompanyProducts(res, req.params.COMPANY);
})
router.get('/companies', function (req, res, next) {
    getCompanies(res);
})
router.get('/product/:ID', function (req, res, next) {
    getProduct(res, req.params.ID);
})

module.exports = router;