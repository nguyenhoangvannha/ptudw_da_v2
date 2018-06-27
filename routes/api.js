var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var configValues = require("../config/index");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

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
        }
    });
    // for( : vonfg){
    //   s1 (sp.ten + sp.mota).trim().tolowercase(); Nokia 1
    // s2 key.trim.tolowercase; nokia1
    //s1.containt s2;
    //}
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
function searchProducts(res, KEY) {
    connection.query(`SELECT * FROM ${configValues.tbl_sanpham}`, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(404).send([]);
        } else {
            var kq = [];
            result.forEach(function (e) {
                var str = e.TEN +e.NHASANXUAT + e.XUATSU + e.LOAI;
                KEY = KEY.trim().toLowerCase();
                str = str.trim().toLowerCase();
                if(str.includes(KEY)){
                    kq.push(e);
                }
            });
            res.send(kq);
        }
    });
}

function getSameTypeProducts(res, LOAI) {
    connection.query(`SELECT * FROM ${configValues.tbl_sanpham} WHERE LOAI = '${LOAI}'`, function (err, result, fields) {
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
function postViewProduct(res, ID) {
    var SOLUOTXEM;
    connection.query(`SELECT * FROM ${configValues.tbl_sanpham}  WHERE ID=${ID}`, function (err, result, fields) {
        if (err) {
        } else {
            SOLUOTXEM = result[0].SOLUOTXEM + 1;
            var sql = `UPDATE ${configValues.tbl_sanpham} SET SOLUOTXEM = ${SOLUOTXEM} WHERE ID = ${ID}`;
            connection.query(sql, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    res.status(404).send([]);
                } else {
                    res.send(result);
                }
            });
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
router.get('/search/:KEY', function (req, res, next) {
    searchProducts(res, req.params.KEY);
})
router.get('/products/sameTo/:LOAI', function (req, res, next) {
    getSameTypeProducts(res, req.params.LOAI);
})
router.post('/view', jsonParser, function (req, res) {
    //console.log('BODY',req.body.productID);
    postViewProduct(res, req.body.productID);
})



module.exports = router;