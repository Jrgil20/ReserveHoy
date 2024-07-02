
const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion');

router.get('/contadores', async (req, res) => {
    try {

      const [nRestaurantes] = await conexion.execute('SELECT COUNT(*) AS nRestaurantes FROM restaurantes');
      // Ejecuta una consulta para contar el número total de clientes
      const [nClientes] = await conexion.execute('SELECT COUNT(*) AS nClientes FROM clientes');
      // Ejecuta una consulta para contar el número total de reservas
      const [nReservas] = await conexion.execute('SELECT COUNT(*) AS nReservas FROM reservas');
  
      // Envía una respuesta JSON con el número de restaurantes, clientes y reservas
      res.json({
        nRestaurantes: nRestaurantes[0]['nRestaurantes'],
        nClientes: nClientes[0]['nClientes'],
        nReservas: nReservas[0]['nReservas']
      });
    } catch (error) {
      // En caso de error, imprime el error en la consola y envía un mensaje de error al cliente
      console.error('Error al realizar la consulta:', error);
      res.status(500).send('Error en el servidor');
    }
});