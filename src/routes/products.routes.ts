import { Router } from 'express';

import { CheckAuth } from '../middlewares/check-auth.middleware';
import { Schemas, ValidateSchema } from '../middlewares/validate-schema.middleware';
import productsController from '../products/products.controller';

const router: Router = Router();

router.post('/', CheckAuth, ValidateSchema(Schemas.product), productsController.createProduct);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.patch('/:id', CheckAuth, ValidateSchema(Schemas.product), productsController.updateProduct);
router.delete('/:id', CheckAuth, productsController.deleteProduct);

export = router;
