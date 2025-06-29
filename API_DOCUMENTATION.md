## Documentación de la API de ReserveHoy

Esta documentación detalla los endpoints de la API de ReserveHoy, utilizados para gestionar clientes, restaurantes, mesas, platos y reservas.

### Formato General de Solicitudes y Respuestas
- **Formato de Solicitud:** Todas las solicitudes que envían datos (POST, PUT) esperan un cuerpo en formato JSON.
- **Formato de Respuesta:** Las respuestas de la API son en formato JSON.
- **Autenticación:** Actualmente, la API no implementa un sistema de tokens de autenticación robusto para todas las rutas. Algunas rutas de registro e inicio de sesión manejan la lógica de usuario, pero las rutas subsiguientes no están protegidas. Esto es un área de mejora importante.

---

### 1. Rutas de Clientes (`/api/clientes`)

Gestiona la información y autenticación de los clientes.

**Archivo:** `Server/routes/clienteRoutes.js`

---

#### `POST /api/clientes/registerClient`
Registra un nuevo cliente en el sistema.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "name": "Nombre Completo",
    "email": "cliente@example.com",
    "phone": "1234567890",
    "password": "micontraseña"
  }
  ```
- **Respuesta Exitosa (200):**
  ```json
  {
    "message": "Cliente registrado con éxito",
    "url": "/view/perfilCliente.html?cliente=cliente@example.com"
  }
  ```
- **Respuesta de Error (409):** Si el correo ya está registrado.
  ```json
  {
    "message": "El correo ya está registrado",
    "url": "/view/register.html"
  }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `POST /api/clientes/loginCliente`
