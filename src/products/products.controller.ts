import { NextFunction, Request, Response } from 'express';

import ApiError from '../error/api-error';
import { StatusCodes } from '../constants';
import {
	PRODUCT_ALREADY_EXISTS_ERROR,
	PRODUCT_DELETED_SUCCESSFULLY,
	PRODUCT_NOT_FOUND_ERROR,
} from '../products/product.constants';
import Product, { IProduct } from '../products/models/product.model';

const getAllProducts = async (request: Request, response: Response) => {
	const products = await Product.find();

	return response.status(StatusCodes.OK).json(products);
};

const getProductById = async (request: Request, response: Response, next: NextFunction) => {
	const id = request.params.id;

	const product = await Product.findById(id);

	if (!product) {
		return next(ApiError.badRequest(PRODUCT_NOT_FOUND_ERROR));
	}

	return response.status(StatusCodes.OK).json(product);
};

const createProduct = async (request: Request, response: Response, next: NextFunction) => {
	const productData: IProduct = request.body;

	const isProductExist = await Product.findOne({ name: productData.name });

	if (isProductExist) {
		return next(ApiError.conflict(PRODUCT_ALREADY_EXISTS_ERROR));
	}

	const product = await Product.create(productData);

	return response.status(StatusCodes.CREATED).json(product);
};

const updateProduct = async (request: Request, response: Response, next: NextFunction) => {
	const id = request.params.id;
	const productData: IProduct = request.body;

	const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });

	if (!updatedProduct) {
		return next(ApiError.badRequest(PRODUCT_NOT_FOUND_ERROR));
	}

	return response.status(StatusCodes.OK).json(updatedProduct);
};

const deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
	const id = request.params.id;

	const deletedProduct = await Product.findByIdAndDelete(id);

	if (!deletedProduct) {
		return next(ApiError.badRequest(PRODUCT_NOT_FOUND_ERROR));
	}

	return response.status(StatusCodes.OK).json({ message: PRODUCT_DELETED_SUCCESSFULLY });
};

export default { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct };
