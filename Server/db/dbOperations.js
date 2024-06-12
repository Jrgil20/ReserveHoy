const conexion = require('./conexion'); // Asegúrate de tener este módulo para la conexión a la base de datos

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



module.exports = { insertarEnTabla};