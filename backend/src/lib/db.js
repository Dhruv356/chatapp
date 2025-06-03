// config/db.js
import mongoose from 'mongoose';

export const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
      console.error('❌ MongoDB Connection Error:', err.message);
      process.exit(1);
    });
};


export default connectDB;
