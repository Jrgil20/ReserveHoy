const conexion = require('./conexion');

// Función para leer el archivo SQL y ejecutar sus comandos
function inicializarBaseDeDatos() {
    const pathSql = path.join(__dirname, '../../data/reservehoy.sql'); 
    fs.readFile(pathSql, { encoding: 'utf-8' }, (err, sql) => {
        if (err) {
            console.error('Error al leer el archivo SQL', err);
            return;
        }
        // Dividir el archivo en comandos individuales y ejecutarlos uno por uno
        const sqlCommands = sql.split(/;\s*$/m);
        sqlCommands.forEach(command => {
            if (command) {
                conexion.query(command, (err) => {
                    if (err) {
                        console.error('Error al ejecutar comando SQL', err);
                    }
                });
            }
        });
    });
}

// Llamar a la función al iniciar la aplicación
inicializarBaseDeDatos();