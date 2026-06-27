import { AppError } from "../helpers/error.model.js";
import { generateToken } from "../helpers/token.generator.js";

const defaultUser = {
    id: 1,
    email: 'correo@prueba.com',
    password:"1234"
}

export function login(req, res){
    const {email, password} = req.body;

    try {
        //Búsqueda mockeada del usuario
        validateExistingUser(email, password);
    
        const token = generateToken(email, password);
        res.json({token})
    } catch (error) {
        res.status(e.statusCode ?? 500).json({
            error: e.error ?? 'Internal Server Error',
            message: e.message ?? 'Error inesperado',
            statusCode: e.statusCode ?? 500,
        });
    }
}


function validateExistingUser(email, password){
    if (email !== defaultUser.email) {
        throw new AppError('Unauthorized', 'Credenciales inválidas', 401);
    }
    
    if (password !== defaultUser.password) {
        throw new AppError('Unauthorized', 'Credenciales inválidas', 401);
    }
}