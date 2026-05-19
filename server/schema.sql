CREATE TABLE IF NOT EXISTS banners (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  highlight TEXT,
  subtitle TEXT,
  link TEXT
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price TEXT,
  duration TEXT,
  iconName TEXT
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT,
  coverImage TEXT
);

CREATE TABLE IF NOT EXISTS event_images (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  src TEXT NOT NULL
);

-- Insert some default data if empty (optional)
INSERT INTO banners (title, highlight, subtitle, link) VALUES 
('Internship program', 'Hive', 'details', ''),
('Mentorship', 'Pro', 'details', '');

INSERT INTO courses (title, description, price, duration, iconName) VALUES 
('Data Science', 'Master Python, ML & data visualization with real datasets and capstone projects.', '₹12,999', '3 Months', 'Database'),
('UI/UX with AI', 'Design stunning user experiences with Figma, prototyping, and AI-powered design tools.', '₹9,999', '3 Months', 'PenTool'),
('Full Stack Development', 'Master MERN stack. Build scalable web applications from scratch with real-world projects.', '₹14,999', '6 Months', 'FileCode2');
