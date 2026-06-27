import 'dotenv/config';
import express from 'express';
import { productsRouter } from './routes/products.routes.js';
import { AuthRouter } from './routes/user.routes.js';
import { authentication } from './middlewares/authentication.middleware.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const port = process.env.PORT || process.env.port || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', AuthRouter);
app.use('/products', authentication, productsRouter);

app.use('/', (req, res)=>{
    res.status(404).send('Not found')
})

const currentFilePath = fileURLToPath(import.meta.url);
const executedFilePath = process.argv[1] ? path.resolve(process.argv[1]) : '';

if (currentFilePath === executedFilePath) {
    app.listen(port, ()=>{
        console.log(`servidor corriendo en puerto http://localhost:${port}`);
    })
}

export default app;
