var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var dbConfig = "./demodb03.db";
var asyncSqlite = require('./datalayer/asyncSqlite');
asyncSqlite.open (dbConfig);

var customerRepostitoryAs = require('./datalayer/customerRepository');
customerRepostitoryAs.seed();

const customerRouter = require('./controllers/customerController')();
const indexrRouter = require('./controllers/indexController')();

app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: false
}));

app.set("view engine","vash")

app.use('/', indexrRouter);
app.use('/customers', customerRouter);


var server = app.listen(5000, function () {
    console.log('Node server is running, point your browser to http://localhost:5000');
});
