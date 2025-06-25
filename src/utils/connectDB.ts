// utils/connectDB.ts
import mongoose from 'mongoose';

// Connection state check করার জন্য একটি ভ্যারিয়েবল
let isConnected: boolean = false;

export const connectDB = async (): Promise<void> => {
  // যদি আগে থেকেই কানেক্টেড থাকে, তাহলে নতুন করে কানেকশন তৈরি করা থেকে বিরত থাকুন
  if (isConnected) {
    console.log('✅ Using existing database connection.');
    return;
  }

  // যদি .env ফাইল থেকে URI না পাওয়া যায়, তাহলে এরর দিন
  if (!process.env.DB_URL) {
    throw new Error('DB_URI not found in environment variables.');
  }

  try {
    // নতুন কানেকশন তৈরি করুন
    await mongoose.connect(process.env.DB_URL, {
      dbName: 'newsDB', // আপনার ডাটাবেসের নাম এখানে উল্লেখ করতে পারেন
    });

    isConnected = true;
    console.log('✅ New database connection established.');

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw new Error('Database connection failed');
  }
};