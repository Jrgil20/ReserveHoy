const express = require('express');
// importa el módulo body-parser. Esto te permite usar la funcionalidad de body-parser en tu archivo.
const bodyParser = require('body-parser');
// Importa el módulo fs. Esto te permite usar la funcionalidad de fs en tu archivo.
const fs = require('fs');

const path = require('path');

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

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(express.json());

// Define el puerto en el que se ejecutará tu servidor.
const port = 3000;

// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'view', 'index.html'));
});

const clienteRoutes = require('../routes/clienteRoutes');

const restauranteRoutes = require('../routes/restauranteRoutes');

const reservaRoutes = require('../routes/reservaRoutes');

const mesaRoutes = require('../routes/mesaRoutes');

const platosRoutes = require('../routes/platoRoutes');


app.use(clienteRoutes);

app.use(restauranteRoutes);

app.use(reservaRoutes);

app.use(mesaRoutes);

app.use(platosRoutes);


// Define una ruta GET para la ruta raíz ("/"). 
app.get('/', (req, res) => {
  res.send('Esta es la raiz de la aplicación.');
});

app.listen(port, () => {
  // Imprime un mensaje en la consola para que sepas que el servidor está en marcha.
  console.log(`Servidor corriendo en http://localhost:${port}`);
});