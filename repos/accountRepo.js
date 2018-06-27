var db = require('../fn/db');

exports.add = user => {
    var sql = `insert into nguoidung (EMAIL, USERNAME, PASSWORD, PERMISSION) values('${user.email}', '${user.username}', '${user.password}', 0)`;
    return db.save(sql);
}

exports.login = user => {
    var sql = `select * from nguoidung where USERNAME = '${user.username}' and PASSWORD = '${user.password}'`;
    return db.load(sql);
}

exports.load = user=> {
    var sql = `select * from nguoidung where USERNAME = '${user}'`;
    return db.load(sql);
}

exports.update = user => {
	var sql = `update nguoidung set LINKANH='${user.linkanh}', SODT='${user.sdt}', EMAIL='${user.email}', DIACHI='${user.address}' where USERNAME='${user.username}'`;
    return db.save(sql);
}