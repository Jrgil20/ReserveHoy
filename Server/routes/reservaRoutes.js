const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion');
const { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla, eliminarEnTabla, seleccionarDeTablaConWHere} = require('../db/dbOperations');

    // Ruta POST para agregar reserva
  router.post("/agregarReserva", (req,res)=>{
    const datos = req.body;
    const rest = datos.restaurante;
    let fecha = datos.fecha;
    let hora = datos.hora;
    //console.log(hora);
    let numeroPersona = datos.personas;
    let cliente = datos.email;
    let id = Math.floor(Math.random()*1000);
    
    ////busca si ya existe una reserva con el mismo ID
    let buscarIDReserva = "SELECT idReserva FROM reserva WHERE idReserva = '"+id+"'";
    //se hace la consulta
    conexion.query(buscarIDReserva,(err,result)=>{
      if(err){
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
      }else{
        if(result.length > 0){//Si ya existe un id con esa numeración, entra a este bloque
          bandera = 0;
          id = Math.floor(Math.random()*1000)
          do{
              if(result[0] === id){
                id = Math.floor(Math.random()*1000)
              }else{
                bandera = 1;
              }
          }while(bandera === 0);//Se genera un id hasta que no sea repetido
          //Busca las mesas de ese restaurante que tienen la capacidad requerida
          let traeMesas = "SELECT id_Mesa FROM mesa WHERE capacidad = '"+numeroPersona+"' AND correoRes = '"+rest+"'";
          //Se hace la consulta
          conexion.query(traeMesas,(error,resultado)=>{
             if(error){
              console.log(error);
               res.status(500).json({ error: 'An error occurred' });
             }else{
               if(resultado.length > 0){//Si hay mesas que cumplen el requerimiento, entra aquí
                  let mesasValidas = resultado.sort(function(a,b){
                    return a-b;
                  });
                  //Ordena la lista de menor a mayor
                  let verificarDisponibilidad = "SELECT idMesa FROM reserva WHERE numeroPersona = '"+numeroPersona+"' AND correoRes = '"+rest+"' AND fecha = '"+fecha+"' AND hora = '"+hora+"'";
                  //Busca las mesas que estén ocupadas en la fecha y hora de la solicitud
                  conexion.query(verificarDisponibilidad,(mistake,list)=>{
                    if(mistake){
                      res.status(500).json({ error: 'An error occurred' });
                    }else{
                      if(list.length === 0){//Si no hay mesas ocupadas, hace el proceso de insercion con la primera mesa encontrada
                        let idAceptadoPrev = mesasValidas[0];
                        let idAceptado = idAceptadoPrev.id_Mesa;
                        let insercionReserva = "INSERT INTO reserva (idReserva, fecha, hora, numeroPersona, correoCli, idMesa, correoRes) VALUES ('"+id+"', '"+fecha+"', '"+hora+"', '"+numeroPersona+"', '"+cliente+"', '"+idAceptado+"','"+rest+"')";
                        conexion.query(insercionReserva,(erreur,resultat)=>{
                         if(erreur){
                            console.log(erreur);
                            res.status(500).json({ error: 'An error occurred' });
                          }else{
                            res.status(200).json({ message: 'Reserva creada con éxito', idReserva: id });
                               }
                            })
                      }else{
                          if(list.length === mesasValidas.length){//Si están todas ocupadas, envía la notificación de error
                            res.status(409).send('Todas las mesas ocupadas');
                          }else{//Si hay mesas ocupadas pero no son la totalidad de las disponibles, entra a este bloque
                            list.sort(function(a,b){
                              return a-b;
                            })
                            let idAceptadoPrev = mesasValidas[list.length];
                            let idAceptado = idAceptadoPrev.id_Mesa;
                            let insercionReserva = "INSERT INTO reserva (idReserva, fecha, hora, numeroPersona, correoCli, idMesa, correoRes) VALUES ('"+id+"', '"+fecha+"', '"+hora+"', '"+numeroPersona+"', '"+cliente+"', '"+idAceptado+"','"+rest+"')";
                            conexion.query(insercionReserva,(erreur,resultat)=>{
                               if(erreur){
                                 console.log(erreur);
                                 res.status(500).json({ error: 'An error occurred' });
                               }else{
                                res.status(200).json({ message: 'No hay mesa Disponible'});
                               }
                            })
                          }
                      }
                    }
                  })
               }else{//Si no hay mesas del restaurante con la capacidad requerida, entra aquí
                res.status(200).json({ message: 'No hay mesa Disponible'});
               }
             }
          })
       }else{//Entra aquí si el id creado por primera vez es único
          //Busca las mesas de ese restaurante que tienen la capacidad requerida
          let traeMesas = "SELECT id_Mesa FROM mesa WHERE capacidad = '"+numeroPersona+"' AND correoRes = '"+rest+"'";
          //Se hace la consulta
          conexion.query(traeMesas,(error,resultado)=>{
             if(error){
              console.log(error);
               res.status(500).json({ error: 'An error occurred' });
             }else{
               if(resultado.length > 0){//Si hay mesas que cumplen el requerimiento, entra aquí
                  let mesasValidas = resultado.sort(function(a,b){
                    return a-b;
                  });
                  //Ordena la lista de menor a mayor
                  let verificarDisponibilidad = "SELECT idMesa FROM reserva WHERE numeroPersona = '"+numeroPersona+"' AND correoRes = '"+rest+"' AND fecha = '"+fecha+"' AND hora = '"+hora+"'";
                  //Busca las mesas que estén ocupadas en la fecha y hora de la solicitud
                  conexion.query(verificarDisponibilidad,(mistake,list)=>{
                    if(mistake){
                      res.status(500).json({ error: 'An error occurred' });
                    }else{
                      if(list.length === 0){//Si no hay mesas ocupadas, hace el proceso de insercion con la primera mesa encontrada
                        let idAceptadoPrev = mesasValidas[0];
                        let idAceptado = idAceptadoPrev.id_Mesa;
                        let insercionReserva = "INSERT INTO reserva (idReserva, fecha, hora, numeroPersona, correoCli, idMesa, correoRes) VALUES ('"+id+"', '"+fecha+"', '"+hora+"', '"+numeroPersona+"', '"+cliente+"', '"+idAceptado+"','"+rest+"')";
                        conexion.query(insercionReserva,(erreur,resultat)=>{
                         if(erreur){
                            console.log(erreur);
                            res.status(500).json({ error: 'An error occurred' });
                          }else{
                              res.status(200).json({ message: 'Reserva creada con éxito', idReserva: id });
                               }
                            })
                      }else{
                          if(list.length === mesasValidas.length){//Si están todas ocupadas, envía la notificación de error
                            res.status(200).json({ message: 'No hay mesa Disponible'});
                          }else{//Si hay mesas ocupadas pero no son la totalidad de las disponibles, entra a este bloque
                            list.sort(function(a,b){
                              return a-b;
                            })
                            let idAceptadoPrev = mesasValidas[list.length];
                            let idAceptado = idAceptadoPrev.id_Mesa;
                            let insercionReserva = "INSERT INTO reserva (idReserva, fecha, hora, numeroPersona, correoCli, idMesa, correoRes) VALUES ('"+id+"', '"+fecha+"', '"+hora+"', '"+numeroPersona+"', '"+cliente+"', '"+idAceptado+"','"+rest+"')";
                            conexion.query(insercionReserva,(erreur,resultat)=>{
                               if(erreur){
                                 console.log(erreur);
                                 res.status(500).json({ error: 'An error occurred' });
                               }else{
                                res.status(200).json({ message: 'Reserva creada con éxito', idReserva: id });
                               }
                            })
                          }
                      }
                    }
                  })
               }else{//Si no hay mesas del restaurante con la capacidad requerida, entra aquí
                res.status(404).json({ message: 'No hay mesa Disponible'});
               }
             }
          })
       }
      } 
    })
    })
  

  //Ruta GET que trae todos las reservas de un restaurante
  router.get("/buscarReservasRest/:correoRes",(req,res)=>{
    const correoRest = req.params.correoRes;

    seleccionarDeTablaConWHere('restaurante','*',{correoRes:correoRest},(err,result)=>{
      if(err){
        res.status(500).json({ error: 'An error occurred' });
      }else{
        if(result.length > 0){
          res.status(200).json(result);
        }else{
         res.status(404).json({ message: 'No hay reservas para este restaurante' });
        }
      }
   })
   })

  // Ruta GET para consultar una reserva de un cliente
  router.get("/buscarReserva/:idReserva", (req, res) => {
    const idReserva = req.params.idReserva; // Obtiene el ID de la reserva de los parámetros de la ruta
  
    seleccionarDeTablaConWHere('reserva','*',{idReserva:idReserva}, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ message: 'No se encontró ninguna reserva con ese ID' });
        }
      }
    })
  });



module.exports = router;