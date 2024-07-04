const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion');
const { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla, eliminarEnTabla, seleccionarDeTablaConWHere  } = require('../db/dbOperations');


  // Ruta POST para agregar mesa
  router.post ("/agregarMesa", (req,res)=>{
    let prueba = req.baseUrl;
    console.log(prueba);
    const datos = req.body;//Vaciamos el cuerpo de la petición HTTP en la variable body
    const status = 0;
    const numMesa = Math.floor(Math.random()*100);//Creacion de un nuevo número de mesa
    let id_Mesa = Math.floor(Math.random()*100);//Creacion de un nuevo ID
    let {restaurante, capacidad} = datos; //Mediante destructuracion se asigna el contenido de datos en las variables

    //busca si ya existe una mesa con el mismo id en un restaurante
    let buscarIdMesaRest = "SELECT * FROM mesa WHERE id_Mesa = '"+id_Mesa+"'";
    //se hace la consulta 
    seleccionarDeTablaConWHere('mesa','*',{id_Mesa:id_Mesa}, (err,row)=>{
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
            //hace consulta en mesa
           insertarEnTabla('mesa',{status:status, capacidad:capacidad, numMesa:numMesa, correoRes:restaurante, id_Mesa:id_Mesa}, (err,result)=>{
            if(err){
              console.log(err);
              res.status(500).json({ error: 'An error occurred' });
            }else {
              res.status(200).send('Mesa registrada con éxito');
            }
          })
        }else{
          //Camino si no hay id repetido
          //hace consulta en mesa
          insertarEnTabla('mesa',{status:status, capacidad:capacidad, numMesa:numMesa, correoRes:restaurante, id_Mesa:id_Mesa}, (err,result)=>{
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

    seleccionarDeTablaConWHere('mesa','*',{correoRes:correoRest}, (err,result)=>{//Hacemos el query

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


 //Ruta DELETE para eliminar una mesa 
router.delete('/eliminarMesa',(req,res) => {
    const datos = req.body;

    const {idAEliminar,correoRes} = datos;

    seleccionarDeTablaConWHere('reserva','*',{idMesa:idAEliminar, correoRes:correoRes}, (err,reservas) => {
     if(err){
       res.status(500).send('Error del servidor : '+err);
     }else{
       if(reservas.length > 0){
          reservas.forEach((reserva) => {// Por cada reservacion, lo que vamos a hacer es buscar otra mesa que este disponible y que coincida con la cantidad de personas en esa reserva 
          seleccionarDeTablaConWHere('mesa','*',{correoRes:correoRes, capacidad:reserva.numeroPersona, status:0}, (err, mesasDispo) => {
            if (err) {
              throw err;
            }
            if (mesasDispo.length > 0) {
              // Actualizamos la reservacion a la nueva mesa
              actualizarEnTabla('reserva',{idMesa: mesasDispo[0].id_Mesa},{idReserva:reserva.idReserva}, (err, result) => {
                if (err) {
                  throw err;
                }
              })
            } else {
              // Si no encuentra ninguna mesa disponible y que coincida con la cantidad de personas, se elimna esa reservacion
              eliminarEnTabla('reserva', { id: reserva.id }, (err, result) => {
                if (err) {
                  throw err;
                }
              });
            }
          })
        });
        // Despues de haber eliminado todas las reservas asociadas, se elimina la mesa
        eliminarEnTabla('mesa', { id_Mesa: idAEliminar, correoRes: correoRes }, (err, result) => {
          if (err) {
            throw err;
          } else {
             res.status(200).send('Mesa eliminada con éxito');
           }
         });
       }else{
        eliminarEnTabla('mesa', { id_Mesa: idAEliminar, correoRes: correoRes }, (err, result) => {
          if (err) {
            throw err;
          } else {
             res.status(200).send('Mesa eliminada con éxito');
           }
         });
       }
     }
  })
})

//Ruta PUT para modificar una mesa
router.put('/modificarMesa', (req, res) => {
  const datos = req.body;
  const id_Mesa = datos.id_Mesa;
  const capacidad = datos.capacidad;
  const status = datos.status;
  const correoRes = datos.correoRes;

  // Actualizar la mesa
  actualizarEnTabla('mesa', { capacidad: capacidad, status: status }, { id_Mesa: id_Mesa, correoRes: correoRes }, (err, result) => {
    if (err) {
      throw err;
    } else {
      // Buscar reservas que no coinciden con la nueva capacidad
      const buscarReservas = "SELECT * FROM reserva WHERE idMesa = '" + id_Mesa + "' AND numeroPersona > '" + capacidad + "'";
      conexion.query(buscarReservas, (err, reservas) => {
        if (err) {
          throw err;
        } else {
          if (reservas.length > 0) {
            // Buscar otra mesa disponible que coincida con la capacidad solicitada en la reserva que posee la mesa a modificar
            const buscarMesaDispo = "SELECT * FROM mesa WHERE correoRes = '" + correoRes + "' AND capacidad >= '" + reservas[0].numeroPersona + "' AND status = 0";
            conexion.query(buscarMesaDispo, (err, mesasDispo) => {
              if (err) {
                throw err;
              } else {
                if (mesasDispo.length > 0) {
                  // Actualizar la reserva con la nueva mesa disponible
                  const actualizarReserva = "UPDATE reserva SET idMesa = '" + mesasDispo[0].id_Mesa + "' WHERE idMesa = '" + id_Mesa + "'";
                  console.log(mesasDispo[0].id_Mesa);
                  actualizarEnTabla('reserva',{id:mesasDispo[0].id_Mesa}, {idMesa:id_Mesa}, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      res.status(200).send('Mesa modificada con éxito y reserva actualizada');
                    }
                  })
                } else {
                  res.status(404).send('No hay mesas disponibles que coincidan con la capacidad solicitada');
                }
              }
            });
          } else {
            res.status(200).send('Mesa modificada con éxito');
          }
        }
      });
    }
  });
});
   
module.exports = router;