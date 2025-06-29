const express = require('express');

const router = express.Router();

const conexion = require('../db/conexion');

const { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla, eliminarEnTabla, seleccionarDeTablaConWHere} = require('../db/dbOperations');

const nodemailer = require('nodemailer');

    // Ruta POST para agregar reserva
  router.post("/agregarReserva", (req,res)=>{
    const datos = req.body;
    const rest = datos.restaurante;
    let fecha = datos.fecha;
    let hora = datos.hora;
    let numeroPersona = datos.personas;
    let cliente = datos.email;
    let id = Math.floor(Math.random()*1000);
    
    ////busca si ya existe una reserva con el mismo ID
    seleccionarDeTablaConWHere('reserva', 'idReserva', {idReserva:id}, (err,result)=>{
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
          seleccionarDeTablaConWHere('mesa','id_Mesa',{capacidad:numeroPersona, correoRes:rest, status:0}, (error,resultado)=>{
            if(error){
             console.log(error);
              res.status(500).json({ error: 'An error occurred' });
            }else{
              if(resultado.length > 0){//Si hay mesas que cumplen el requerimiento, entra aquí
                 let mesasValidas = resultado.sort(function(a,b){
                   return a-b;
                 });
                 //Ordena la lista de menor a mayor
                 //Busca las mesas que estén ocupadas en la fecha y hora de la solicitud
                 seleccionarDeTablaConWHere('reserva','idMesa',{numeroPersona:numeroPersona, correoRes: rest, fecha:fecha, hora:hora}, (mistake,list)=>{
                  if(mistake){
                    res.status(500).json({ error: 'An error occurred' });
                  }else{
                    if(list.length === 0){//Si no hay mesas ocupadas, hace el proceso de insercion con la primera mesa encontrada
                      let idAceptadoPrev = mesasValidas[0];
                      let idAceptado = idAceptadoPrev.id_Mesa;
                      insertarEnTabla('reserva',{idReserva:id,fecha:fecha,hora:hora,numeroPersona:numeroPersona,correoCli:cliente,idMesa:idAceptado,correoRes:rest, estado:0}, (erreur,resultat)=>{
                        if(erreur){
                           console.log(erreur);
                           res.status(500).json({ error: 'An error occurred' });
                         }else{
                           res.status(201).json({ message: 'Reserva creada con éxito', idReserva: id });
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
                          insertarEnTabla('reserva',{idReserva:id,fecha:fecha,hora:hora,numeroPersona:numeroPersona,correoCli:cliente,idMesa:idAceptado,correoRes:rest, estado:0}, (erreur,resultat)=>{
                            if(erreur){
                               console.log(erreur);
                               res.status(500).json({ error: 'An error occurred' });
                             }else{
                               res.status(201).json({ message: 'Reserva creada con éxito', idReserva: id });
                                  }
                               })
                        }
                    }
                  }
                })
              }else{//Si no hay mesas del restaurante con la capacidad requerida, entra aquí
                res.status(404).json({message:'No hay mesas disponibles'});
              }
            }
         })
       }else{//Entra aquí si el id creado por primera vez es único
          //Busca las mesas de ese restaurante que tienen la capacidad requerida
          seleccionarDeTablaConWHere('mesa','id_Mesa',{capacidad:numeroPersona, correoRes:rest, status:0}, (error,resultado)=>{
            if(error){
             console.log(error);
              res.status(500).json({ error: 'An error occurred' });
            }else{
              if(resultado.length > 0){//Si hay mesas que cumplen el requerimiento, entra aquí
                 let mesasValidas = resultado.sort(function(a,b){
                   return a-b;
                 });
                 //Ordena la lista de menor a mayor
                 //Busca las mesas que estén ocupadas en la fecha y hora de la solicitud
                 seleccionarDeTablaConWHere('reserva','idMesa',{numeroPersona:numeroPersona, correoRes: rest, fecha:fecha, hora:hora}, (mistake,list)=>{
                  if(mistake){
                    res.status(500).json({ error: 'An error occurred' });
                  }else{
                    if(list.length === 0){//Si no hay mesas ocupadas, hace el proceso de insercion con la primera mesa encontrada
                      let idAceptadoPrev = mesasValidas[0];
                      let idAceptado = idAceptadoPrev.id_Mesa;
                      insertarEnTabla('reserva',{idReserva:id,fecha:fecha,hora:hora,numeroPersona:numeroPersona,correoCli:cliente,idMesa:idAceptado,correoRes:rest, estado:0}, (erreur,resultat)=>{
                        if(erreur){
                           console.log(erreur);
                           res.status(500).json({ error: 'An error occurred' });
                         }else{
                           res.status(201).json({ message: 'Reserva creada con éxito', idReserva: id });
                              }
                           })
                    }else{
                        if(list.length === mesasValidas.length){//Si están todas ocupadas, envía la notificación de error
                          res.status(409).json({message:'Todas las mesas ocupadas'});
                        }else{//Si hay mesas ocupadas pero no son la totalidad de las disponibles, entra a este bloque
                          list.sort(function(a,b){
                            return a-b;
                          })
                          let idAceptadoPrev = mesasValidas[list.length];
                          let idAceptado = idAceptadoPrev.id_Mesa;
                          insertarEnTabla('reserva',{idReserva:id,fecha:fecha,hora:hora,numeroPersona:numeroPersona,correoCli:cliente,idMesa:idAceptado,correoRes:rest, estado:0}, (erreur,resultat)=>{
                            if(erreur){
                               console.log(erreur);
                               res.status(500).json({ error: 'An error occurred' });
                             }else{
                               res.status(201).json({ message: 'Reserva creada con éxito', idReserva: id });
                                  }
                               })
                        }
                    }
                  }
                })
              }else{//Si no hay mesas del restaurante con la capacidad requerida, entra aquí
               res.status(404).json({message:'No hay mesas disponibles'});
              }
            }
         })
        }
      } 
    })
  })
  
   //Ruta GET que trae todas las reservas
   router.get("/traerReservas", (req,res) => {
      seleccionarDeTabla('reserva','*', (err,result) => {
         if(err){
           res.status(500).json({error: 'Ha ocurrido un eror'})
         }else{
           res.status(200).json(result);
         }
      })
   })

  //Ruta GET que trae todos las reservas de un restaurante
  router.get("/buscarReservasRest/:correoRes",(req,res)=>{
    const correoRest = req.params.correoRes;

    seleccionarDeTablaConWHere('reserva','*',{correoRes:correoRest},(err,result)=>{
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

   //Ruta GET que trae todas las reservas de un cliente
   router.get("/buscarReservasCli/:correoCli", (req,res)=>{
    const correoCliente = req.params.correoCli;

    seleccionarDeTablaConWHere('reserva','*',{correoCli:correoCliente},(err,result)=>{
      if(err){
        res.status(500).json({ error: 'An error occurred' });
      }else{
        if(result.length > 0){
          res.status(200).json(result);
        }else{
         res.status(404).json({ message: 'No hay reservas para este cliente' });
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

  //Ruta PATCH para confirmar una reserva
   router.patch("/confirmarReserva", async (req,res) =>{
        const datos = req.body;

        const{idReserva,destinatario, restaurante, estado} = datos;

        const config = {
          host : 'smtp.gmail.com',
          port : 587,
          auth : {
            user : 'hoyreserve@gmail.com',
            pass: 'kdsf odwn pfla jdul'
          }
       }
       
      const mensaje = {
         from : 'hoyreserve@gmail.com',
         to : destinatario,
         subject: 'Reserva confirmada en '+restaurante,
         text: '¡Tu reserva ha sido confirmada!'
      }
   
       const transport = nodemailer.createTransport(config);
       
       try{
         const info = await transport.sendMail(mensaje);
        
         actualizarEnTabla('reserva',{estado:estado},{idReserva:idReserva}, (err,result) => {
          if(err){
            res.status(500).send('Error al actualizar el estado de la reserva');
          }else{
            res.status(200).send('Reserva confirmada y correo enviado');
          }
         })        
       }catch(error){
         console.error(error);
         res.status(500).send('Error al enviar el mensaje')
       }
        
        
   });

  //Ruta DELETE para cancelar una reserva 
  router.delete("/cancelarReserva", async (req,res) => {
    const datos = req.body;

    const{idReserva, destinatario, restaurante} = datos;

    const config = {
       host : 'smtp.gmail.com',
       port : 587,
       auth : {
         user : 'hoyreserve@gmail.com',
         pass: 'kdsf odwn pfla jdul'
       }
    }
    
   const mensaje = {
      from : 'hoyreserve@gmail.com',
      to : destinatario,
      subject: 'Reserva cancelada en '+restaurante,
      text: 'Lamentamos informar que su reserva ha sido cancelada'
   }

    const transport = nodemailer.createTransport(config);

    const info = transport.sendMail(mensaje)

    try{
      const info = await transport.sendMail(mensaje);
     
      eliminarEnTabla('reserva',{idReserva:idReserva}, (err,result) => {
        if(err){
          res.status(500).status('Error en el servidor');
        }else{
          res.status(200).send('Reserva cancelada con exito y notificaion al cliente enviada')
        }
      })      
    }catch(error){
      console.error(error);
      res.status(500).send('Error al enviar el mensaje')
    }
  })

  //Ruta PUT para modificar una reserva
  router.put("/modificarReserva",(req,res)=>{
    const datos = req.body;

    const idReserva = datos.idReserva;

    const fecha = datos.fecha;

    const hora = datos.hora;

    const numeroPersona = datos.numeroPersona;

    console.log(idReserva, fecha, hora, numeroPersona);

    seleccionarDeTablaConWHere('mesa','id_Mesa',{capacidad:numeroPersona, status:0}, (err,resultado) => {
      if(err){
        console.log(err);
         res.status(500).json({ error: 'An error occurred' });
       }else{
         if(resultado.length > 0){//Si hay mesas que cumplen el requerimiento, entra aquí
            let mesasValidas = resultado.sort(function(a,b){
              return a-b;
            });
            //Ordena la lista de menor a mayor
            //Busca las mesas que estén ocupadas en la fecha y hora de la solicitud
            seleccionarDeTablaConWHere('reserva','idMesa',{numeroPersona:numeroPersona, correoRes: rest, fecha:fecha, hora:hora}, (mistake,list)=>{
             if(mistake){
               res.status(500).json({ error: 'An error occurred' });
             }else{
               if(list.length === 0){//Si no hay mesas ocupadas, hace el proceso de insercion con la primera mesa encontrada
                 let idAceptadoPrev = mesasValidas[0];
                 let idAceptado = idAceptadoPrev.id_Mesa;
                 actualizarEnTabla('reserva',{fecha:fecha,hora:hora,numeroPersona:numeroPersona,id_Mesa:idAceptado, estado:0},{idReserva:idReserva},(erreur,resultat)=>{
                  if(erreur){
                     console.log(erreur);
                     res.status(500).json({ error: 'An error occurred' });
                   }else{
                     res.status(200).send('Reserva actualizada con exito');
                        }
                     })
               }else{
                   if(list.length === mesasValidas.length){//Si están todas ocupadas, envía la notificación de error
                     res.status(409).json({message:'Todas las mesas ocupadas'});
                   }else{//Si hay mesas ocupadas pero no son la totalidad de las disponibles, entra a este bloque
                     list.sort(function(a,b){
                       return a-b;
                     })
                     let idAceptadoPrev = mesasValidas[list.length];
                     let idAceptado = idAceptadoPrev.id_Mesa;
                     actualizarEnTabla('reserva',{fecha:fecha,hora:hora,numeroPersona:numeroPersona,id_Mesa:idAceptado, estado:0},{idReserva:idReserva},(erreur,resultat)=>{
                       if(erreur){
                          console.log(erreur);
                          res.status(500).json({ error: 'An error occurred' });
                        }else{
                          res.status(200).send('Reserva actualizada con exito');
                             }
                          })
                   }
               }
             }
           })
         }else{//Si no hay mesas del restaurante con la capacidad requerida, entra aquí
          res.status(404).send('No hay mesas disponibles para el nuevo número de personas en la fecha y hora solicitada');
         }
       }
    })
    
  })

module.exports = router;