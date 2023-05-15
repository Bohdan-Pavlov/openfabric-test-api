import { NextFunction, Request, Response } from 'express';

import { StatusCodes, UNEXPECTED_ERROR } from '../constants';
import { ApiError } from '../error/api-error';

export const errorHandler = function (err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message });
	}

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
};
