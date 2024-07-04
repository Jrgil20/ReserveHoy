const conexion = require('./conexion');

function seleccionarDeTabla(tabla, columnas, callback) {
    // Verificar si columnas es un array y convertirlo a cadena separada por comas, o usar * si es necesario
    const columnasSQL = Array.isArray(columnas) ? columnas.join(', ') : columnas;

    // Construir la consulta SQL dinámicamente
    const sql = `SELECT ${columnasSQL} FROM ${tabla}`;

    // Ejecutar la consulta
    conexion.query(sql, (err, result) => {
        callback(err, result);
    });
}

function seleccionarDeTablaConWHere(tabla,columnas,condiciones,callback){
    // Verificar si columnas es un array y convertirlo a cadena separada por comas, o usar * si es necesario
    const columnasSQL = Array.isArray(columnas) ? columnas.join(', ') : columnas;

    // Construir la parte WHERE de la consulta SQL
    const whereSQL = Object.keys(condiciones).map(key => `${key} = ?`).join(' AND ');

    // Construir la consulta SQL dinámicamente
    const sql = `SELECT ${columnasSQL} FROM ${tabla} WHERE ${whereSQL}`;

    conexion.query(sql, Object.values(condiciones), (err,result) => {
        callback(err,result);
    })

}

function seleccionarDeTablaConNot(tabla,columnas,condiciones,condicionesNo,callback){
    // Verificar si columnas es un array y convertirlo a cadena separada por comas, o usar * si es necesario
    const columnasSQL = Array.isArray(columnas) ? columnas.join(', ') : columnas;

    // Construir la parte WHERE de la consulta SQL
    const whereSQL = Object.keys(condiciones).map(key => `${key} = ?`).join(' AND ');

    //Construye la parte NOT de la consulta SQL
    const notSQL = Object.keys(condicionesNo).map(key => `${key} = ?`).join(' AND ');

    // Construir la consulta SQL dinámicamente
    const sql = `SELECT ${columnasSQL} FROM ${tabla} WHERE ${whereSQL} AND (NOT ${notSQL})`;

    const valores = [...Object.values(condiciones), ...Object.values(condicionesNo)];

    conexion.query(sql, valores,(err,result) => {
        callback(err,result);
    })
}

function insertarEnTabla(tabla, datos, callback) {
    // Construir la consulta SQL dinámicamente
    const columnas = Object.keys(datos).join(', ');
    const valores = Object.values(datos).map(valor => '?').join(', ');
    const sql = `INSERT INTO ${tabla} (${columnas}) VALUES (${valores})`;

    // Ejecutar la consulta
    conexion.query(sql, Object.values(datos), (err, result) => {
        callback(err, result);
    });
}

function actualizarEnTabla(tabla, datos, condiciones, callback) {
    // Construir la parte SET de la consulta SQL
    const setSQL = Object.keys(datos).map(key => `${key} = ?`).join(', ');

    // Construir la parte WHERE de la consulta SQL
    const whereSQL = Object.keys(condiciones).map(key => `${key} = ?`).join(' AND ');

    // Combinar todo en una consulta SQL completa
    const sql = `UPDATE ${tabla} SET ${setSQL} WHERE ${whereSQL}`;

    // Combinar los valores de datos y condiciones para la consulta
    const valores = [...Object.values(datos), ...Object.values(condiciones)];

    // Ejecutar la consulta
    conexion.query(sql, valores, (err, result) => {
        callback(err, result);
    });
}

function eliminarEnTabla(tabla,datos,callback){

    //Construir la parte del WHERE de la consulta SQL
    const whereSQL = Object.keys(datos).map(key => `${key} = ?`).join(' AND ');

    //Combinar todo en una consulta SQL completa
    const sql = `DELETE FROM ${tabla} WHERE ${whereSQL}` ;

    conexion.query(sql, Object.values(datos) ,(err,result) => {
        callback(err,result);
    })
}

module.exports = { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla, eliminarEnTabla, seleccionarDeTablaConWHere, seleccionarDeTablaConNot };