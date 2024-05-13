// Importa el módulo Express. Esto te permite usar la funcionalidad de Express en tu archivo.
const express = require('express');
// importa el módulo body-parser. Esto te permite usar la funcionalidad de body-parser en tu archivo.
const bodyParser = require('body-parser');
// Importa el módulo fs. Esto te permite usar la funcionalidad de fs en tu archivo.
const fs = require('fs');

//Importa el modulo de mysql. Permite hacer la conexion con la base de datos
const mysql = require('mysql');

//conexion con la base de datos
const conexion = mysql.createConnection({
    host: "localhost",
    database: "reservehoy",
    user:"root",
    password: ""
}); 

// Crea una nueva aplicación Express. Esto es lo que realmente maneja las solicitudes y respuestas.
const app = express();

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static('public'));

//para usar ejs (motor de vista)
app.set("view engine", "ejs");

//para reconocer los datos que ingrese el usuario
app.use(express.urlencoded({ extended: false }));

//para reconocer los objetos que tengan la extesion .json
app.use(express.json());

// Define el puerto en el que se ejecutará tu servidor.
const port = 3000;

// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// Ruta POST para el registro de clientes 
app.post("/register", (req, res) => {
  const datos = req.body;
  
  let {name,email,telefono,password} = datos;
  
  //busca si el correo ya esta registrado
  let buscar = "SELECT * FROM cliente WHERE correo = '"+email+"'";
  //se hace la consulta
  conexion.query(buscar,function(err,row){
     if(err){
      throw err;
    }else{
      //verifica en la tablas si el correo ya esta registrado, si esta es mayor a 0
      if (row.length > 0){
        console.log('El correo ya está registrado');
      }else{
        let register = "INSERT INTO cliente (NombreApellido, correo, password, telefono) VALUES ('"+name+"','"+email+"','"+password+"','"+telefono+"')"
  
        conexion.query(register,function(err,result){
          if(err){
            console.log(err);
          }else{
            res.status(200).send('<script>alert("Usuario registrado con éxito"); window.location.href = "/";</script>');
          }
        
        });
      }
    }
  })

});


//Ruta POST registrar restaurante
app.post("/registerrestau", (req,res) => {
  const datos = req.body;
  
  let {name,email,phone,password} = datos;
  
  
  //busca si el correo ya esta registrado
  let buscar = "SELECT * FROM restaurante WHERE correoRes = '"+email+"'";
  //se hace la consulta
  conexion.query(buscar,function(err,row){
     if(err){
      throw err;
    }else{
      //verifica en la tablas si el correo ya esta registrado, si esta es mayor a 0
      if (row.length > 0){
        console.log('El correo ya está registrado');
      }else{
        let register = "INSERT INTO restaurante (nombre, telefono, clave, correoRes) VALUES ('"+name+"','"+phone+"','"+password+"','"+email+"')"
        conexion.query(register,function(err,result){
          if(err){
            console.log(err);
          }else{
            res.status(200).send('<script>alert("Restaurante registrado con éxito"); window.location.href = "/";</script>');
          }
        
        });
      }
    }
  })
});

// Ruta POST para el inicio de sesión (cliente)
app.post('/login', (req, res) => {
  const datos = req.body;
  let email = datos.email;
  let password = datos.pass;
  
  const buscarUsuario = "SELECT * FROM cliente";
  conexion.query(buscarUsuario,(err,lista)=>{
        if(err){
          throw err;
        }else{
          let bandera = 0;
           for(i=0;i<lista.length;i++){
             if((lista[i].correo === email)&&(lista[i].clave === password)){
                bandera += 1;
                break;
             }
           }
           if(bandera != 1){
            res.status(400).send('<script>alert("Usuario o clave invalidada");</script>');
           }else{
            res.status(200).send('<script>alert("Inicio de sesión exitoso"); window.location.href = "/";</script>');
           }
        }
  })
    
});

// Ruta POST para el inicio de sesión (restaurante)
app.post("/loginres", (req, res) => {
  const datos = req.body;
  let email = datos.email;
  let password = datos.pass;
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
            res.status(400).send('<script>alert("Usuario o clave invalidada");</script>');
          }else{
            res.status(200).send('<script>alert("Inicio de sesión exitoso"); window.location.href = "/";</script>');     
          }

        }
  })
  
});

// Ruta POST para agregar plato
app.post("./agregarPlato", (req,res)=>{
  const datos = req.body;
  const rest = req.body.restaurante;

  let nombrePlato = datos.nombrePlato;
  let tipo = datos.tipo;
  let precio = datos.precio;
  let descripcion = datos.descripcion;

  //busca si ya existe un plato con el mismo nombre en un restaurante
  let buscarPlatoRest = "SELECT * FROM restaurante WHERE nombrePlato = '"+nombrePlato+"'";

  //se hace la consulta
  conexion.query(buscarPlatoRest,function(err,row){
    if (err){
      throw err;
    }else{
      //verifica en las tablas si ya existe un plato con el mismo nombre, si esta es mayor a 0
      if(row.length>0){
        console.log("Esta plato ya existe en el menu");
      }else{
        let registerPlato = "INSERT INTO platos (nombrePlato, tipo, precio, descrip) VALUES ('"+nombrePlato+"','"+tipo+"','"+precio+"','"+descripcion+"',)"
        
        let registerPlatoRest = "UPDATE restaurante SET nombrePlato ='"+nombrePlato+"' WHERE nombreRes = '"+rest+"'";
        //hace consulta en platos
        conexion.query(registerPlato,(err,res)=>{
          if(err){
            console.log(err);
          }else{
            res.status(200).send('<script>alert("Plato registrado con éxito"); window.location.href = "/";</script>');
          }

        })
        //hace consulta en restaurante
        conexion.query(registerPlatoRest,(err,res)=>{
          if(err){
            console.log(err);
          }else{
            res.status(200).send('<script>alert("Plato registrado con éxito"); window.location.href = "/";</script>');
          }

        })

      }
    }
  })
})


//arreglar esta ruta 
// Ruta POST para consultar todos los platos de un restaurante
app.post("./consultarPlatos",(req,res)=>{
  //consulta para traer todos los platos
  let restaurante = req.body.restaurante;
  const platos = "SELECT * FROM platos WHERE nombreRes = '"+restaurante+"'";
  //hace la consulta
  conexion.query(platos,(err,list)=>{
    if(err){
      console.log(err);
    }else{
      console.log(list);
    }
  })
});


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