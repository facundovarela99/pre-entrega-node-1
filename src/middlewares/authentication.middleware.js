import jwt from 'jsonwebtoken';

// Middleware para verificar el token JWT
export const authentication = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) return res.status(401).json({
        message: 'No autorizado. Debe iniciar sesión.'
    });

    const [scheme, token] = authorizationHeader.split(" ");

    if (scheme !== 'Bearer' || !token) return res.status(401).json({
        message: 'No autorizado. El token debe enviarse con el formato Bearer TOKEN.'
    });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err)=>{
        if (err) return res.status(403).json({
            message: 'Token inválido o expirado.'
        });
        next();
    });
}
