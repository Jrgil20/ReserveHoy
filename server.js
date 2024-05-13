// Importa el módulo Express. Esto te permite usar la funcionalidad de Express en tu archivo.
const express = require('express');
// importa el módulo body-parser. Esto te permite usar la funcionalidad de body-parser en tu archivo.
const bodyParser = require('body-parser');
// Importa el módulo fs. Esto te permite usar la funcionalidad de fs en tu archivo.
const fs = require('fs');

//Importa el modulo de mysql. Permite hacer la conexion con la base de datos
const mysql = require('mysql');

//conexion con la base de datos
let conexion = mysql.createConnection({
    host: "localhost",
    database: "reservahoy",
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
  
  let name = datos.name;
  let email = datos.email;
  let password = datos.password;
  
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
        let register = "INSERT INTO cliente (NombreApellido, correo, clave) VALUES ('"+name+"','"+email+"','"+password+"')"
  
        conexion.query(register,function(err,res){
          if(err){
            console.log(err);
          }else{
            console.log('Usuario registrado con éxito');
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
  let buscar = "SELECT * FROM restaurante WHERE correo = '"+name+"'";
  //se hace la consulta
  conexion.query(buscar,function(err,row){
     if(err){
      throw err;
    }else{
      //verifica en la tablas si el correo ya esta registrado, si esta es mayor a 0
      if (row.length > 0){
        console.log('El correo ya está registrado');
      }else{
        let register = "INSERT INTO restaurante (nombreRes, correo, telefono, clave) VALUES ('"+name+"','"+email+"','"+phone+"','"+password+"')"
        conexion.query(register,function(err,res){
          if(err){
            console.log(err);
          }else{
            console.log('Restaurante registrado con éxito');
          }
        
        });
      }
    }
  })
});

// Ruta POST para el inicio de sesión (cliente)
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (users[email] && users[email].password === password) {
    // En una aplicación real, deberías crear una sesión y enviar una cookie al cliente
    res.status(200).send('Inicio de sesión exitoso');
  } else {
    res.status(400).send('Nombre de usuario o contraseña incorrectos');
  }
});

// Ruta POST para agregar plato
app.post("./agregaPlato", (req,res)=>{
  const datos = req.body;
  
  let nombrePlato = datos.nombrePlato;
  let tipo = datos.tipo;
  let precio = datos.precio;
  let descripcion = datos.descripcion;

  //busca si ya existe un plato con el mismo nombre
  let buscarPlato = "SELECT * FROM platos WHERE correo = '"+nombrePlato+"'";

  //se hace la consulta
  conexion.query(buscarPlato,function(err,row){
    if (err){
      throw err;
    }else{
      //verifica en las tablas si ya existe un plato con el mismo nombre, si esta es mayor a 0
      if(row.length>0){
        console.log("Esta plato ya existe en el menu");
      }else{
        let registerPlato = "INSERT INTO platos (nombrePlato, tipo, precio, descrip) VALUES ('"+nombrePlato+"','"+tipo+"','"+precio+"','"+descripcion+"',)"

        //hace consulta
        conexion.query(registerPlato,(err,res)=>{
          if(err){
            console.log(err);
          }else{
            console.log('Plato registrado con éxito');
          }

        })
      }
    }
  })
})

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