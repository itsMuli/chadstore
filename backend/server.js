import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: [
        'https://chadfashion.netlify.app',
        'http://localhost:5173',  // Add your local development URL
        /netlify\.app$/,], // Add your frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'token'],
  exposedHeaders: ['Access-Control-Allow-Origin']
}));

connectDB();
connectCloudinary();

app.use((req, res, next) => {
    if (res.getHeader('Access-Control-Allow-Origin')) {
        let origin = res.getHeader('Access-Control-Allow-Origin');
        if (origin.endsWith('/')) {
            res.setHeader('Access-Control-Allow-Origin', origin.slice(0, -1));
        }
    }
    next();
});

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', async (req, res) => {
    try {
        res.send('API working');
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => console.log('Server running on PORT : ' + port));