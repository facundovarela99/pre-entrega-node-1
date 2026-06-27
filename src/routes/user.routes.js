import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

export const AuthRouter = Router();


AuthRouter.post('/login', login);