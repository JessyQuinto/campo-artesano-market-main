# Plataforma de Comercio Artesanal del Chocó

Este proyecto es una plataforma de ecommerce desarrollada con el objetivo de centralizar la oferta de productos artesanales del departamento del Chocó (Colombia). Permite a los comerciantes locales registrar y promocionar sus productos, facilitando su venta a nivel nacional o internacional a través de una vitrina digital amigable y moderna.

## Objetivo del proyecto

Crear un canal de venta accesible y digitalizado para los productores y artesanos del Chocó, fortaleciendo el comercio local y visibilizando la riqueza cultural de la región.

## Características principales

* Registro y gestión de comerciantes y productos.
* Catálogo público de productos artesanales.
* Interfaz adaptable a dispositivos móviles.
* Posibilidad de búsqueda y filtrado de productos.
* Infraestructura escalable y moderna.

## Tecnologías utilizadas

Este proyecto está construido con las siguientes tecnologías:

* Vite — Empaquetador de aplicaciones rápidas.
* TypeScript — Tipado estático para mayor seguridad en el desarrollo.
* React — Librería para construir interfaces de usuario.
* Tailwind CSS — Framework de estilos CSS utilitario.
* shadcn/ui — Conjunto de componentes UI accesibles y personalizables.

## Cómo ejecutar este proyecto localmente

Asegúrate de tener Node.js instalado. Este proyecto funciona correctamente usando **npm** (el gestor de paquetes por defecto de Node.js). Si prefieres, puedes instalar y usar **pnpm** o **bun**, pero la integración principal y los archivos de lock están preparados para npm.

### Instalación y ejecución con npm

```powershell
# 1. Clona el repositorio:
git clone <TU_URL_DEL_REPOSITORIO>

# 2. Ingresa al directorio del proyecto:
cd campo-artesano-market-main/campo-artesano-market-main

# 3. Instala las dependencias:
npm install

# 4. Inicia el servidor de desarrollo:
npm run dev
```

Esto abrirá la aplicación en tu navegador, usualmente en [http://localhost:8080](http://localhost:8080)

## Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Genera la versión optimizada para producción.
- `npm run preview` — Previsualiza la build de producción localmente.
- `npm run lint` — Ejecuta el linter para revisar el código.

## Cómo desplegar el proyecto

Este proyecto puede desplegarse en plataformas como:

* Vercel
* Netlify
* Render
* u otros proveedores compatibles con aplicaciones React + Vite.

Pasos básicos para desplegar en Vercel:

1. Crea una cuenta en [https://vercel.com/](https://vercel.com/)
2. Conecta tu repositorio desde GitHub.
3. Selecciona "Vite" como framework.
4. Vercel detectará automáticamente los scripts de build (`pnpm run build`) y de desarrollo (`pnpm run dev`).
5. ¡Listo! Tu ecommerce estará en línea.

## ¿Puedo conectar un dominio personalizado?

Sí. Una vez desplegado en Vercel (o cualquier otro proveedor), puedes vincular tu dominio personalizado a través de la configuración de DNS del proveedor.

Consulta la documentación de tu proveedor de hosting para saber cómo hacerlo paso a paso.

---