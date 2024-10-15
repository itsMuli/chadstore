import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is defined in your environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'e-commerce', // Define the specific database name here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    // Optionally, throw the error so that the application can handle it.
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
