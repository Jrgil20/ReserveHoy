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

  //RUTA POST para actualizar la informacion de un restaurante
  router.post("/actualizarInformacionRestaurante",(req,res)=>{
    const datos = req.body;//Vaciamos el cuerpo de la peticion HTTP en la variable datos
    let {claveLocal,direccion,descripcion,horario,horFin} = datos;//Mediante destructuración, asignamos el contenido de datos a las variables
    const actuMesa = "UPDATE restaurante SET direccion = '"+direccion+"', descripcion = '"+descripcion+"', horLunVier = '"+horario+"', horFinDe='"+horFin+"' WHERE correoRes = '"+claveLocal+"'";
    //Se declara el query
    conexion.query(actuMesa,(err,result)=>{//Se hace el query
     if(err){
       res.status(500).json({ error: 'An error occurred' });//Si hay error, se envia la notifiacion de fallo
     }else {
       res.status(200).send('<script>alert("Informacion actualizada con exito"); window.location.href = "/";</script>');
       //Si todo sale bien, se envia la notificacion de éxito
     }
    })
  })

  //Ruta GET que trae un restaurante por correo
  router.get("/traeRest/:correoRes",(req,res)=>{
    const correoRest = req.params.correoRes;
      let traeReservas = "SELECT * FROM restaurante WHERE correoRes = '"+correoRest+"'";
      conexion.query(traeReservas,(err,result)=>{
         if(err){
           res.status(500).json({ error: 'An error occurred' });
         }else{
           if(result.length > 0){
             res.status(200).json(result[0]);
           }else{
            res.status(404).json({ message: 'No hay un restaurante con este correo' });
           }
         }
      })
  })

  //RUTA GET para traer Horarios de un restaurante dado su clave forranea (correo)
  router.get("/traeHorarios/:correoRes",(req,res)=>{
    const correoRest = req.params.correoRes;
    let traeHorarios = "SELECT horFinDe, horLunVier FROM restaurante WHERE correoRes = '"+correoRest+"'";
    conexion.query(traeHorarios,(err,result)=>{
       if(err){
         res.status(500).json({ error: 'An error occurred' });
       }else{
         if(result.length > 0){
           res.status(200).json(result[0]);
         }else{
          res.status(404).json({ message: 'No hay un restaurante con este correo' });
         }
       }
    })
  })

  //Ruta GET que trae todos los Restaurantes
  router.get("/traeRestaurantes",(req,res)=>{
    let traeRes= "SELECT * FROM restaurante";
    conexion.query(traeRes,(err,result)=>{
       if(err){
         res.status(500).json({ error: 'An error occurred' });
       }else{
           if(result.length > 0){
             res.status(200).json(result);
           }else{
             res.status(404).json({ message: 'No hay restaurantes' });
           }
         
       }
    })
  })


module.exports = router;