# Entregable Node.js - API de productos

API REST desarrollada con Node.js, Express y Firebase Firestore para gestionar productos. El proyecto incluye autenticación con JWT: primero hay que iniciar sesión y luego enviar el token para consumir los endpoints de productos.

## Tecnologías usadas

- Node.js
- Express
- Firebase Firestore
- JSON Web Token
- dotenv

## Requisitos previos

Antes de levantar el proyecto necesitás tener instalado:

- Node.js
- npm
- Una configuración válida de Firebase / Firestore
- Postman, Thunder Client o cualquier cliente HTTP similar

## Instalación

Clonar o descargar el proyecto y luego instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las credenciales de Firebase y la clave secreta para JWT.

Ejemplo:

```env
port=3000

apiKey=TU_API_KEY
authDomain=TU_AUTH_DOMAIN
projectId=TU_PROJECT_ID
storageBucket=TU_STORAGE_BUCKET
messagingSenderId=TU_MESSAGING_SENDER_ID
appId=TU_APP_ID

JWT_SECRET_KEY=TU_CLAVE_SECRETA
```

Importante: el proyecto actualmente lee la variable `port` en minúscula. Si no se define, usa el puerto `3000` por defecto.

## Levantar el proyecto

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

Si todo está correcto, la consola debería mostrar:

```txt
servidor corriendo en puerto http://localhost:3000
```

Base URL:

```txt
http://localhost:3000
```

## Autenticación

El endpoint de login es público. Todos los endpoints de productos están protegidos por el middleware de autenticación.

Primero hay que iniciar sesión en:

```txt
POST /auth/login
```

Usuario de prueba:

```json
{
  "email": "correo@prueba.com",
  "password": "1234"
}
```

Respuesta esperada:

```json
{
  "token": "TOKEN_GENERADO"
}
```

Luego, para consumir `/products`, enviar el token en el header:

```txt
Authorization: Bearer TOKEN_GENERADO
```

El token vence después de 1 hora.

## Formato de datos

La API acepta cuerpos en formato JSON y también `x-www-form-urlencoded`.

Para JSON:

```txt
Content-Type: application/json
```

Para form encoded:

```txt
Content-Type: application/x-www-form-urlencoded
```

Campos principales de un producto:

```json
{
  "nombre": "Remera",
  "categoria": "Ropa",
  "color": "Rojo",
  "precio": 15000,
  "stock": 10
}
```

Validaciones principales:

- `nombre`, `categoria` y `color` no pueden venir vacíos.
- `nombre`, `categoria` y `color` deben respetar una longitud mínima.
- `precio` y `stock` no pueden venir vacíos.
- `precio` y `stock` no pueden ser negativos.
- No se permite crear un producto repetido con el mismo `nombre`, `color` y `categoria`.

## Rutas disponibles

### Auth

| Método | Ruta | Requiere token | Descripción |
| --- | --- | --- | --- |
| POST | `/auth/login` | No | Inicia sesión y devuelve un token JWT. |

### Products

Todas las rutas de productos requieren:

```txt
Authorization: Bearer TOKEN_GENERADO
```

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/products` | Obtiene todos los productos. |
| GET | `/products/:id` | Obtiene un producto por ID de Firestore. |
| GET | `/products/category/:category` | Obtiene productos filtrados por categoría. |
| POST | `/products/create` | Crea un producto nuevo. |
| PATCH | `/products/update/:id` | Actualiza parcialmente un producto por ID. |
| DELETE | `/products/delete/:id` | Elimina un producto por ID. |

## Ejemplos de uso

### 1. Login

```http
POST http://localhost:3000/auth/login
Content-Type: application/json
```

Body:

```json
{
  "email": "correo@prueba.com",
  "password": "1234"
}
```

### 2. Crear producto

```http
POST http://localhost:3000/products/create
Authorization: Bearer TOKEN_GENERADO
Content-Type: application/json
```

Body:

```json
{
  "nombre": "Remera Oversize",
  "categoria": "Ropa",
  "color": "Negro",
  "precio": 18000,
  "stock": 20
}
```

También se puede enviar como `x-www-form-urlencoded` desde Postman o Thunder Client:

| Key | Value |
| --- | --- |
| nombre | Remera Oversize |
| categoria | Ropa |
| color | Negro |
| precio | 18000 |
| stock | 20 |

### 3. Obtener productos

```http
GET http://localhost:3000/products
Authorization: Bearer TOKEN_GENERADO
```

### 4. Obtener producto por ID

```http
GET http://localhost:3000/products/ID_DEL_PRODUCTO
Authorization: Bearer TOKEN_GENERADO
```

### 5. Obtener productos por categoría

```http
GET http://localhost:3000/products/category/Ropa
Authorization: Bearer TOKEN_GENERADO
```

### 6. Actualizar producto

```http
PATCH http://localhost:3000/products/update/ID_DEL_PRODUCTO
Authorization: Bearer TOKEN_GENERADO
Content-Type: application/json
```

Body de ejemplo:

```json
{
  "precio": 20000,
  "stock": 15
}
```

### 7. Eliminar producto

```http
DELETE http://localhost:3000/products/delete/ID_DEL_PRODUCTO
Authorization: Bearer TOKEN_GENERADO
```

## Códigos de respuesta comunes

| Código | Significado |
| --- | --- |
| 200 | Operación realizada correctamente. |
| 201 | Producto creado correctamente. |
| 400 | La solicitud tiene datos inválidos o incompletos. |
| 401 | No se envió token o no se inició sesión. |
| 403 | El token es inválido o expiró. |
| 404 | Recurso no encontrado. |
| 422 | Error de validación de producto. |
| 500 | Error interno del servidor. |

## Estructura del proyecto

```txt
src/
├── controllers/
│   ├── auth.controller.js
│   └── product.controller.js
├── data/
│   └── firebase.data.js
├── helpers/
│   ├── error.model.js
│   ├── products.helper.js
│   └── token.generator.js
├── middlewares/
│   └── authentication.middleware.js
├── models/
│   └── product.model.js
├── routes/
│   ├── products.routes.js
│   └── user.routes.js
└── index.js
```

## Flujo general

1. El servidor se levanta localmente desde `src/index.js`.
2. `/auth/login` permite obtener un JWT usando el usuario de prueba.
3. `/products` está protegido por el middleware `authentication`.
4. El middleware valida el token enviado en `Authorization`.
5. Los controllers reciben la request y delegan la lógica en los services.
6. Los services validan y normalizan datos con los helpers.
7. Los models interactúan con Firestore, usando la colección `products`.

## Deploy en Vercel

El proyecto usa `api/index.js` como entrypoint para Vercel. Ese archivo importa la app de Express desde `src/index.js`, y `vercel.json` reescribe las requests hacia esa función.

Antes de desplegar, cargar en Vercel las mismas variables de entorno definidas en `.env`, especialmente:

```txt
apiKey
authDomain
projectId
storageBucket
messagingSenderId
appId
JWT_SECRET_KEY
```

Las rutas se mantienen igual que en local:

```txt
POST /auth/login
GET /api/products
POST /api/products/create
PATCH /api/products/update/:id
DELETE /api/products/delete/:id
```

## Notas para probar en Postman o Thunder Client

- Primero ejecutar el login y copiar el token recibido.
- En cada request a `/products`, agregar el header `Authorization`.
- El valor del header debe tener el formato `Bearer TOKEN`.
- Para crear productos con form encoded, elegir `x-www-form-urlencoded`, no `raw JSON`.
- Si se usa JSON, asegurarse de enviar un JSON válido y el header `Content-Type: application/json`.
