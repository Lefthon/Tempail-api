const express = require('express');
const cors = require('cors');
const path = require('path');
const tempail = require('./api/tempail');
const rateLimit = require('./middleware/rateLimit');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Apply rate limit ke semua /api/*
app.use('/api/', rateLimit);

app.get('/api/create-email', async (req, res) => {
  try {
    const data = await tempail.createEmail();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Gagal buat email' });
  }
});

app.get('/api/messages/:token', async (req, res) => {
  try {
    const data = await tempail.getMessages(req.params.token);
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Gagal ambil pesan' });
  }
});

app.get('/api/message/:id', async (req, res) => {
  try {
    const data = await tempail.getMessage(req.params.id);
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Gagal ambil isi pesan' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server ready at http://localhost:${PORT}`));

module.exports = app;
