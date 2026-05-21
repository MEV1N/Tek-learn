const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const crypto = require('crypto');

// Initialize Postgres connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize database schema and admin settings
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_settings (
        key VARCHAR(50) PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
    
    // Check if admin_password exists
    const res = await pool.query("SELECT * FROM admin_settings WHERE key = 'admin_password'");
    if (res.rows.length === 0) {
      const defaultHash = crypto.createHash('sha256').update('teklearnadmin').digest('hex');
      await pool.query(
        "INSERT INTO admin_settings (key, value) VALUES ('admin_password', $1)",
        [defaultHash]
      );
      console.log('Default admin password initialized successfully');
    }

    // Initialize admin table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    // Seed default admin user if empty
    const adminCheck = await pool.query("SELECT COUNT(*) FROM admin");
    if (parseInt(adminCheck.rows[0].count) === 0) {
      const defaultHash = crypto.createHash('sha256').update('teklearnadmin').digest('hex');
      await pool.query(
        "INSERT INTO admin (username, password) VALUES ('admin', $1)",
        [defaultHash]
      );
      console.log('Default admin user initialized successfully');
    }
  } catch (err) {
    console.error('Error initializing admin settings schema:', err);
  }
};

// Test DB Connection
pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL (Neon)');
    initDb();
  })
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

app.post('/api/banners', upload.single('image'), async (req, res) => {
  const { title, highlight, subtitle, link } = req.body;
  let imageUrl = null;

  if (req.file) {
    try {
      const uploadResult = await cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ error: 'Image upload failed' });
          }
          try {
            imageUrl = result.secure_url;
            const dbResult = await pool.query(
              'INSERT INTO banners (title, highlight, subtitle, link, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              [title, highlight, subtitle, link, imageUrl]
            );
            res.status(201).json(dbResult.rows[0]);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        }
      ).end(req.file.buffer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    try {
      const result = await pool.query(
        'INSERT INTO banners (title, highlight, subtitle, link, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, highlight, subtitle, link, imageUrl]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

app.put('/api/banners/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, highlight, subtitle, link, image_url } = req.body;
  let imageUrl = image_url;

  if (req.file) {
    try {
      const uploadResult = await cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ error: 'Image upload failed' });
          }
          try {
            imageUrl = result.secure_url;
            const dbResult = await pool.query(
              'UPDATE banners SET title = $1, highlight = $2, subtitle = $3, link = $4, image_url = $5 WHERE id = $6 RETURNING *',
              [title, highlight, subtitle, link, imageUrl, id]
            );
            res.json(dbResult.rows[0]);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        }
      ).end(req.file.buffer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    try {
      const result = await pool.query(
        'UPDATE banners SET title = $1, highlight = $2, subtitle = $3, link = $4, image_url = $5 WHERE id = $6 RETURNING *',
        [title, highlight, subtitle, link, imageUrl, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
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
    const courses = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      price: row.price,
      duration: row.duration,
      iconName: row.iconname,
      customIcon: row.customicon
    }));
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  const { title, description, price, duration, iconName, customIcon } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO courses (title, description, price, duration, iconName, customIcon) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, price, duration, iconName, customIcon]
    );
    const row = result.rows[0];
    res.status(201).json({
      id: row.id,
      title: row.title,
      description: row.description,
      price: row.price,
      duration: row.duration,
      iconName: row.iconname,
      customIcon: row.customicon
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, duration, iconName, customIcon } = req.body;
  try {
    const result = await pool.query(
      'UPDATE courses SET title = $1, description = $2, price = $3, duration = $4, iconName = $5, customIcon = $6 WHERE id = $7 RETURNING *',
      [title, description, price, duration, iconName, customIcon, id]
    );
    const row = result.rows[0];
    res.json({
      id: row.id,
      title: row.title,
      description: row.description,
      price: row.price,
      duration: row.duration,
      iconName: row.iconname,
      customIcon: row.customicon
    });
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
        id: event.id,
        title: event.title,
        date: event.date,
        coverImage: event.coverimage,
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
    const row = result.rows[0];
    res.status(201).json({
      id: row.id,
      title: row.title,
      date: row.date,
      coverImage: row.coverimage
    });
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
    const row = result.rows[0];
    res.json({
      id: row.id,
      title: row.title,
      date: row.date,
      coverImage: row.coverimage
    });
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

// --- Admin Authentication & Settings ---

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashed = crypto.createHash('sha256').update(password).digest('hex');
    const result = await pool.query("SELECT * FROM admin WHERE username = $1", [username]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    const storedHash = result.rows[0].password;
    if (hashed === storedHash) {
      res.json({ success: true, username });
    } else {
      res.status(401).json({ error: 'Incorrect username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/change-password', async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  if (!username || !currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Username, current password, and new password are required' });
  }

  try {
    const currentHash = crypto.createHash('sha256').update(currentPassword).digest('hex');
    const result = await pool.query("SELECT password FROM admin WHERE username = $1", [username]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    const storedHash = result.rows[0].password;
    if (currentHash !== storedHash) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    const newHash = crypto.createHash('sha256').update(newPassword).digest('hex');
    await pool.query(
      "UPDATE admin SET password = $1 WHERE username = $2",
      [newHash, username]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get list of admins (excluding password hashes)
app.get('/api/admins', async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username FROM admin ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new admin account
app.post('/api/admins', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Check if username already exists
    const checkUser = await pool.query("SELECT * FROM admin WHERE username = $1", [username]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashed = crypto.createHash('sha256').update(password).digest('hex');
    const result = await pool.query(
      "INSERT INTO admin (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update the password of a specific admin (by admin list view)
app.put('/api/admins/:id/password', async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ error: 'New password is required' });
  }

  try {
    const hashed = crypto.createHash('sha256').update(newPassword).digest('hex');
    const result = await pool.query(
      "UPDATE admin SET password = $1 WHERE id = $2 RETURNING id, username",
      [hashed, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin user not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an admin account
app.delete('/api/admins/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Ensure we don't delete the last admin
    const countRes = await pool.query("SELECT COUNT(*) FROM admin");
    if (parseInt(countRes.rows[0].count) <= 1) {
      return res.status(400).json({ error: 'Cannot delete the last admin account' });
    }

    const result = await pool.query("DELETE FROM admin WHERE id = $1 RETURNING id, username", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admin user not found' });
    }
    res.json({ message: 'Admin deleted successfully', deleted: result.rows[0] });
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
      res.status(500).json({ error: error.message || 'Failed to upload to Cloudinary' });
    });
});
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
