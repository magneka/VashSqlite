const asyncSqlite = require('./asyncSqlite.js');

exports.seed = async function () {
 
    const createQuery = "CREATE TABLE IF NOT EXISTS Customers (id INTEGER PRIMARY KEY, firstname Varchar(50), lastname Varchar(50))";
    const deleteAllQuery = "DELETE FROM Customers";
    let initialUsers = [ 
        { "firstName": "Maria",  "lastName": "Anders" },
        { "firstName": "Ana",  "lastName": "Trujillo" },
        { "firstName": "Antonio",  "lastName": "Moreno" },
        { "firstName": "Thomas",  "lastName": "Hardy" },
        { "firstName": "Christina",  "lastName": "Berglund" }
    ];

    asyncSqlite.run(createQuery);
    asyncSqlite.run(deleteAllQuery);
    
    for (user of initialUsers) {
        console.log(user);
        await asyncSqlite.run ("INSERT INTO Customers (firstname, lastname) values (?, ?)", [user.firstName, user.lastName])
    }
};

exports.open = async function (dbFile) {
    let result = await asyncSqlite.open(dbFile);
    return result;
}

exports.getAllCustomers = async function() {
    let rows = await asyncSqlite.all("SELECT * FROM customers", []);
    return ({'customers': rows });
}

exports.getCustomerById = async function(id) {
    let row = await asyncSqlite.getSingle ("SELECT * FROM customers where id = ?", [id]);
    console.log(`Row: ${row}`)
    return (row)
};

exports.createCustomer = async function(params) {
    let result = await asyncSqlite.run (
        "INSERT INTO Customers (firstname, lastname) values (?, ?)", 
        [params.firstname, params.lastname]);
    return result;
};

exports.updateCustomer = async function(params) {
    let result = await asyncSqlite.run (
        "UPDATE Customers set firstname = ?, lastname = ? where id = ?", 
        [params.firstname,  params.lastname, params.id]);
    return result;
};

exports.deleteCustomer = async function(params) {
    let result = await asyncSqlite.run (
        "DELETE from Customers where id = ?", 
        [params.id]);
    return result;
};