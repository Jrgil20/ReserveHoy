const express = require('express');
// importa el módulo body-parser. Esto te permite usar la funcionalidad de body-parser en tu archivo.
const bodyParser = require('body-parser');
// Importa el módulo fs. Esto te permite usar la funcionalidad de fs en tu archivo.
const fs = require('fs');

// Actualiza la ruta de importación de la conexión
const conexion = require('./db/conexion');

const { error } = require('console');
const { url } = require('inspector');

// Usar insertarRestaurante donde sea necesario
const app = express();

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static('public'));

//para reconocer los datos que ingrese el usuario
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Define el puerto en el que se ejecutará tu servidor.
const port = 3000;

// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


const clienteRoutes = require('./routes/clienteRoutes');
const restauranteRoutes = require('./routes/restauranteRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
// Usa las rutas de clientes
app.use(clienteRoutes);
app.use(restauranteRoutes);
app.use(reservaRoutes);



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
              res.status(200).send('Mesa registrada con éxito');
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
              res.status(200).send('Mesa registrada con éxito');
            }
          })
        }
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