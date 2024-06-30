const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion');
const { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla  } = require('../db/dbOperations');

  // Ruta POST para agregar plato
  router.post("/agregarPlato", (req,res)=>{
    const datos = req.body;
    let {correoRestaurante,nombrePlato,tipo,precio,descripcion} = datos;
    let idPlato = Math.random()*100;
  
    //busca si ya existe un plato con el mismo nombre en un restaurante
    let buscarPlatoRest = "SELECT * FROM plato WHERE correoRes = '"+correoRestaurante+"' AND nombrePlato = '"+nombrePlato+"'";
  
    //se hace la consulta
    conexion.query(buscarPlatoRest,function(err,row){
      if (err){
        throw err;
      }else{
        //verifica en las tablas si ya existe un plato con el mismo nombre, si esta es mayor a 0
        if(row.length>0){
          res.status(304).send(`<script>alert("Este plato ya existe en el menu");</script>`);
        }else{
           let confirmarPlato = "SELECT * FROM plato WHERE idPlato = '"+idPlato+"' AND correoRes = '"+correoRestaurante+"'";
           conexion.query(confirmarPlato,function(error,lista){
              if(error){
                 throw error;
              }else{
                if(lista.length > 0){
                  let bandera = 0;
                  do{
                    idPlato = Math.random()*100;
                    for(let i=0;i<lista.length;i++){
                      if(idPlato === lista[i].idPlato){
                        bandera = 1;
                        break;
                      }
                    }
                  }while(bandera === 0);
                  let registrarPlato = "INSERT INTO plato (idPlato,nombrePlato,tipo,precio,descripcion,correoRes) VALUES ('"+idPlato+"','"+nombrePlato+"','"+tipo+"','"+precio+"', '"+descripcion+"', '"+correoRestaurante+"')";
                  conexion.query(registrarPlato,function(mistake,result)
                  {
                    if(mistake){
                      res.status(500).json({ error: 'An error occurred' });
                    }else{
                      res.status(200).send(`<script>alert("Plato agregado"); window.location.href = "/";</script>`);
                    }
                  })
                }else{
                  let registrarPlato = "INSERT INTO plato (idPlato,nombrePlato,tipo,precio,descripcion,correoRes) VALUES ('"+idPlato+"','"+nombrePlato+"','"+tipo+"','"+precio+"', '"+descripcion+"', '"+correoRestaurante+"')";
                  conexion.query(registrarPlato,function(mistake,result){
                    if(mistake){
                      res.status(500).json({ error: 'An error occurred' });
                    }else{
                      res.status(200).send(`Plato agregado con exito`);
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
  router.post("/consultarPlatos",(req,res)=>{
    //consulta para traer todos los platos
    let restaurante = req.body.restaurante;
    console.log(restaurante);
    const platos = "SELECT * FROM plato WHERE correoRes = '"+restaurante+"'";
    //hace la consulta
    conexion.query(platos,(err,list)=>{
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
    let plato = req.body.plato;
    const platos = "SELECT * FROM plato WHERE nombrePlato = '"+plato+"'";
    //hace la consulta
    conexion.query(platos,(err,element)=>{
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
  


module.exports = router;