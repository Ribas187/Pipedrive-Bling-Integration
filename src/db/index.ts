import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL || 'http://localhost:27017', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

export const db = mongoose.connection;

db.on('open', () => {
  console.log('DB connected 💿');
});
