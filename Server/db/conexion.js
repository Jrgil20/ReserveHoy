// db/conexion.js
const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: "localhost",
    database: "reservehoy",
    user:"root",
    password: ""
});

conexion.connect(error => {
    if (error) throw error;
    console.log("Conexión exitosa a la base de datos");
});

module.exports = conexion;