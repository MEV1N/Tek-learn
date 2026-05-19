require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Postgres connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test DB Connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL (Neon)'))
  .catch(err => console.error('Connection error', err.stack));

// --- Banners ---

app.get('/api/banners', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM banners ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/banners', async (req, res) => {
  const { title, highlight, subtitle, link } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO banners (title, highlight, subtitle, link) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, highlight, subtitle, link]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/banners/:id', async (req, res) => {
  const { id } = req.params;
  const { title, highlight, subtitle, link } = req.body;
  try {
    const result = await pool.query(
      'UPDATE banners SET title = $1, highlight = $2, subtitle = $3, link = $4 WHERE id = $5 RETURNING *',
      [title, highlight, subtitle, link, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/banners/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM banners WHERE id = $1', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Courses ---

app.get('/api/courses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  const { title, description, price, duration, iconName } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO courses (title, description, price, duration, iconName) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, price, duration, iconName]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, duration, iconName } = req.body;
  try {
    const result = await pool.query(
      'UPDATE courses SET title = $1, description = $2, price = $3, duration = $4, iconName = $5 WHERE id = $6 RETURNING *',
      [title, description, price, duration, iconName, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM courses WHERE id = $1', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Events & Gallery ---

app.get('/api/events', async (req, res) => {
  try {
    const eventsResult = await pool.query('SELECT * FROM events ORDER BY id DESC');
    const imagesResult = await pool.query('SELECT * FROM event_images');
    
    // Group images by event
    const events = eventsResult.rows.map(event => {
      return {
        ...event,
        images: imagesResult.rows.filter(img => img.event_id === event.id)
      };
    });
    
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/events', async (req, res) => {
  const { title, date, coverImage } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO events (title, date, coverImage) VALUES ($1, $2, $3) RETURNING *',
      [title, date, coverImage]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, coverImage } = req.body;
  try {
    const result = await pool.query(
      'UPDATE events SET title = $1, date = $2, coverImage = $3 WHERE id = $4 RETURNING *',
      [title, date, coverImage, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/events/:id/images', async (req, res) => {
  const eventId = req.params.id;
  const { src } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO event_images (event_id, src) VALUES ($1, $2) RETURNING *',
      [eventId, src]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  const eventId = req.params.id;
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [eventId]);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/events/images/:id', async (req, res) => {
  const imageId = req.params.id;
  try {
    await pool.query('DELETE FROM event_images WHERE id = $1', [imageId]);
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- File Upload ---

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const b64 = Buffer.from(req.file.buffer).toString('base64');
  let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
  
  cloudinary.uploader.upload(dataURI, { resource_type: 'auto' })
    .then((result) => {
      res.json({ url: result.secure_url });
    })
    .catch((error) => {
      console.error('Cloudinary Upload Error:', error);
      res.status(500).json({ error: 'Failed to upload to Cloudinary' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
