import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the built frontend
app.use(express.static(path.join(__dirname, 'dist', 'public')));

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'public', 'index.html'));
});

const port = 5000;
app.listen(port, '0.0.0.0', () => {
  console.log('🚀 Krishi AI server running on http://localhost:5000');
  console.log('Your agricultural platform is ready!');
});