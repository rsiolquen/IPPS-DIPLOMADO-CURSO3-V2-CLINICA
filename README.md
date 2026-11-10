# API REST – Clínica Médica

Proyecto desarrollado para la Evaluación Integradora del Módulo 3 del Diplomado, enfocado en el desarrollo de una API REST utilizando Node.js, Express y MongoDB.

## Descripción

Esta API permite gestionar médicos y pacientes de una clínica mediante un sistema de autenticación y autorización.

Cada médico puede registrarse, iniciar sesión y administrar sus propios pacientes. El sistema incorpora medidas de seguridad para proteger las contraseñas, validar los tokens de acceso y restringir las operaciones sobre pacientes ajenos.

## Funcionalidades

- Registro e inicio de sesión de médicos.
- Autenticación mediante JSON Web Tokens (JWT).
- Almacenamiento seguro de contraseñas con bcrypt.
- Consulta de médicos por especialidad.
- Consulta del perfil del médico autenticado.
- Consulta de pacientes asociados a un médico.
- Creación, listado, consulta, actualización y eliminación de pacientes.
- Filtrado de pacientes por previsión.
- Asignación automática del médico responsable a partir del token.
- Control de permisos para modificar y eliminar pacientes.
- Validación de datos y manejo de errores HTTP.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- CORS
- Postman

## Requisitos previos

- Node.js instalado.
- Yarn como gestor de paquetes.
- MongoDB instalado y en ejecución.
- Git para clonar el repositorio.
- Postman para realizar pruebas de la API.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/rsiolquen/IPPS-DIPLOMADO-CURSO3-V2-CLINICA.git
cd IPPS-DIPLOMADO-CURSO3-V2-CLINICA
```

### 2. Instalar las dependencias

```bash
yarn install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/clinica
JWT_SECRET=REEMPLAZAR_POR_UNA_CLAVE_SECRETA_SEGURA
```

La variable `JWT_SECRET` debe contener una clave privada y segura.

**Importante:** el archivo `.env` está excluido del repositorio mediante `.gitignore`.

### 4. Iniciar MongoDB

Verificar que el servicio de MongoDB esté en ejecución.

### 5. Ejecutar la API

```bash
yarn dev
```

El servidor estará disponible en:

`http://localhost:3001`

## Endpoints de la API

Todas las rutas protegidas requieren enviar un token JWT en la cabecera:

`Authorization: Bearer TOKEN`

### Autenticación

| Método | Endpoint         | Descripción         | Requiere JWT |
| ------ | ---------------- | ------------------- | ------------ |
| POST   | `/auth/registro` | Registrar un médico | No           |
| POST   | `/auth/login`    | Iniciar sesión      | No           |

### Médicos

| Método | Endpoint                 | Descripción                               | Requiere JWT |
| ------ | ------------------------ | ----------------------------------------- | ------------ |
| GET    | `/medicos`               | Listar médicos                            | Sí           |
| GET    | `/medicos/perfil`        | Consultar perfil del médico autenticado   | Sí           |
| GET    | `/medicos/:id`           | Consultar médico por ID                   | Sí           |
| GET    | `/medicos/:id/pacientes` | Consultar pacientes asociados a un médico | Sí           |

El endpoint `GET /medicos` permite filtrar por especialidad mediante el parámetro `?especialidad=`.

### Pacientes

| Método | Endpoint         | Descripción                             | Requiere JWT |
| ------ | ---------------- | --------------------------------------- | ------------ |
| POST   | `/pacientes`     | Registrar un paciente                   | Sí           |
| GET    | `/pacientes`     | Listar pacientes del médico autenticado | Sí           |
| GET    | `/pacientes/:id` | Consultar paciente por ID               | Sí           |
| PUT    | `/pacientes/:id` | Actualizar un paciente propio           | Sí           |
| DELETE | `/pacientes/:id` | Eliminar un paciente propio             | Sí           |

El endpoint `GET /pacientes` permite filtrar por previsión mediante el parámetro `?prevision=`.

## Ejemplos de peticiones

### Registrar un médico

**POST** `/auth/registro`

```json
{
  "nombre": "Médico Ejemplo",
  "especialidad": "Pediatría",
  "email": "medico@ejemplo.com",
  "password": "ClaveEjemplo123"
}
```

**Respuesta esperada:** `201 Created`, incluyendo los datos del médico y un token JWT.

### Iniciar sesión

**POST** `/auth/login`

```json
{
  "email": "medico@ejemplo.com",
  "password": "ClaveEjemplo123"
}
```

**Respuesta esperada:** `200 OK`, incluyendo el token JWT necesario para acceder a las rutas protegidas.

### Registrar un paciente

**POST** `/pacientes`

Requiere autenticación mediante Bearer Token.

```json
{
  "nombre": "María González",
  "rut": "12345678-9",
  "fechaNacimiento": "1995-04-12",
  "prevision": "Fonasa",
  "telefono": "912345678",
  "email": "maria@ejemplo.cl"
}
```

**Respuesta esperada:** `201 Created`.

El campo `medico` se asigna automáticamente utilizando el identificador del médico autenticado.

### Filtrar pacientes por previsión

**GET** `/pacientes?prevision=Fonasa`

Devuelve los pacientes con previsión Fonasa que pertenecen al médico autenticado.

## Seguridad

- Las contraseñas se almacenan mediante hash utilizando bcrypt.
- Las contraseñas no se incluyen en las respuestas de la API.
- Los tokens JWT tienen una duración configurada de 2 horas.
- Las rutas protegidas requieren autenticación.
- Cada médico puede listar únicamente sus propios pacientes.
- Solo el médico responsable puede modificar o eliminar a sus pacientes.
- El médico tratante no puede modificarse mediante el cuerpo de una petición.
- Las variables de entorno sensibles se mantienen fuera del repositorio.

## Códigos HTTP

| Código | Significado                                             |
| ------ | ------------------------------------------------------- |
| 200    | Operación realizada correctamente                       |
| 201    | Recurso creado correctamente                            |
| 204    | Recurso eliminado, sin contenido de respuesta           |
| 400    | Datos inválidos o incompletos                           |
| 401    | Credenciales incorrectas, token ausente o inválido      |
| 403    | El usuario no tiene permisos para realizar la operación |
| 404    | Recurso no encontrado                                   |
| 409    | Conflicto por un dato duplicado                         |
| 500    | Error interno del servidor                              |

## Pruebas

Los endpoints fueron probados mediante Postman, verificando:

- Registro e inicio de sesión.
- Validación de tokens JWT.
- Creación, consulta, actualización y eliminación de pacientes.
- Filtros por especialidad y previsión.
- Restricciones de acceso entre médicos.
- Validación de campos obligatorios.
- Detección de registros duplicados.
- Manejo de códigos HTTP.

## Proyecto académico

Desarrollado como parte de la Evaluación Integradora del Módulo 3 del Diplomado.