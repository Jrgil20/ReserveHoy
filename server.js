// Importa el módulo Express. Esto te permite usar la funcionalidad de Express en tu archivo.
const express = require('express');
// importa el módulo body-parser. Esto te permite usar la funcionalidad de body-parser en tu archivo.
const bodyParser = require('body-parser');
// Importa el módulo fs. Esto te permite usar la funcionalidad de fs en tu archivo.
const fs = require('fs');


// Crea una nueva aplicación Express. Esto es lo que realmente maneja las solicitudes y respuestas.
const app = express();

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Define el puerto en el que se ejecutará tu servidor.
const port = 3000;

// Objeto de usuarios para este ejemplo
let users = {};
try {
  const data = fs.readFileSync('users.json', 'utf8');
  users = JSON.parse(data);
} catch (err) {
  console.error(err);
}

// Ruta para servir index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta POST para el registro
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Aquí deberías agregar validaciones para los datos de entrada

  if (users[username]) {
    res.status(400).send('El nombre de usuario ya existe');
  } else {
    // En una aplicación real, nunca debes almacenar las contraseñas en texto plano
    // Deberías usar un algoritmo de hash como bcrypt
    users[username] = { password: password };
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.status(200).send('Usuario registrado con éxito');
  }
});

// Ruta POST para el inicio de sesión
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (users[username] && users[username].password === password) {
    // En una aplicación real, deberías crear una sesión y enviar una cookie al cliente
    res.status(200).send('Inicio de sesión exitoso');
  } else {
    res.status(400).send('Nombre de usuario o contraseña incorrectos');
  }
});


// Define una ruta GET para la ruta raíz ("/"). Cuando alguien visita esta ruta, la función de devolución de llamada se ejecuta.
// La función de devolución de llamada toma dos argumentos: un objeto de solicitud (que contiene información sobre la solicitud) y un objeto de respuesta (que se utiliza para enviar la respuesta).
app.get('/', (req, res) => {
  // Envía la respuesta "Hola Mundo!".
  res.send('Servidor de prueba JR');
});

// Inicia el servidor en el puerto especificado. Una vez que el servidor está en marcha, se ejecuta la función de devolución de llamada.
app.listen(port, () => {
  // Imprime un mensaje en la consola para que sepas que el servidor está en marcha.
  console.log(`Servidor corriendo en http://localhost:${port}`);
});