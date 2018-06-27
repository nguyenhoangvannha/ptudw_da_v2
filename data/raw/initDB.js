var mysql = require('mysql');
var configValues = require("../config/index");
var connection = mysql.createConnection({
    host: configValues.host,
    user: configValues.username,
    password: configValues.password,
    database: configValues.database
});
connection.connect();

function insertRow(data) {
    var sql = `INSERT INTO ${configValues.tbl_sanpham} (TEN, GIA, HINHANH, MOTA, NHASANXUAT, MODEL`
        +`, CHUANGIAOTIEP, DUNGLUONG, BAOHANH) VALUES('${data.TEN}', ${data.GIA}, '${data.HINHANH}'`+
        `, '${data.MOTA}', '${data.NHASANXUAT}', '${data.MODEL}', '${data.CHUANGIAOTIEP}', '${data.DUNGLUONG}'`+
        `, '${data.BAOHANH}')`;
    connection.query(sql, function (err, result, field) {
        if (err) {
            console.log(error, sql); 
        } else {
           // console.log(result);
        }
    });
};

var index = require("./index.json");
index.forEach(element => {
    var jsonFile = element + ".json";
    var json = require("./" + jsonFile);
    json.forEach(element => {
        insertRow(element);
    });
});
connection.end();
