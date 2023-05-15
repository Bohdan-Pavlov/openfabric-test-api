import { Router } from 'express';

import { Schemas, ValidateSchema } from '../middlewares';
import { login, register } from '../auth';

export const authRouter: Router = Router();

authRouter.post('/register', ValidateSchema(Schemas.register), register);
authRouter.post('/login', login);
