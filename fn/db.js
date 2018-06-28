var mysql = require('mysql');
var configValues = require("../config/index");
exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: configValues.host,
            user: configValues.username,
            password: configValues.password,
            database: configValues.database
        });

        cn.connect();

        cn.query(sql, function (error, rows, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }

            cn.end();
        });
    });
}
exports.save = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: configValues.host,
            user: configValues.username,
            password: configValues.password,
            database: configValues.database
        });

        cn.connect();

        cn.query(sql, function (error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}