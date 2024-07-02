const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion');
const { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla, eliminarEnTabla, seleccionarDeTablaConWHere  } = require('../db/dbOperations');

  // Ruta POST para el registro de clientes 
  router.post("/registerClient", (req, res) => {
    const datos = req.body;
    
    let {name,email,phone,password} = datos;
    
    //busca si el correo ya esta registrado
    seleccionarDeTablaConWHere('cliente','*',{correo:email},(err,result) => {
      if(err){
       throw err;
     }else{
       //verifica en la tablas si el correo ya esta registrado
       if (result.length > 0){
         res.status(409).json({ message: "El correo ya está registrado", url: "/view/register.html"  });
       }else{
         insertarEnTabla('cliente', { NombreApellido: name, correo: email, password: password, telefono: phone }, (err, result) =>{
           if(err){
             console.log(err);
           }else{
             res.status(200).json({ message: "Cliente registrado con éxito", url: "/view/perfilCliente.html?cliente=" + correo });
           }
         
         });
       }
     }
   })
  
  });

  // Ruta POST para el inicio de sesión (cliente)
  router.post("/loginCliente", (req, res) => {
    const datos = req.body;
  
    let email = datos.email;

    let password = datos.password;
    
    seleccionarDeTabla('cliente','*',(err,lista)=>{
      if(err){
        throw err;
      }else{
        let bandera = 0;
         for(i=0;i<lista.length;i++){
           if((lista[i].correo === email)&&(lista[i].password === password)){
              bandera += 1;
              break;
           }
         }
         if(bandera != 1){
          res.status(400).json({ message: "Usuario o clave invalidada" });
         }else{
          // se redireciona al perfil del usuario
          res.status(200).json({ message: "Inicio de sesión exitoso", url: "/view/perfilCliente.html?cliente=" + correo });
         }
      } 
   });      
  });

  // Ruta GET para buscar una persona por correo
  router.get("/buscarCliente/:correo", (req, res) => {
    const correo = req.params.correo; // Obtiene el correo de los parámetros de la ruta
    
    seleccionarDeTabla('cliente', '*', (err, result) => {
      let bandera = false;

      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Ha ocurrido un error' });
      } else {
        if (result.length > 0) {
          let i;
          for(i=0;i<result.length;i++){
           if(result[i].correo === correo){
             bandera = true;
             break;
            }
          }
          if(bandera === false){
            res.status(404).json({ message: 'No se encontró ninguna persona con ese correo' });
          }else{
            res.status(200).json(result[i]);
          }
        } else {
          res.status(404).json({ message: 'No hay correos registrados' });
        }
      }
    })
  });
  
  //Ruta GET que manda todos los clientes
  router.get("/traerClientes",(req,res)=>{
     seleccionarDeTabla('cliente','*',(err,result)=>{
      if(err){
        res.status(500).json({ error: 'An error occurred' });
      }else{
       if(result.length > 0){
         res.status(200).json(result);
       }else{
         res.status(404).json({ message: 'No hay clientes' });
       }
    }
   })
  })

  //Ruta DELETE que elimina un cliente
router.delete("/eliminarCliente", (req,res) => {
  const datos = req.body;

  const cliente = datos;

  eliminarEnTabla('reserva',{correoCli:cliente.correo}, (err,result) => {
    if(err){
      throw err;
    }
  })

  eliminarEnTabla('cliente',cliente,(err,result) => {
     if(err){
       throw err;
     }else{
      res.status(200).send('Perfil eliminado con éxito');
     }
  })
})

//Ruta PUT para modificar un cliente
router.put("/modificarCliente", (req,res) => {
  const datos = req.body;

  const {nombre, password, correo, telefono} = datos;

  actualizarEnTabla('cliente',{NombreApellido:nombre, password:password, telefono:telefono},{correo:correo},(err,res) => {
    if(err){
      throw err;
    }else{
      res.status(200).send('Perfil modificado con éxito');
    }
  })
})

module.exports = router;