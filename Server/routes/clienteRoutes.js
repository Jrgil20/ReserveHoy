const express = require('express');
const router = express.Router();

const conexion = require('../db/conexion');
const { seleccionarDeTabla, insertarEnTabla, actualizarEnTabla  } = require('../db/dbOperations');

  // Ruta POST para el registro de clientes 
  router.post("/registerClient", (req, res) => {
    const datos = req.body;
    
    let {name,email,phone,password} = datos;
    
    //busca si el correo ya esta registrado
    let buscar = "SELECT * FROM cliente WHERE correo = '"+email+"'";
    //se hace la consulta
    conexion.query(buscar,function(err,row){
       if(err){
        throw err;
      }else{
        //verifica en la tablas si el correo ya esta registrado
        if (row.length > 0){
          res.status(409).json({ message: "El correo ya está registrado", url: "/view/register.html"  });
        }else{
          insertarEnTabla('cliente', { NombreApellido: name, correo: email, password: password, telefono: phone }, (err, result) =>{
            if(err){
              console.log(err);
            }else{
              res.status(200).json({ message: "Cliente registrado con éxito", url: "/view/register.html" });
            }
          
          });
        }
      }
    })
  
  });

  // Ruta POST para el inicio de sesión (cliente)
  router.post('/loginCliente', (req, res) => {
    const datos = req.body;
  
    let email = datos.email;
    let password = datos.password;
    
    const buscarUsuario = "SELECT * FROM cliente";
    conexion.query(buscarUsuario,(err,lista)=>{
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
              res.status(200).json({ message: "Inicio de sesión exitoso" });
             }
          }
    })
      
  });

  // Ruta GET para buscar una persona por correo
  router.get("/buscarCliente/:correo", (req, res) => {
    const correo = req.params.correo; // Obtiene el correo de los parámetros de la ruta
  
    let buscarCliente = "SELECT * FROM cliente WHERE correo = '" + correo + "'";
    conexion.query(buscarCliente, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        if (result.length > 0) {
          res.status(200).json(result[0]);
        } else {
          res.status(404).json({ message: 'No se encontró ninguna persona con ese correo' });
        }
      }
    });
  });
  
  //Ruta GET que manda todos los clientes
  router.get("/traerClientes",(req,res)=>{
    let traeClientes = "SELECT * FROM cliente";
    conexion.query(traeClientes,(err,result)=>{
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

module.exports = router;