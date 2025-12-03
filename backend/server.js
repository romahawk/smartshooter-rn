// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// дозволяємо запити з фронтенда (web/Expo)
app.use(cors());
app.use(express.json());

// ===== In-memory "БД" =====
let sessions = [];
let nextId = 1;

// ===== GET /sessions =====
// повертає всі сесії
app.get('/sessions', (req, res) => {
  res.json(sessions);
});

// ===== POST /sessions =====
// створює нову сесію
app.post('/sessions', (req, res) => {
  const { title, accuracy, lastSessionDate, notes } = req.body;

  if (!title || accuracy == null) {
    return res.status(400).json({ message: 'title and accuracy are required' });
  }

  const newSession = {
    id: nextId++,
    title,
    accuracy,
    lastSessionDate: lastSessionDate || new Date().toISOString().split('T')[0],
    notes: notes || '',
  };

  sessions.unshift(newSession); // нові зверху
  res.status(201).json(newSession);
});

// ===== PUT /sessions/:id =====
// оновлює існуючу сесію
app.put('/sessions/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = sessions.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Session not found' });
  }

  const { title, accuracy, lastSessionDate, notes } = req.body;

  sessions[index] = {
    ...sessions[index],
    title: title ?? sessions[index].title,
    accuracy: accuracy ?? sessions[index].accuracy,
    lastSessionDate: lastSessionDate ?? sessions[index].lastSessionDate,
    notes: notes ?? sessions[index].notes,
  };

  res.json(sessions[index]);
});

// ===== DELETE /sessions/:id =====
// видаляє сесію
app.delete('/sessions/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = sessions.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Session not found' });
  }

  sessions.splice(index, 1);
  res.status(204).send();
});

// healthcheck, чисто щоб перевірити
app.get('/', (req, res) => {
  res.send('SmartShooter API is running');
});

app.listen(PORT, () => {
  console.log(`SmartShooter API listening on http://localhost:${PORT}`);
});
