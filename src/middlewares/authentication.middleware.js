import jwt from 'jsonwebtoken';


const secret_key = process.env.JWT_SECRET_KEY


// Middleware para verificar el token JWT

export const authentication = (req, res, next) => {
    console.log('Header: ', req.headers)
    if (!req.headers['authorization']) return res.sendStatus(401).json({
        message:'No autorizado. Debe iniciar sesión.'
    });
    const authorizationHerader = req.headers['authorization'].split(" ")[1] 

    const token = authorizationHerader;

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secret_key, (err)=>{
        if (err) return res.sendStatus(403);
        next();
    });
}