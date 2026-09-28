const mongoose = require('mongoose');

let isInMemoryFallback = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_time_workout', {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    isInMemoryFallback = false;
  } catch (error) {
    console.warn(`MongoDB Connection Notice: ${error.message}`);
    console.warn(`Fallback mode activated: Operating with local memory store for instant evaluation.`);
    isInMemoryFallback = true;
  }
};

const isFallback = () => isInMemoryFallback;

module.exports = { connectDB, isFallback };
