# Guía de Contribución para ReserveHoy

¡Gracias por tu interés en contribuir a ReserveHoy! Agradecemos cualquier ayuda, desde la corrección de errores tipográficos hasta la implementación de nuevas funcionalidades.

## Tabla de Contenidos
- [Cómo Contribuir](#cómo-contribuir)
  - [Reportando Bugs](#reportando-bugs)
  - [Sugiriendo Mejoras o Nuevas Funcionalidades](#sugiriendo-mejoras-o-nuevas-funcionalidades)
  - [Tu Primera Contribución de Código](#tu-primera-contribución-de-código)
  - [Proceso de Pull Request](#proceso-de-pull-request)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Convenciones de Código](#convenciones-de-código)
  - [JavaScript](#javascript)
  - [Mensajes de Commit](#mensajes-de-commit)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Comunidad](#comunidad)

## Cómo Contribuir

### Reportando Bugs
Si encuentras un bug, por favor asegúrate de que aún no haya sido reportado buscando en los [Issues de GitHub](https://github.com/tu-usuario/ReserveHoy/issues).

Si no encuentras un issue abierto que trate el problema, ábrelo tú mismo. Asegúrate de incluir:
- Un **título claro y descriptivo**.
- Una **descripción detallada** del problema.
- **Pasos para reproducir** el bug.
- **Comportamiento esperado** y **comportamiento actual**.
- **Capturas de pantalla** o videos si ayudan a ilustrar el problema.
- **Información de tu entorno** (versión del navegador, sistema operativo, versión de Node.js, etc.), si es relevante.

### Sugiriendo Mejoras o Nuevas Funcionalidades
Las sugerencias son bienvenidas. Puedes proponer nuevas funcionalidades o mejoras a las existentes:
1. Busca en los [Issues de GitHub](https://github.com/tu-usuario/ReserveHoy/issues) para ver si ya existe una sugerencia similar.
2. Si no es así, abre un nuevo issue. Describe claramente:
   - La **funcionalidad o mejora** propuesta.
   - El **problema que resuelve** o el **valor que añade**.
   - **Casos de uso** relevantes.
   - **Posibles implementaciones** (opcional).

### Tu Primera Contribución de Código
Si eres nuevo contribuyendo a proyectos de código abierto, ¡bienvenido! Puedes empezar buscando issues etiquetados como `good first issue` o `help wanted`.

Antes de empezar a programar:
1. Asegúrate de que haya un issue abierto para el cambio que quieres hacer. Si no lo hay, crea uno y discute tu propuesta.
2. Comunica en el issue que te gustaría trabajar en él para evitar que varias personas trabajen en lo mismo.

### Proceso de Pull Request (PR)
1. **Haz un Fork** del repositorio a tu propia cuenta de GitHub.
2. **Clona tu fork** localmente: `git clone https://github.com/tu-usuario-github/ReserveHoy.git`
3. **Crea una nueva rama** para tus cambios: `git checkout -b nombre-descriptivo-de-la-rama` (ej. `fix/login-bug` o `feat/user-profiles`).
4. **Realiza tus cambios** en la nueva rama. Asegúrate de seguir las [Convenciones de Código](#convenciones-de-código).
5. **Añade pruebas** para tus cambios si es aplicable.
6. **Haz commit** de tus cambios: `git commit -m "Mensaje de commit claro y conciso"` (Ver [Mensajes de Commit](#mensajes-de-commit)).
7. **Sube tus cambios** a tu fork: `git push origin nombre-descriptivo-de-la-rama`.
8. **Abre un Pull Request** desde tu rama en tu fork hacia la rama `main` (o la rama de desarrollo principal) del repositorio original.
   - Proporciona un título claro y una descripción detallada de tus cambios en el PR.
   - Enlaza el issue que tu PR resuelve (ej. "Closes #123").
9. **Espera la revisión.** Uno de los mantenedores revisará tu PR. Puede que te pidan hacer algunos cambios.
10. Una vez aprobado, tu PR será fusionado. ¡Gracias por tu contribución!

## Configuración del Entorno de Desarrollo
Sigue las instrucciones detalladas en la sección "[Cómo Empezar](./README.md#cómo-empezar)" del archivo `README.md` para configurar el proyecto, incluyendo pre-requisitos, instalación de dependencias y configuración de la base de datos.

## Convenciones de Código

### JavaScript
- **Estilo:** Intentamos seguir un estilo de código consistente. Considera usar un linter como ESLint (configuración no provista actualmente en el proyecto, pero es una buena práctica).
- **Comentarios:** Comenta tu código donde sea necesario para explicar lógica compleja o decisiones de diseño.
- **Nombres:** Usa nombres descriptivos para variables, funciones y clases.

### Mensajes de Commit
Sigue estas convenciones para los mensajes de commit:
- **Tipo:** Comienza el mensaje con un tipo, como `feat:` (nueva funcionalidad), `fix:` (corrección de bug), `docs:` (cambios en documentación), `style:` (formato, punto y coma faltante, etc.), `refactor:` (refactorización de código), `test:` (añadir o corregir pruebas), `chore:` (actualizar tareas de build, etc.).
- **Asunto conciso:** Después del tipo, escribe un asunto breve y en imperativo (ej. `feat: Agregar inicio de sesión con Google`).
- **Cuerpo (opcional):** Si es necesario, añade un cuerpo más detallado después de una línea en blanco, explicando el *qué* y el *porqué* del cambio.

**Ejemplo:**
```
feat: Implementar registro de nuevos restaurantes

Añade la funcionalidad para que los propietarios de restaurantes
puedan registrar sus establecimientos en la plataforma.
Esto incluye la validación de datos y la creación de
una nueva entrada en la tabla 'restaurante'.
```

## Ejecución de Pruebas
Actualmente, el proyecto no cuenta con un framework de pruebas automatizadas configurado. Esta es un área importante para futuras contribuciones.

Si añades nuevas funcionalidades o corriges bugs, por favor, realiza pruebas manuales exhaustivas para asegurar que todo funciona como se espera. Describe los pasos de prueba que realizaste en tu Pull Request.

Idealmente, se deberían añadir pruebas unitarias y de integración. Si tienes experiencia con frameworks como Jest, Mocha, Chai, o Supertest para Node.js/Express, tu contribución en esta área sería muy valiosa.

## Comunidad
(Esta sección puede expandirse si el proyecto crece y se forma una comunidad alrededor de él, por ejemplo, añadiendo enlaces a un chat de Discord, foro, etc.)

¡Gracias de nuevo por tu interés en contribuir!
