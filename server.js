import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.post('/api/proforma', (req, res) => {
  const { title, inputs, results } = req.body;
  db.query(
    'INSERT INTO proformas (title, inputs, results) VALUES (?, ?, ?)',
    [title, JSON.stringify(inputs), JSON.stringify(results)],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId });
    }
  );
});

app.get('/api/proforma', (req, res) => {
  db.query('SELECT id, title, created_at FROM proformas', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/proforma/:id', (req, res) => {
  db.query('SELECT * FROM proformas WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!rows.length) return res.status(404).json({ error: 'Not found' });
    const row = rows[0];
    row.inputs = JSON.parse(row.inputs);
    row.results = JSON.parse(row.results);
    res.json(row);
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});