
const mysql= require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "woot",
    database: "employees",

});

// connection.connect(function (err){
//     if (err) throw err;
//     console.log("connected as id" + connection.threadId);
// }).promise();

module.exports =  connection;