Inicia sesión para un cliente existente.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "email": "cliente@example.com",
    "password": "micontraseña"
  }
  ```
- **Respuesta Exitosa (200):**
  ```json
  {
    "message": "Inicio de sesión exitoso",
    "url": "/view/perfilCliente.html?cliente=cliente@example.com"
  }
  ```
- **Respuesta de Error (400):** Usuario o contraseña inválida.
  ```json
  {
    "message": "Usuario o clave invalidada"
  }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/clientes/buscarCliente/:correo`
Busca un cliente por su dirección de correo electrónico.

- **Parámetros de Ruta:**
  - `correo` (string): Correo electrónico del cliente a buscar.
- **Respuesta Exitosa (200):**
  ```json
  {
    "idCliente": 1, // ID generado por la BD
    "NombreApellido": "Nombre Completo",
    "correo": "cliente@example.com",
    "password": "micontraseña", // Considerar no devolver la contraseña
    "telefono": "1234567890"
  }
  ```
- **Respuesta de Error (404):** Si no se encuentra el cliente o no hay correos registrados.
  ```json
  { "message": "No se encontró ninguna persona con ese correo" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/clientes/traerClientes`
Obtiene una lista de todos los clientes registrados.

- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "idCliente": 1,
      "NombreApellido": "Nombre Uno",
      "correo": "cliente1@example.com",
      "password": "password1",
      "telefono": "1111111111"
    },
    {
      "idCliente": 2,
      "NombreApellido": "Nombre Dos",
      "correo": "cliente2@example.com",
      "password": "password2",
      "telefono": "2222222222"
    }
  ]
  ```
- **Respuesta de Error (404):** Si no hay clientes registrados.
  ```json
  { "message": "No hay clientes" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `DELETE /api/clientes/eliminarCliente`
Elimina un cliente y todas sus reservas asociadas.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "correo": "cliente@example.com"
  }
  ```
- **Respuesta Exitosa (200):**
  ```json
  {
    "message": "Perfil eliminado con exitoso",
    "url": "/"
  }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `PUT /api/clientes/modificarCliente`
Modifica los datos de un cliente existente (nombre y teléfono).

- **Cuerpo de la Solicitud:**
  ```json
  {
    "NombreApellido": "Nuevo Nombre Completo",
    "correo": "cliente@example.com", // Usado para identificar al cliente
    "telefono": "0987654321"
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Perfil modificado con éxito
  ```
  (Nota: Debería devolver JSON consistentemente, ej. `{"message": "Perfil modificado con éxito"}`)
- **Respuesta de Error (500):** Error interno del servidor.

---

### 2. Rutas de Mesas (`/api/mesas`)

Gestiona las mesas de los restaurantes.

**Archivo:** `Server/routes/mesaRoutes.js`

---

#### `POST /api/mesas/agregarMesa`
Agrega una nueva mesa a un restaurante. El `numMesa` y `id_Mesa` se generan aleatoriamente.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "restaurante": "restaurante@example.com", // correoRes del restaurante
    "capacidad": 4 // Número de personas
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Mesa registrada con éxito
  ```
  (Nota: Debería devolver JSON, ej. `{"message": "Mesa registrada con éxito", "id_Mesa": 123, "numMesa": 45}`)
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/mesas/buscarMesasRest/:correoRest`
Obtiene todas las mesas de un restaurante específico.

- **Parámetros de Ruta:**
  - `correoRest` (string): Correo electrónico del restaurante.
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "id_Mesa": 1,
      "status": 0, // 0 para disponible, 1 para ocupada/no disponible
      "capacidad": 4,
      "numMesa": 101,
      "correoRes": "restaurante@example.com"
    },
    // ... más mesas
  ]
  ```
- **Respuesta de Error (404):** Si no hay mesas para ese restaurante.
  ```json
  { "message": "No hay mesas para este restaurante" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `DELETE /api/mesas/eliminarMesa`
Elimina una mesa de un restaurante. Si la mesa tiene reservas, intenta reasignarlas a otras mesas disponibles o las elimina.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "idAEliminar": 1, // id_Mesa
    "correoRes": "restaurante@example.com"
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Mesa eliminada con éxito
  ```
  (Nota: Debería devolver JSON)
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `PUT /api/mesas/modificarMesa`
Modifica la capacidad y el estado de una mesa. Si la nueva capacidad es menor y hay reservas afectadas, intenta reasignarlas.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "id_Mesa": 1,
    "capacidad": 2,
    "status": 0, // 0 para disponible, 1 para no disponible
    "correoRes": "restaurante@example.com"
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Mesa modificada con éxito y reserva actualizada
  ```
  o
  ```
  Mesa modificada con éxito
  ```
  (Nota: Debería devolver JSON)
- **Respuesta de Error (404):** Si no hay mesas disponibles para reasignar reservas afectadas.
  ```
  No hay mesas disponibles que coincidan con la capacidad solicitada
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

### 3. Rutas de Platos (`/api/platos`)

Gestiona los platos del menú de los restaurantes.

**Archivo:** `Server/routes/platoRoutes.js`

---

#### `POST /api/platos/agregarPlato`
Agrega un nuevo plato al menú de un restaurante. `idPlato` se genera aleatoriamente.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "correoRestaurante": "restaurante@example.com",
    "nombrePlato": "Pasta Carbonara",
    "tipo": "Principal", // Ej: Entrada, Principal, Postre, Bebida
    "precio": 12.50,
    "descripcion": "Pasta fresca con huevo, queso pecorino, guanciale y pimienta negra."
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Plato agregado con éxito
  ```
  (Nota: Debería devolver JSON)
- **Respuesta de Error (409):** Si el plato ya existe en el menú de ese restaurante.
  ```
  Ese plato ya existe en el menu
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/platos/consultarPlatos/:correoRest`
Obtiene todos los platos del menú de un restaurante específico.

- **Parámetros de Ruta:**
  - `correoRest` (string): Correo electrónico del restaurante.
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "idPlato": 1,
      "nombrePlato": "Pasta Carbonara",
      "tipo": "Principal",
      "precio": 12.50,
      "descripcion": "Pasta fresca con huevo, queso pecorino, guanciale y pimienta negra.",
      "correoRes": "restaurante@example.com"
    },
    // ... más platos
  ]
  ```
- **Respuesta de Error (404):** Si no hay platos registrados para ese restaurante.
  ```json
  { "message": "No hay platos registrados para ese restaurante" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/platos/consultarPlato` (DEBE SER `GET /api/platos/consultarPlato/:nombrePlato/:correoRes` o similar)
Consulta un plato específico. **Nota:** Esta ruta actualmente espera el nombre del plato en `req.body`, lo cual no es estándar para GET. Debería usar parámetros de ruta o query. La implementación actual parece incompleta y solo hace `console.log`.

- **Cuerpo de la Solicitud (Actual, no estándar para GET):**
  ```json
  {
    "plato": "Pasta Carbonara"
  }
  ```
- **Respuesta:** Actualmente no envía respuesta JSON, solo logs en consola.

---

#### `DELETE /api/platos/eliminarPlato`
Elimina un plato del menú de un restaurante.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "nombrePlato": "Pasta Carbonara",
    "correoRes": "restaurante@example.com"
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Plato eliminado con éxito
  ```
  (Nota: Debería devolver JSON)
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `PUT /api/platos/modificarPlato`
Modifica los detalles de un plato existente.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "correoRes": "restaurante@example.com",
    "nombrePlato": "Pasta Carbonara", // Usado para identificar el plato a modificar
    "tipo": "Plato Fuerte",
    "precio": 13.00,
    "descripcion": "Descripción actualizada de la pasta."
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Plato modificado con éxito
  ```
  (Nota: Debería devolver JSON)
- **Respuesta de Error (500):** Error interno del servidor.

---

### 4. Rutas de Reservas (`/api/reservas`)

Gestiona las reservas realizadas por los clientes.

**Archivo:** `Server/routes/reservaRoutes.js`

---

#### `POST /api/reservas/agregarReserva`
Crea una nueva reserva. Intenta encontrar una mesa disponible que coincida con la capacidad y horario. `idReserva` se genera aleatoriamente.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "restaurante": "restaurante@example.com", // correoRes
    "fecha": "2024-07-20", // Formato YYYY-MM-DD
    "hora": "20:00", // Formato HH:MM
    "personas": 4, // numeroPersona
    "email": "cliente@example.com" // correoCli
  }
  ```
- **Respuesta Exitosa (200):**
  ```json
  {
    "message": "Reserva creada con éxito",
    "idReserva": 123 // ID de la reserva creada
  }
  ```
- **Respuesta de Conflicto/No Disponible (200 con mensaje específico o 409):**
  ```json
  { "message": "No hay mesa Disponible" }
  ```
  o
  ```json
  { "message": "Todas las mesas ocupadas" } // Podría ser 409 Conflict
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/reservas/traerReservas`
Obtiene una lista de todas las reservas en el sistema.

- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "idReserva": 1,
      "fecha": "2024-07-20T00:00:00.000Z", // Revisar formato de fecha/hora
      "hora": "20:00",
      "numeroPersona": 4,
      "correoCli": "cliente@example.com",
      "idMesa": 5,
      "correoRes": "restaurante@example.com",
      "estado": 0 // 0: Pendiente, 1: Confirmada
    },
    // ... más reservas
  ]
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/reservas/buscarReservasRest/:correoRes`
Obtiene todas las reservas de un restaurante específico.

- **Parámetros de Ruta:**
  - `correoRes` (string): Correo electrónico del restaurante.
- **Respuesta Exitosa (200):** (Similar a `/traerReservas`, pero filtrado)
- **Respuesta de Error (404):** Si no hay reservas para ese restaurante.
  ```json
  { "message": "No hay reservas para este restaurante" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/reservas/buscarReservasCli/:correoCli`
Obtiene todas las reservas de un cliente específico.

- **Parámetros de Ruta:**
  - `correoCli` (string): Correo electrónico del cliente.
- **Respuesta Exitosa (200):** (Similar a `/traerReservas`, pero filtrado)
- **Respuesta de Error (404):** Si no hay reservas para ese cliente.
  ```json
  { "message": "No hay reservas para este cliente" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/reservas/buscarReserva/:idReserva`
Consulta una reserva específica por su ID.

- **Parámetros de Ruta:**
  - `idReserva` (string/int): ID de la reserva.
- **Respuesta Exitosa (200):** (Un solo objeto de reserva)
- **Respuesta de Error (404):** Si no se encuentra la reserva.
  ```json
  { "message": "No se encontró ninguna reserva con ese ID" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `PATCH /api/reservas/confirmarReserva`
Confirma una reserva y envía un correo de notificación al cliente.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "idReserva": 123,
    "destinatario": "cliente@example.com", // Correo del cliente
    "restaurante": "Nombre del Restaurante", // Nombre para el correo
    "estado": 1 // Nuevo estado (ej. 1 para confirmada)
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Reserva confirmada y correo enviado
  ```
  (Nota: Debería devolver JSON)
- **Respuesta de Error (500):** Error al actualizar o enviar correo.

---

#### `DELETE /api/reservas/cancelarReserva`
Cancela una reserva y envía un correo de notificación al cliente.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "idReserva": 123,
    "destinatario": "cliente@example.com",
    "restaurante": "Nombre del Restaurante"
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Reserva cancelada con exito y notificaion al cliente enviada
  ```
  (Nota: Debería devolver JSON)
- **Respuesta de Error (500):** Error al eliminar o enviar correo.

---

#### `PUT /api/reservas/modificarReserva`
Modifica la fecha, hora y número de personas de una reserva existente. **Nota:** Esta ruta no verifica nuevamente la disponibilidad de mesas, lo cual podría llevar a conflictos.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "idReserva": 123,
    "fecha": "2024-07-21",
    "hora": "21:00",
    "numeroPersona": 2
  }
  ```
- **Respuesta Exitosa (200):**
  ```
  Reserva modificada con éxito
  ```
  (Nota: Debería devolver JSON)
- **Respuesta de Error (500):** Error interno del servidor.

---

### 5. Rutas de Restaurantes (`/api/restaurantes`)

Gestiona la información y autenticación de los restaurantes.

**Archivo:** `Server/routes/restauranteRoutes.js`

---

#### `POST /api/restaurantes/registerRestaurant`
Registra un nuevo restaurante.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "name": "Nombre del Restaurante",
    "email": "restaurante@example.com", // correoRes
    "phone": "1234567890",
    "password": "supersecreto" // clave
  }
  ```
- **Respuesta Exitosa (200):**
  ```json
  {
    "message": "Restaurante registrado con éxito",
    "url": "/view/perfil.html?restaurante=restaurante@example.com"
  }
  ```
- **Respuesta de Error (409):** Si el correo ya está registrado.
  ```json
  {
    "message": "El correo ya está registrado",
    "url": "/view/register.html"
  }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `POST /api/restaurantes/loginRestaurant`
