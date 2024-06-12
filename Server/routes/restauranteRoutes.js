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

  // Ruta POST para el inicio de sesión (restaurante)
  router.post("/loginRestaurant", (req, res) => {
    const datos = req.body;
    let email = datos.email;
    let password = datos.password;
    let buscarUsuario = "SELECT * FROM restaurante";
    conexion.query(buscarUsuario,(err,lista)=>{
          if(err){
            throw err;
          }else{
             let bandera = 0;
             for(i=0;i<lista.length;i++){
               if((lista[i].correoRes === email)&&(lista[i].clave === password)){
                  bandera += 1;
                  break;
               }
             }
             if(bandera != 1){
              res.status(400).json({ message: "Usuario o clave invalidada" });
            }else{
              let email = datos.email;
              res.status(200).json({ message: "Inicio de sesión exitoso",url: "/perfil.html?restaurante=" + email });     
            }
  
          }
    })
    
  });

module.exports = router;