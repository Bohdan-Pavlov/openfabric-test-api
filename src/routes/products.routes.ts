import { Router } from 'express';

import { CheckAuth } from '../middlewares';
import { Schemas, ValidateSchema } from '../middlewares';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../products';

export const productsRouter: Router = Router();

productsRouter.post('/', CheckAuth, ValidateSchema(Schemas.product), createProduct);
productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.patch('/:id', CheckAuth, ValidateSchema(Schemas.product), updateProduct);
productsRouter.delete('/:id', CheckAuth, deleteProduct);