Inicia sesión para un restaurante existente.

- **Cuerpo de la Solicitud:**
  ```json
  {
    "email": "restaurante@example.com",
    "password": "supersecreto"
  }
  ```
- **Respuesta Exitosa (200):**
  ```json
  {
    "message": "Inicio de sesión exitoso",
    "url": "/view/perfil.html?restaurante=restaurante@example.com"
  }
  ```
- **Respuesta de Error (400):** Usuario o contraseña inválida.
  ```json
  { "message": "Usuario o clave invalidada" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `PUT /api/restaurantes/actualizarInformacionRestaurante`
Actualiza la información detallada de un restaurante (dirección, descripción, horarios).

- **Cuerpo de la Solicitud:**
  ```json
  {
    "claveLocal": "restaurante@example.com", // correoRes
    "direccion": "Calle Falsa 123",
    "descripcion": "El mejor restaurante de la ciudad.",
    "horario": "Lunes a Viernes: 09:00 - 22:00", // horLunVier
    "horFin": "Sábado y Domingo: 10:00 - 23:00" // horFinDe
  }
  ```
- **Respuesta Exitosa (200):**
  ```json
  { "message": "Informacion agregada con exito" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/restaurantes/traeRest/:correoRes`
Obtiene la información de un restaurante específico por su correo.

- **Parámetros de Ruta:**
  - `correoRes` (string): Correo electrónico del restaurante.
- **Respuesta Exitosa (200):** (Objeto JSON con los datos del restaurante)
  ```json
  {
    "idRestaurante": 1, // ID generado por la BD
    "nombre": "Nombre del Restaurante",
    "telefono": "1234567890",
    "clave": "supersecreto", // Considerar no devolver la clave
    "correoRes": "restaurante@example.com",
    "direccion": "Calle Falsa 123",
    "descripcion": "El mejor restaurante de la ciudad.",
    "horLunVier": "Lunes a Viernes: 09:00 - 22:00",
    "horFinDe": "Sábado y Domingo: 10:00 - 23:00",
    "foto": null // Asumiendo que podría haber un campo para foto
  }
  ```
- **Respuesta de Error (404):** Si no se encuentra el restaurante.
  ```json
  { "message": "No hay un restaurante con este correo" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/restaurantes/traeHorarios/:correoRes`
Obtiene los horarios de un restaurante específico.

- **Parámetros de Ruta:**
  - `correoRes` (string): Correo electrónico del restaurante.
- **Respuesta Exitosa (200):**
  ```json
  {
    "horLunVier": "Lunes a Viernes: 09:00 - 22:00",
    "horFinDe": "Sábado y Domingo: 10:00 - 23:00"
  }
  ```
- **Respuesta de Error (404):** Si no se encuentra el restaurante.
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `GET /api/restaurantes/traeRestaurantes`
Obtiene una lista de todos los restaurantes registrados.

- **Respuesta Exitosa (200):** (Array de objetos de restaurante, similar a `/traeRest/:correoRes`)
- **Respuesta de Error (404):** Si no hay restaurantes.
  ```json
  { "message": "No hay restaurantes" }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `PUT /api/restaurantes/modificarInfoRestaurante`
Modifica la información de un restaurante (dirección, descripción, horarios). Similar a `actualizarInformacionRestaurante`.

- **Cuerpo de la Solicitud:** (Igual que `actualizarInformacionRestaurante`)
- **Respuesta Exitosa (200):**
  ```
  Restaurante modificado con éxito
  ```
  (Nota: Debería devolver JSON)
- **Respuesta de Error (500):** Error interno del servidor.

---

#### `DELETE /api/restaurantes/eliminarRestaurante`
Elimina un restaurante y todos sus datos asociados (platos, reservas, mesas).

- **Cuerpo de la Solicitud:**
  ```json
  {
    "correoRes": "restaurante@example.com"
  }
  ```
- **Respuesta Exitosa (200):**
  ```json
  {
    "message": "Perfil eliminado con exitoso",
    "url": "/"
  }
  ```
- **Respuesta de Error (500):** Error interno del servidor.

---

### Consideraciones Adicionales y Mejoras Sugeridas:
- **Consistencia en Respuestas:** Todas las respuestas deberían ser JSON. Algunos endpoints devuelven texto plano.
- **Manejo de Errores:** Estandarizar los códigos de estado HTTP y los mensajes de error.
- **Seguridad:**
    - Implementar autenticación basada en tokens (JWT) para proteger las rutas después del login.
    - No devolver contraseñas en las respuestas.
    - Validar y sanitizar todas las entradas del usuario para prevenir inyecciones SQL y XSS.
- **Validación de Datos:** Añadir validación más robusta para los datos de entrada (ej. formato de correo, tipo de datos).
- **Rutas GET con Cuerpo:** La ruta `GET /api/platos/consultarPlato` no debería esperar datos en el cuerpo de la solicitud.
- **Operaciones Transaccionales:** Para operaciones complejas que involucran múltiples tablas (ej. eliminar restaurante, reasignar reservas), considerar el uso de transacciones de base de datos para asegurar la atomicidad.
- **Documentación de Parámetros:** Especificar claramente si los parámetros son de ruta, query string o cuerpo de solicitud.
- **Códigos de Estado HTTP:** Usar códigos HTTP más específicos (ej. 201 Created para POST exitosos, 204 No Content para DELETE exitosos si no hay contenido que devolver).
- **Paginación y Filtrado:** Para las rutas que devuelven listas (ej. `/traerClientes`, `/traerRestaurantes`), considerar añadir paginación y opciones de filtrado/ordenación.
- **Pruebas:** Es fundamental añadir pruebas unitarias y de integración para la API.
- **Variables de Entorno:** Usar variables de entorno para configuraciones sensibles como credenciales de base de datos y secretos de JWT.
- **Configuración de Email:** Las credenciales del servicio de correo (`nodemailer`) están hardcodeadas. Deberían estar en variables de entorno.
- **IDs Aleatorios:** La generación de IDs aleatorios (`Math.floor(Math.random()*100)`) puede llevar a colisiones. Es preferible usar secuencias de la base de datos (autoincrementales) o UUIDs.
- **Lógica de Negocio en Rutas:** Parte de la lógica de negocio (ej. búsqueda de mesas disponibles) está directamente en los manejadores de ruta. Considerar moverla a módulos de servicio o helpers para mejorar la organización.
