
# 🌐 Proyecto Red Social Full Stack

Este proyecto es una red social construida con tecnologías modernas:

- 🔙 **Backend**: Express.js + Sequelize + PostgreSQL + Socket.IO
- 🔛 **Frontend**: Next.js (React)
- 🛢️ **Base de datos**: PostgreSQL
- 🖥️ **Administrador**: pgAdmin 4
- 📦 **Contenedores**: Docker y Docker Compose

Permite autenticación, publicaciones y notificaciones en tiempo real mediante `Socket.IO`.

---

## 🚧 Paso 1: Crear red Docker para servicios

Antes de iniciar cualquier contenedor, crea una red de Docker compartida:

```bash
docker network create red-social
```

Esta red permite que los servicios se comuniquen entre sí por nombre (por ejemplo: `db`, `my-web`, `my-front-web`).

---

## 🔙 Paso 2: Backend (Express + PostgreSQL + Socket.IO)

### 📁 1. Ir al directorio del backend

```bash
cd backend-express
```

### 📄 2. Crear archivo `.env` del backend

Crea un archivo `.env` con el siguiente contenido:

```env
DATABASE_URL=postgresql://postgres:admin@db:5432/midb

# Permitir CORS desde contenedor y navegador local
ORIGIN=http://my-front-web:3000,http://localhost:3000

JWT_SECRET=supersecretkey123
```

✅ `db` es el nombre del contenedor de PostgreSQL (no usar `localhost`).

---

### 🐳 3. Levantar los servicios del backend

Ejecuta:

```bash
docker compose up -d
```

Este comando levanta los siguientes servicios:

- 🐘 `db`: PostgreSQL
- 🖥️ `pgadmin`: Interfaz web para gestionar PostgreSQL (http://localhost)
- 🚀 `my-web`: Servidor Express con APIs REST y WebSocket (`Socket.IO`)

Puedes verificar que están activos con:

```bash
docker ps
```

---

### 🌱 4. Insertar datos iniciales (seed)

Después de que el contenedor `my-web` esté listo, ejecuta:

```bash
docker exec -it my-web npm run seed
```

Esto creará usuarios y publicaciones de ejemplo en la base de datos.

---

## 💻 Paso 3: Frontend (Next.js)

### 📁 1. Ir al directorio del frontend

```bash
cd ../frontend-next
```

### 📄 2. Crear archivo `.env` del frontend

Crea un archivo `.env` con este contenido:

```env
# Comunicación de Server Components con el backend
API_URL=http://my-web:4000

# Comunicación desde el navegador con backend
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

✅ `my-web` es usado dentro del contenedor. `localhost` es usado por el navegador externo.

---

### 🐳 3. Levantar el frontend

Ejecuta:

```bash
docker compose up -d
```

Esto levanta:

- 🌐 `my-front-web`: Cliente Next.js accediendo al backend y usando Socket.IO

---

## 🔌 Socket.IO

El backend (`my-web`) expone `Socket.IO` para comunicación en tiempo real (por ejemplo, notificaciones de "likes").

El frontend (`my-front-web`) se conecta al WebSocket usando:

```env
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

Esto permite que el navegador externo se conecte con el backend dentro del contenedor.

---

## 🌐 Puertos y Servicios

| Servicio          | URL desde navegador         | Puerto |
|-------------------|-----------------------------|--------|
| Frontend (Next.js)| http://localhost:3000       | 3000   |
| Backend (Express) | http://localhost:4000       | 4000   |
| pgAdmin           | http://localhost            | 80     |
| PostgreSQL        | *interno como `db:5432`*    | 5433   |

---

## 🧪 Comandos útiles

```bash
# Crear red compartida
docker network create red-social

# --------- BACKEND ---------
cd backend-express

# Crear .env (ejemplo):
# DATABASE_URL=postgresql://postgres:admin@db:5432/midb
# ORIGIN=http://my-front-web:3000,http://localhost:3000
# JWT_SECRET=supersecretkey123

# Levantar servicios backend
docker compose up -d

# Insertar datos de prueba
docker exec -it my-web npm run seed

# --------- FRONTEND ---------
cd ../frontend-next

# Crear .env (ejemplo):
# API_URL=http://my-web:4000
# NEXT_PUBLIC_API_URL=http://localhost:4000
# NEXT_PUBLIC_SOCKET_URL=http://localhost:4000

# Levantar frontend
docker compose up -d

# --------- OTROS ---------

# Ver contenedores activos
docker ps

# Ver logs backend
docker logs my-web

# Apagar servicios backend
cd backend-express
docker compose down

# Apagar servicios frontend
cd ../frontend-next
docker compose down
```
