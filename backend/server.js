import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

// Use CORS middleware
app.use(cors({
    origin: 'https://chadstore.netlify.app/',
    methods: 'GET,POST,PUT,DELETE',
}));

connectDB();
connectCloudinary();

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