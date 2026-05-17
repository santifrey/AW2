# Proyecto TiendaTech

Aplicación web dividida en una arquitectura Cliente-Servidor (Frontend y Backend).

## 📁 Estructura del Proyecto

El proyecto está separado en dos carpetas principales:

- **`/Backend`**: Servidor desarrollado en Node.js con Express. Se encarga de manejar la lógica de negocio, procesar ventas y proveer los datos (productos, usuarios) a través de una API REST. Funciona en el puerto `3000`.
- **`/Frontend`**: Interfaz de usuario desarrollada con **Astro** y **Tailwind CSS**. Contiene el catálogo de productos, el carrito de compras y la pantalla de inicio de sesión. Funciona en el puerto `4321`.

---

## 🚀 Cómo Inicializar y Acceder al Proyecto

Para correr la aplicación localmente hay que iniciar ambos servicios (Backend y Frontend) en terminales separadas.

### 1. Iniciar el Backend

Abrir una terminal, navegar a la carpeta del Backend instalar las dependencias y correr el servidor:

```bash
cd Backend
npm install
npm run dev
```

El servidor del backend estará corriendo en: `http://localhost:3000`

### 2. Iniciar el Frontend

Abrir otra terminal, navegar a la carpeta del Frontend instalar las dependencias y correr el entorno de desarrollo:

```bash
cd Frontend
npm install
npm run dev
```

El frontend estará corriendo en: `http://localhost:4321`

### 3. Acceder a la Aplicación

Una vez que ambos servicios estén corriendo, abrir el navegador web y visitar:
👉 **[http://localhost:4321](http://localhost:4321)**

Para probar la función del carrito de compras, se puede iniciar sesión con las siguientes credenciales de prueba:
- **Email:** `juan@gmail.com`
- **Contraseña:** `1234`
