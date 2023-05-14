import { Router } from 'express';

import productsRouter from './products.routes';
import authRouter from './auth.routes';

const router: Router = Router();

router.use('/products', productsRouter);
router.use('/auth', authRouter);

export = router;
