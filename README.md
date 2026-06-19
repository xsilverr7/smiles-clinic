# Sistema Web de Gestión de Citas - Clínica Dental Smiles

Proyecto ordinario con Frontend, Backend y MongoDB Atlas.

## Tecnologías
- Frontend: HTML, CSS y JavaScript
- Backend: Node.js + Express
- Base de datos: MongoDB Atlas
- Publicación: Vercel y Render

## Backend local
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
En `.env` coloca tu cadena de MongoDB Atlas.

## Frontend local
Abre `frontend/index.html` con Live Server o en el navegador.

## Antes de publicar
En `frontend/app.js` cambia:
```js
const API = 'https://TU-BACKEND-RENDER.onrender.com/api';
```
por la URL real de Render.

## Funciones incluidas
- CRUD de pacientes
- CRUD de dentistas
- CRUD de citas
- Panel administrativo
- Citas por día
- Pacientes recientes
- Citas canceladas
- Cantidad de citas por dentista
- Citas por especialidad
