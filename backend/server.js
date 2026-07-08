const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const loadDotEnv = (filePath) => {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
};

loadDotEnv(path.resolve(__dirname, '..', '.env'));

const contactRoutes = require('./routes/contactRoutes');
const coursesRoutes = require('./routes/coursesRoutes');

const app = express();
const PORT = process.env.PORT;
const CORS_ORIGINS = (process.env.CORS_ORIGINS || '')
  .split(';')
  .map(origin => origin.trim())
  .filter(Boolean);

if (!PORT) {
  throw new Error('Missing required environment variable: PORT');
}

if (CORS_ORIGINS.length === 0) {
  throw new Error('Missing required environment variable: CORS_ORIGINS');
}

app.use(cors({ origin: CORS_ORIGINS }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contact', contactRoutes);
app.use('/api/courses', coursesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
