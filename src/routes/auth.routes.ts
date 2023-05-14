import { Router } from 'express';

import { Schemas, ValidateSchema } from '../middlewares/validate-schema.middleware';
import authController from '../auth/auth.controller';

const router: Router = Router();

router.post('/register', ValidateSchema(Schemas.register), authController.register);
router.post('/login', authController.login);

export = router;
