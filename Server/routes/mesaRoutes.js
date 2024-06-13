const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion');
const { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla  } = require('../db/dbOperations');


  // Ruta POST para agregar mesa
  router.post ("/agregarMesa", (req,res)=>{
    const datos = req.body;//Vaciamos el cuerpo de la petición HTTP en la variable body
    const status = 0;
    const numMesa = Math.random()*100;//Creacion de un nuevo número de mesa
    const id_Mesa = Math.random()*100;//Creacion de un nuevo ID
    let {restaurante, capacidad} = datos; //Mediante destructuracion se asigna el contenido de datos en las variables

    //busca si ya existe una mesa con el mismo id en un restaurante
    let buscarIdMesaRest = "SELECT * FROM mesa WHERE id_Mesa = '"+id_Mesa+"'";
    //se hace la consulta 
    conexion.query(buscarIdMesaRest,(err,row)=>{
      if (err){
        throw err;
      }else {
        //verifica en la tabla si ya exite una mesa con el mismo ID, si esta es mayor a 0
        if (row.length>0){
           let bandera = 0;
           do{
               //Si existe el mismo id, se generara uno hasta que no coincida
               id_Mesa = Math.random()*100;
               if(id_Mesa != row[0].id_Mesa){
                 bandera = 1;
              }
             }while(bandera === 0);
            let registrarMesa = "INSERT INTO mesa (status, capacidad, numMesa, correoRes, id_Mesa) VALUES ('"+status+"', '"+capacidad+"', '"+numMesa+"', '"+restaurante+"', '"+id_Mesa+"')";
            //hace consulta en mesa
            conexion.query(registrarMesa,(err,result)=>{
            if(err){
              console.log(err);
              res.status(500).json({ error: 'An error occurred' });
            }else {
              res.status(200).send('Mesa registrada con éxito');
            }
          })
        }else{
          //Camino si no hay id repetido
          let registrarMesa = "INSERT INTO mesa (status, capacidad, numMesa, correoRes, id_Mesa) VALUES ('"+status+"', '"+capacidad+"', '"+numMesa+"', '"+restaurante+"', '"+id_Mesa+"')";
          //hace consulta en mesa
          conexion.query(registrarMesa,(err,result)=>{
            if(err){
              console.log(err);
              res.status(500).json({ error: 'An error occurred' });
            }else {
              res.status(200).send('Mesa registrada con éxito');
            }
          })
        }
      }
    })
  })




module.exports = router;