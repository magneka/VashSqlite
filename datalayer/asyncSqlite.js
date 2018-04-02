const sqlite3 = require('sqlite3').verbose()

var db
exports.db = db

exports.open = function (dbFile) {
    return new Promise((resolve, reject) => this.db = new sqlite3.Database(dbFile, function (err) {
        if (err) {
            reject(err);
        } else {
            resolve(`Database: ${dbFile} is opened`); 
        }
    }));
}

exports.all = function (query, parameters) {
    return new Promise((resolve, reject) => this.db.all(query, parameters, function (err, rows) {
        if (err) {
            reject(err);
        } else {
            resolve(rows); 
        }
    }));
}

exports.getSingle = function(query, parameters) {
    return new Promise ((resolve, reject) => this.db.all(query, parameters, function(err, rows) {              
        if (err) {
            reject(err);
        } else if (rows.length === 1) {
            resolve(rows[0]);      
        } else if (rows.length !== 1) {
            reject('No single record found');
        }
    }));
};

exports.run = function(query, parameters) {
    return new Promise((resolve, reject) => this.db.run (query, parameters, function(err, rows) {
        if (err) {
            reject(err);
        } else {
            // return number of rows changed
            resolve (this.changes);      
        }                                
    }));
};

