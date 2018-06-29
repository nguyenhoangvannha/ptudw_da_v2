var db = require('../fn/db');
var configValues = require("../config/index");


exports.add = product => {
    var sql = `insert into ${configValues.tbl_sanpham} (ID, TEN, HINHANH, GIABAN, SOLUOTXEM, SOLUOTBAN, MOTA, LOAI, NHASANXUAT, XUATSU) values('${product.id}', '${product.ten}', '${product.hinh}','${product.gia}','${product.soluotxem}','${product.soluotban}','${product.mota}','${product.loai}','${product.nhasanxuat}','${product.xuatxu}' )`;
    return db.save(sql);
}

exports.edit = product => {
	var sql = `update ${configValues.tbl_sanpham} set TEN='${product.ten}', HINHANH='${product.hinh}', GIABAN='${product.gia}',SOLUOTXEM='${product.soluotxem}',SOLUOTBAN='${product.soluotban}',MOTA='${product.mota}',LOAI='${product.loai}',NHASANXUAT='${product.nhasanxuat}',XUATSU='${product.xuatxu}'  where ID='${product.id}'`;
    return db.save(sql);
}