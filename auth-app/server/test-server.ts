import express from 'express';

const app = express();
const PORT = 4000;

app.get('/', (_req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Test server is running on http://localhost:${PORT}`);
});