const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedData = require('./seeders/seed');

// Load environment variables
dotenv.config({ path: require('path').join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: true, // Dynamically allow calling origins with credentials
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const articleRoutes = require('./routes/articleRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/course', courseRoutes); // Backward compatibility
app.use('/api/articles', articleRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    database: process.env.DB_NAME || 'yr_elearning',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.send('YR-Elearning API Server is running.');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `API route not found: ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Start Server & Connect to DB
const startServer = async () => {
  try {
    const conn = await connectDB();
    if (conn) {
      // Auto seed initial courses, articles, admin if collections are empty
      await seedData();
    }

    app.listen(PORT, () => {
      console.log(`🚀 YR-Elearning Backend running on http://localhost:${PORT}`);
      console.log(`📡 Database name configured: ${process.env.DB_NAME || 'yr_elearning'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
