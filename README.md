# ReserveHoy
Este es un sistema de reservas en línea para varios restaurantes. Los usuarios pueden explorar el catálogo de restaurantes y realizar reservas. Los restaurantes pueden ver las reservas realizadas.

## Tabla de Contenidos
- [ReserveHoy](#reservehoy)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Funcionalidades](#funcionalidades)
  - [Casos de Uso](#casos-de-uso)
  - [Cómo Empezar](#cómo-empezar)
    - [Pre-requisitos](#pre-requisitos)
    - [Instalación](#instalación)
    - [Configuración](#configuración)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Documentación de la API](#documentación-de-la-api)
  - [Guía de Contribución](#guía-de-contribución)
  - [Licencia](#licencia)
  - [Agradecimientos](#agradecimientos)
  - [Información Adicional](#información-adicional)

## Funcionalidades
- **Para Usuarios:**
    - Explorar el catálogo de restaurantes disponibles.
    - Ver información detallada de cada restaurante (menú, horarios, ubicación).
    - Realizar reservas en línea de forma sencilla.
    - Consultar el historial de reservas.
    - Modificar o cancelar reservas existentes (según políticas del restaurante).
- **Para Restaurantes:**
    - Gestionar la información de su restaurante (menú, horarios, capacidad).
    - Ver las reservas realizadas por los clientes.
    - Confirmar o rechazar reservas.
    - Administrar la disponibilidad de mesas.

## Casos de Uso
- **Usuario buscando un restaurante:** Un usuario quiere cenar en un restaurante italiano el sábado por la noche. Utiliza ReserveHoy para buscar restaurantes italianos disponibles, compara opciones, revisa menús y elige uno para reservar.
- **Usuario realizando una reserva:** Después de seleccionar un restaurante, el usuario elige la fecha, hora y número de personas para su reserva. Confirma la reserva y recibe una notificación.
- **Restaurante gestionando reservas:** El personal del restaurante accede al panel de ReserveHoy para ver las nuevas reservas, confirmar su disponibilidad y gestionar la ocupación de las mesas.
- **Usuario consultando su reserva:** Un usuario quiere verificar los detalles de una reserva que hizo anteriormente. Accede a su historial de reservas en ReserveHoy.

## Cómo Empezar

### Pre-requisitos
Asegúrate de tener instalado lo siguiente en tu sistema:
- [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)
- Un gestor de bases de datos SQL (por ejemplo, [MySQL](https://www.mysql.com/), [PostgreSQL](https://www.postgresql.org/), [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads)). El proyecto utiliza SQL Server por defecto, como se ve en `Server/db/data/reservehoy.sql`.

### Instalación
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/ReserveHoy.git
   cd ReserveHoy
   ```
2. **Instala las dependencias del servidor:**
   ```bash
   cd Server
   npm install
   cd ..
   ```
3. **Instala las dependencias del cliente (si aplica, basado en la estructura actual parece ser principalmente archivos estáticos servidos por Express):**
   El proyecto sirve archivos estáticos desde la carpeta `public`. No hay un paso de `npm install` separado para el frontend en la estructura actual.

### Configuración
1. **Configura la base de datos:**
   - Crea una base de datos en tu gestor SQL.
   - Importa el esquema y los datos iniciales desde `Server/db/data/reservehoy.sql`.
   - Actualiza la configuración de la conexión a la base de datos en `Server/db/conexion.js` con tus credenciales y detalles de la base de datos:
     ```javascript
     const sql = require('mssql');

     const config = {
         user: 'tu_usuario_db', // Reemplaza con tu usuario de SQL Server
         password: 'tu_password_db', // Reemplaza con tu contraseña
         server: 'localhost', // O la dirección de tu servidor de base de datos
         database: 'reservehoy', // El nombre de la base de datos que creaste
         options: {
             encrypt: true, // Usar true si te conectas a Azure SQL Database
             trustServerCertificate: true // Cambiar a false en producción si tienes un certificado válido
         }
     };

     // ... (resto del archivo)
     ```

2. **Variables de entorno (Recomendado):**
   Para una mejor gestión de la configuración, especialmente en producción, considera usar variables de entorno para los detalles de la conexión a la base de datos. Puedes usar un paquete como `dotenv`.
   - Crea un archivo `.env` en la carpeta `Server`:
     ```
     DB_USER=tu_usuario_db
     DB_PASSWORD=tu_password_db
     DB_SERVER=localhost
     DB_DATABASE=reservehoy
     ```
   - Modifica `Server/db/conexion.js` para cargar estas variables:
     ```javascript
     // Al inicio de Server/db/conexion.js
     require('dotenv').config();
     const sql = require('mssql');

     const config = {
         user: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         server: process.env.DB_SERVER,
         database: process.env.DB_DATABASE,
         options: {
             encrypt: true,
             trustServerCertificate: true
         }
     };
     // ...
     ```
   - Asegúrate de añadir `.env` a tu archivo `.gitignore` para no subir credenciales al repositorio.

3. **Inicia el servidor:**
   ```bash
   cd Server
   npm start
   ```
   Por defecto, el servidor debería iniciarse en `http://localhost:3000` (o el puerto configurado en `Server/app/server.js`).

## Tecnologías Utilizadas
El sistema de reservas en línea ReserveHoy utiliza una variedad de tecnologías para su desarrollo y funcionamiento:

- **Backend:**
    - **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
    - **Express**: Framework web para Node.js, utilizado para construir la API RESTful.
    - **SQL Server (mssql)**: Sistema de gestión de bases de datos relacional para almacenar y administrar datos.
- **Frontend:**
    - **HTML5**: Lenguaje de marcado para estructurar las páginas web.
    - **CSS3**: Lenguaje de estilos para diseñar la interfaz de usuario.
    - **JavaScript (Vanilla JS)**: Utilizado para la interactividad del lado del cliente y la manipulación del DOM.
    - **Bootstrap 5**: Framework de CSS para un diseño responsive y componentes de UI predefinidos.
- **Herramientas de Desarrollo:**
    - **npm**: Gestor de paquetes para Node.js.
    - **Git & GitHub**: Para control de versiones y colaboración.

## Documentación de la API
La documentation detallada de la API, incluyendo endpoints, parámetros de solicitud, formatos de respuesta y ejemplos, se encuentra en el archivo [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## Guía de Contribución
Hemos preparado una guía detallada para aquellos que deseen contribuir al proyecto. Por favor, consulta [CONTRIBUTING.md](./CONTRIBUTING.md) para obtener información sobre cómo reportar bugs, proponer nuevas funcionalidades, configurar tu entorno de desarrollo y nuestras convenciones de código.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para obtener más información.

## Agradecimientos
- Icono de "letra r" creado por Laisa Islam Ani - Flaticon.
- Componente de contador de Bootstrap por dkstudio, obtenido de Bootsnipp.
- Ilustración de botella por Pixabay.
Consulta el archivo [Creditos.txt](./Creditos.txt) para más detalles.

## Información Adicional
Este es un proyecto desarrollado con fines académicos para demostrar la implementación de un sistema de reservas en línea.
 
