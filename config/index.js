var config = require("./config.json");
module.exports = {
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
    tbl_sanpham: config.tbl_sanpham,
    tbl_nguoidung: config.tbl_nguoidung,
    tbl_giohang: config.tbl_giohang
}