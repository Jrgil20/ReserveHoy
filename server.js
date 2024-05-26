const express = require('express');
// importa el módulo body-parser. Esto te permite usar la funcionalidad de body-parser en tu archivo.
const bodyParser = require('body-parser');
// Importa el módulo fs. Esto te permite usar la funcionalidad de fs en tu archivo.
const fs = require('fs');

const mysql = require('mysql');
const { error } = require('console');
const { url } = require('inspector');

const conexion = mysql.createConnection({
    host: "localhost",
    database: "reservehoy",
    user:"root",
    password: ""
}); 

const app = express();

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static('public'));

//para usar ejs (motor de vista)
app.set("view engine", "ejs");

//para reconocer los datos que ingrese el usuario
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Define el puerto en el que se ejecutará tu servidor.
const port = 3000;

// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// Ruta POST para el registro de clientes 
app.post("/registerClient", (req, res) => {
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
        res.status(409).json({ message: "El correo ya está registrado", url: "/register.html"  });
      }else{
        let register = "INSERT INTO cliente (NombreApellido, correo, password, telefono) VALUES ('"+name+"','"+email+"','"+password+"','"+phone+"')"
  
        conexion.query(register,function(err,result){
          if(err){
            console.log(err);
          }else{
            res.status(200).json({ message: "Cliente registrado con éxito", url: "/register.html" });
          }
        
        });
      }
    }
  })

});

//Ruta POST registrar restaurante
app.post("/registerRestaurant", (req,res) => {
  const datos = req.body;
  
  let {name,email,phone,password} = datos;
  
  //busca si el correo ya esta registrado
  let buscar = "SELECT * FROM restaurante WHERE correoRes = '"+email+"'";
  conexion.query(buscar,function(err,row){
     if(err){
      throw err;
    }else{
      //verifica en la tablas si el correo ya esta registrado, si esta es mayor a 0
      if (row.length > 0){
        res.status(409).json({ message: "El correo ya está registrado", url: "/register.html"  });
      }else{
        let register = "INSERT INTO restaurante (nombre, telefono, clave, correoRes) VALUES ('"+name+"','"+phone+"','"+password+"','"+email+"')"
        conexion.query(register,function(err,result){
          if(err){
            console.log(err);
          }else{
            let email = datos.email;
            res.status(200).json({ message: "Restaurante registrado con éxito", url: "/perfil.html?restaurante=" + email }); 
          }
        });
      }
    }
  })
});


// Ruta POST para el inicio de sesión (cliente)
app.post('/loginCliente', (req, res) => {
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

// Ruta POST para el inicio de sesión (restaurante)
app.post("/loginRestaurant", (req, res) => {
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



// Ruta POST para agregar plato
app.post("/agregarPlato", (req,res)=>{
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
                conexion.query(registrarPlato,function(mistake,result){
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
app.post("/consultarPlatos",(req,res)=>{
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


// Ruta POST para agregar mesa
app.post ("/agregarMesa", (req,res)=>{
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
              res.status(200).send('<script>alert("Mesa registrada con éxito"); window.location.href = "/";</script>');
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
              res.status(200).send('<script>alert("Mesa registrada con éxito"); window.location.href = "/";</script>');
            }
          })
        }
      }
    })
})

//RUTA POST para actualizar la informacion de un restaurante
app.post("/actuInfoRestau",(req,res)=>{
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

//Ruta GET para consulta un plato en especifico
app.get("./consultarPlato",(req,res)=>{
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

// Ruta POST para agregar reserva
app.post("/agregarReserva", (req,res)=>{
  const datos = req.body;
  const rest = datos.restaurante;
  let fecha = datos.fecha;
  let hora = 12;
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
                              console.log("Se logro");
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
                               console.log("Se logro");
                             }
                          })
                        }
                    }
                  }
                })
             }else{//Si no hay mesas del restaurante con la capacidad requerida, entra aquí
               console.log("No hay mesas");
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
                              console.log("Se logro");
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
                               console.log("Se logro");
                             }
                          })
                        }
                    }
                  }
                })
             }else{//Si no hay mesas del restaurante con la capacidad requerida, entra aquí
              console.log("No hay mesas disponibles");
             }
           }
        })
     }
    } 
  })
  })

// Ruta GET para consultar una reserva de un cliente
app.get("/buscarReserva/:idReserva", (req, res) => {
  const idReserva = req.params.idReserva; // Obtiene el ID de la reserva de los parámetros de la ruta

  let buscarReserva = "SELECT * FROM reserva WHERE idReserva = '" + idReserva + "'";
  conexion.query(buscarReserva, (err, result) => {
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
  });
});

// Ruta GET para buscar una persona por correo
app.get("/buscarCliente/:correo", (req, res) => {
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
app.get("/traerClientes",(req,res)=>{
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

//Ruta GET que trae un restaurante por correo
app.get("/traeRest/:correoRes",(req,res)=>{
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

//Ruta GET que trae todos los Restaurantes
app.get("/traeRestaurantes",(req,res)=>{
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


//Ruta GET que trae todas las mesas de un restaurante
app.get("/buscarMesasRest/:correoRest",(req,res)=>{

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

//Ruta GET que trae todos las reservas de un restaurante
app.get("/buscarReservasRest/:correoRes",(req,res)=>{
    const correoRest = req.params.correoRes;
    console.log(correoRest);
    let traeReservas = "SELECT * FROM reserva WHERE correoRes = '"+correoRest+"'";
    conexion.query(traeReservas,(err,result)=>{
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

// Define una ruta GET para la ruta raíz ("/"). Cuando alguien visita esta ruta, la función de devolución de llamada se ejecuta.
// La función de devolución de llamada toma dos argumentos: un objeto de solicitud (que contiene información sobre la solicitud) y un objeto de respuesta (que se utiliza para enviar la respuesta).
app.get('/', (req, res) => {
  res.send('Esta es la raiz de la aplicación.');
});

// Inicia el servidor en el puerto especificado. Una vez que el servidor está en marcha, se ejecuta la función de devolución de llamada.
app.listen(port, () => {
  // Imprime un mensaje en la consola para que sepas que el servidor está en marcha.
  console.log(`Servidor corriendo en http://localhost:${port}`);
});