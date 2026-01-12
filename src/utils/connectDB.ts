import mongoose from 'mongoose';


let isConnected: boolean = false;

export const connectDB = async (): Promise<void> => {

  if (isConnected) {
    console.log('✅ Using existing database connection.');
    return;
  }

  if (!process.env.DB_URL) {
    throw new Error('DB_URI not found in environment variables.');
  }             

  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: 'newsDB',
    });

    isConnected = true;
    console.log('✅ New database connection established.');

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw new Error('Database connection failed');
  }
};