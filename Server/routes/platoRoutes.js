const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion');
const { insertarEnTabla, actualizarEnTabla, eliminarEnTabla, seleccionarDeTablaConWHere  } = require('../db/dbOperations');

  // Ruta POST para agregar plato
  router.post("/agregarPlato", (req,res)=>{
    const datos = req.body;

    const {correoRestaurante,nombrePlato,tipo,precio,descripcion} = datos;

    let idPlato = Math.floor(Math.random()*100);
  
    //busca si ya existe un plato con el mismo nombre en un restaurante
  
    //se hace la consulta
    seleccionarDeTablaConWHere('plato','*',{correoRes:correoRestaurante, nombrePlato:nombrePlato}, (err,row)=> {
      if (err){
        throw err;
      }else{
        //verifica en las tablas si ya existe un plato con el mismo nombre, si esta es mayor a 0
        if(row.length>0){
          res.status(409).send('Ese plato ya existe en el menu');
        }else{
           seleccionarDeTablaConWHere('plato','*',{idPlato:idPlato, correoRes:correoRestaurante}, (error,lista) => {
            if(error){
               throw error;
            }else{
              if(lista.length > 0){
                const bandera = 0;
                do{
                  idPlato = Math.floor(Math.random()*100);
                  for(const i=0;i<lista.length;i++){
                    if(idPlato === lista[i].idPlato){
                      bandera = 1;
                      break;
                    }
                  }
                }while(bandera === 0);
                insertarEnTabla('plato',{idPlato:idPlato, nombrePlato:nombrePlato, tipo:tipo, precio:precio,descripcion:descripcion, correoRes: correoRestaurante }, (mistake,result) =>
                {
                  if(mistake){
                    res.status(500).json({ error: mistake });
                  }else{
                    res.status(200).send('Plato agregado con éxito');
                  }
                })
              }else{
                insertarEnTabla('plato',{idPlato:idPlato, nombrePlato:nombrePlato, tipo:tipo, precio:precio,descripcion:descripcion, correoRes: correoRestaurante }, (mistake,result) =>
                {
                  if(mistake){
                    res.status(500).json({ error: mistake });
                  }else{
                    res.status(200).send('Plato agregado con éxito');
                  }
                })
              }
            }
         })
        }
      }
    })
  })
  
  // Ruta POST para consultar todos los platos de un restaurante
  router.get("/consultarPlatos/:correoRest",(req,res)=>{
    //consulta para traer todos los platos
    const restaurante = req.params.correoRest;

    //hace la consulta
    seleccionarDeTablaConWHere('plato','*',{correoRes:restaurante}, (err,list)=>{
      if(err){
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
      }else{
         if(list.length > 0){
          res.status(200).json(list);
         }else{
          res.status(404).json({ message: 'No hay platos registrados para ese restaurante' });
         }
      }
    })
  });
  
  //Ruta GET para consulta un plato en especifico
  router.get("/consultarPlato",(req,res)=>{
    const plato = req.body.plato;

    //hace la consulta
    seleccionarDeTablaConWHere('plato','*',{nombrePlato:plato}, (err,element)=>{
      if(err){
        console.log(err);
      }else{
        console.log(element.nombrePlato);
        console.log(element.tipo);
        console.log(element.descripcion);
        console.log(element.precio);
      }
    })
  });
  
  //Ruta DELETE para eliminar un plato
router.delete('/eliminarPlato', (req,res) => {
  const datos = req.body;

  const {nombrePlato,correoRes} = datos;

  eliminarEnTabla('plato',{nombrePlato:nombrePlato, correoRes: correoRes},(err,result) => {
     if(err){
       throw err;
     }else{
      res.status(200).send('Plato eliminado con éxito');
     }
  })
})

//Ruta GET para modificar un plato
router.put('/modificarPlato', (req,res)=>{
  const datos = req.body;

  const {correoRes,nombrePlato,tipo,precio,descripcion} = datos;

  actualizarEnTabla('plato',{nombrePlato:nombrePlato, tipo:tipo, precio:precio, descripcion:descripcion},{nombrePlato:nombrePlato, correoRes:correoRes},(err,result) => {
    if(err){
      throw err;
    }else{
      res.status(200).send('Plato modificado con éxito');
    }
  })
})

module.exports = router;