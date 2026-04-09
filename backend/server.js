/**
 * API Express — Centro de Relajación y SPA
 * Autor: Albeiro
 *
 * Requisito 6: API simple sin persistencia que maneja un array en memoria.
 * - GET  /api/servicios   → retorna el array completo
 * - POST /api/servicios   → agrega un elemento recibiendo JSON y retorna el elemento creado
 */

const express = require('express');
const cors    = require('cors');

const app  = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Array en memoria (Requisito 6)
let servicios = [
  { id: 1, nombre: 'Masaje Tejido Profundo',  descripcion: 'Terapia intensa para aliviar la tensión crónica.',            votos: 2 },
  { id: 2, nombre: 'Circuito de Aguas',        descripcion: 'Recorrido por sauna, baño turco y piscinas termales.',         votos: 5 },
  { id: 3, nombre: 'Tratamiento Facial',       descripcion: 'Limpieza e hidratación profunda con productos naturales.',     votos: 3 },
];

// GET /api/servicios — retorna el array completo (Requisito 6)
app.get('/api/servicios', (req, res) => {
  res.json(servicios);
});

// POST /api/servicios — agrega un elemento y lo retorna (Requisito 6)
app.post('/api/servicios', (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Los campos nombre y descripcion son requeridos.' });
  }

  const nuevo = {
    id:          Date.now(),
    nombre:      nombre.trim(),
    descripcion: descripcion.trim(),
    votos:       0,
  };

  servicios.push(nuevo);
  console.log(`[POST] Servicio agregado: ${nuevo.nombre}`);
  res.status(201).json(nuevo);
});

app.listen(PORT, () => {
  console.log(`API SPA corriendo en http://localhost:${PORT}`);
});
