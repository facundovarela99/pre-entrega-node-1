import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.routes.js';
import { AuthRouter } from './routes/user.routes.js';
import { authentication } from './middlewares/authentication.middleware.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const port = process.env.PORT || process.env.port || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const corsOptions = {
    origin: [`http://localhost:${port}, https://pre-entrega-node-1.vercel.app/`],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

app.use('/auth', AuthRouter);
app.use('/api/products', authentication, productsRouter);

app.use((req, res, next)=>{
    res.status(404).send(`<h1>Recurso no encontrado o ruta inválida</h1>`)
})

const currentFilePath = fileURLToPath(import.meta.url);
const executedFilePath = process.argv[1] ? path.resolve(process.argv[1]) : '';

if (currentFilePath === executedFilePath) {
    app.listen(port, ()=>{
        console.log(`servidor corriendo en puerto http://localhost:${port}`);
    })
}

export default app;
