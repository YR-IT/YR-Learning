const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yr_elearning';
    const dbName = process.env.DB_NAME || 'yr_elearning';

    const conn = await mongoose.connect(mongoUri, {
      dbName: dbName,
    });

    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    console.log(`📂 Active Database: ${conn.connection.name} (yr_elearning)`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log(`💡 Note: Please set MONGO_URI in your backend/.env file to connect to your MongoDB cluster.`);
    return null;
  }
};

module.exports = connectDB;
