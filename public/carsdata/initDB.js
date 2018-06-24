var mysql = require('mysql');
var configValues = require("../../config/index");
var connection = mysql.createConnection({
    host: configValues.host,
    user: configValues.username,
    password: configValues.password,
    database: configValues.database
});
connection.connect();

function insertRow(data) {
    var nhaSanXuat = data.nhaSanXuat;
    var xuatSu = 'null';
    console.log(nhaSanXuat);
    if(nhaSanXuat == 'Audi' || nhaSanXuat == 'BMW' || nhaSanXuat == 'Mercedes-Benz'){
        xuatSu = 'Germany';
    } else if(nhaSanXuat == 'Chevrolet' || nhaSanXuat == 'Ford'){
        xuatSu = 'U.S';
    } else if(nhaSanXuat == 'Lexus' || nhaSanXuat == 'Toyota'){
        xuatSu = 'Japan'
    } else if(nhaSanXuat == 'Nissan'){
        xuatSu = 'France';
    }
    var sql = `INSERT INTO ${configValues.tbl_sanpham} (TEN, HINHANH, GIABAN, SOLUOTXEM, SOLUOTBAN`
        +`, MOTA, LOAI, NHASANXUAT, XUATSU) VALUES('${data.ten}', '${data.hinhAnh}', ${data.giaBan}`+
        `, ${data.soLuotXem}, ${data.soLuongBan}, '${data.moTa}', '${data.loai}', '${data.nhaSanXuat}'`+
        `, '${xuatSu}')`;
    connection.query(sql, function (err, result, field) {
        if (err) {
            console.log(err); 
        } else {
           //console.log('inserted ok');
        }
    });
};

var index = require("./index.json");
index.forEach(element => {
    var json = require("./" + element);
    json.forEach(element => {
        insertRow(element);
    });
});
connection.end();
