import { config, configDotenv } from 'dotenv';
import express from 'express';
import { productsRouter } from './routes/products.routes.js';
import bodyParser from 'body-parser';
import { AuthRouter } from './routes/user.routes.js';
import { authentication } from './middlewares/authentication.middleware.js';

const port = process.env.port || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/products', authentication, productsRouter);

app.listen(port, ()=>{
    console.log(`servidor corriendo en puerto http://localhost:${port}`);
})

app.use('/', (req, res)=>{
    res.status(404).send('Not found')
})