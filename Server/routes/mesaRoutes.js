const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion');
const { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla, eliminarEnTabla  } = require('../db/dbOperations');


  // Ruta POST para agregar mesa
  router.post ("/agregarMesa", (req,res)=>{
    let prueba = req.baseUrl;
    console.log(prueba);
    const datos = req.body;//Vaciamos el cuerpo de la petición HTTP en la variable body
    const status = 0;
    const numMesa = Math.floor(Math.random()*100);//Creacion de un nuevo número de mesa
    const id_Mesa = Math.floor(Math.random()*100);//Creacion de un nuevo ID
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
               id_Mesa = Math.floor(Math.random()*100);
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

  //Ruta GET que trae todas las mesas de un restaurante
  router.get("/buscarMesasRest/:correoRest",(req,res)=>{

    const correoRest = req.params.correoRest;//Obtiene el correo de la ruta
    let traeMesas= "SELECT * FROM mesa WHERE correoRes = '"+correoRest+"'";//Declaramos el query
    conexion.query(traeMesas,(err,result)=>{//Hacemos el query

    if(err){
      res.status(500).json({ error: 'An error occurred' });//Si hay error, manda la notifiacion
    }else{
      if(result.length > 0){
        res.status(200).json(result);//Si hay mesas, devuelve la lista
      }else{
       res.status(404).json({ message: 'No hay mesas para este restaurante' });//Si no hay, devuelve error 404 not found
      }
    }
    })
  })

router.delete('/eliminarMesa',(req,res) => {
    const datos = req.body;

    const {idAEliminar,correoRes} = datos;

    eliminarEnTabla('mesa',{id_Mesa:idAEliminar, correoRes: correoRes},(err,result) => {
       if(err){
         throw err;
       }else{
        res.status(200).send('Mesa eliminada con éxito');
       }
    })
})

module.exports = router;