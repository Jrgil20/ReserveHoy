const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion'); 
const { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla  } = require('../db/dbOperations');

//Ruta POST registrar restaurante
router.post("/registerRestaurant", (req, res) => {
    const datos = req.body;
    const { name, email, phone, password } = datos;
  
    // Primero, verifica si el correo ya está registrado
    const buscar = "SELECT * FROM restaurante WHERE correoRes = ?";
    conexion.query(buscar, [email], function(err, row) {
        if (err) {
            throw err;
        } else {
            if (row.length > 0) {
                res.status(409).json({ message: "El correo ya está registrado", url: "/register.html" });
            } else {
                insertarEnTabla('restaurante', { nombre: name, telefono: phone, clave: password, correoRes: email }, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).json({ message: "Restaurante registrado con éxito", url: "/perfil.html?restaurante=" + email });
                    }
                });
            }
        }
    });
  });

module.exports = router;