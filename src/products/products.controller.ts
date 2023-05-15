import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../error/api-error';
import { StatusCodes } from '../constants';
import {
	PRODUCT_ALREADY_EXISTS_ERROR,
	PRODUCT_DELETED_SUCCESSFULLY,
	PRODUCT_NOT_FOUND_ERROR,
} from '../products/product.constants';
import { IProduct, IProductModel, Product } from '../products/models/product.model';

export const getAllProducts = async (request: Request, response: Response) => {
	const products: IProductModel[] = await Product.find();

	return response.status(StatusCodes.OK).json(products);
};

export const getProductById = async (request: Request, response: Response, next: NextFunction) => {
	const id = request.params.id;

	const product: IProductModel | null = await Product.findById(id);

	if (!product) {
		return next(ApiError.badRequest(PRODUCT_NOT_FOUND_ERROR));
	}

	return response.status(StatusCodes.OK).json(product);
};

export const createProduct = async (request: Request, response: Response, next: NextFunction) => {
	const productData: IProduct = request.body;

	const isProductExist: IProductModel | null = await Product.findOne({ name: productData.name });

	if (isProductExist) {
		return next(ApiError.conflict(PRODUCT_ALREADY_EXISTS_ERROR));
	}

	const product: IProductModel | null = await Product.create(productData);

	return response.status(StatusCodes.CREATED).json(product);
};

export const updateProduct = async (request: Request, response: Response, next: NextFunction) => {
	const id = request.params.id;
	const productData: IProduct = request.body;

	const product: IProductModel | null = await Product.findOne({ name: productData.name });

	if (product && product._id.toString() !== id) {
		return next(ApiError.conflict(PRODUCT_ALREADY_EXISTS_ERROR));
	}

	const updatedProduct: IProductModel | null = await Product.findByIdAndUpdate(id, productData, { new: true });

	if (!updatedProduct) {
		return next(ApiError.badRequest(PRODUCT_NOT_FOUND_ERROR));
	}

	return response.status(StatusCodes.OK).json(updatedProduct);
};

export const deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
	const id = request.params.id;

	const deletedProduct: IProductModel | null = await Product.findByIdAndDelete(id);

	if (!deletedProduct) {
		return next(ApiError.badRequest(PRODUCT_NOT_FOUND_ERROR));
	}

	return response.status(StatusCodes.OK).json({ message: PRODUCT_DELETED_SUCCESSFULLY });
};
