const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const connectDB = require('./db');
const Upload = require('/TechForum/SPSProject/backend/models/Upload');
const volunteerRoutes = require('./routes/volunteer');
const participantRoutes = require('./routes/participants');



// Connect to MongoDB
connectDB();

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';



app.use(cors());
app.use(express.json());
app.use('/volunteer', volunteerRoutes);
app.use('/participants', participantRoutes);



// File upload directory
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Upload route
app.post('/upload', upload.single('bill'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ success: true, message: 'File uploaded successfully', filename: req.file.filename });
});

// Serve static frontend
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));
app.use('/uploads', express.static(uploadDir));

// Page routes
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(frontendPath, 'participant.html'));
});

app.get('/fundm', (req, res) => {
  res.sendFile(path.join(frontendPath, 'fundm.html'));
});

app.get('/eventd', (req, res) => {
  res.sendFile(path.join(frontendPath, 'eventd.html'));
});

// Get uploaded files
app.get('/get-uploads', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to list uploaded files' });
    }
    res.json(files);
  });
});

// Delete file route
app.delete('/delete-upload/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).json({ success: false, message: 'Error deleting file' });
    }
    res.json({ success: true, message: 'File deleted successfully' });
  });
});

// Start the server
app.listen(PORT,() => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
