import Joi, { ObjectSchema, ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../error/api-error';
import { UNEXPECTED_ERROR } from '../constants';

export const ValidateSchema = (schema: ObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await schema.validateAsync(req.body);
		return next();
	} catch (error) {
		if (error instanceof ValidationError) {
			return next(ApiError.invalidDataPassed(error.details[0].message));
		}

		return next(ApiError.internal(UNEXPECTED_ERROR));
	}
};

export const Schemas = {
	product: Joi.object({
		name: Joi.string().required().min(3),
		price: Joi.number().required().positive(),
		description: Joi.string().required().min(20),
		imgUrl: Joi.string().required().uri(),
	}),
	register: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required().min(6),
	}),
};
