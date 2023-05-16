import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { NOT_AUTHORIZED_ERROR, RESERVE_SECRET_KEY } from '../auth/auth.constants';
import { ApiError } from '../error/api-error';
import { IUserModel, User } from '../auth/models/auth.model';

interface DecodedToken {
	id: string;
	email: string;
}

export const CheckAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token: string | undefined = req.headers.authorization?.split(' ')[1];

		if (!token) {
			return next(ApiError.forbidden(NOT_AUTHORIZED_ERROR));
		}

		const decodedToken: DecodedToken = jwt.verify(token, process.env.SECRET_KEY ?? RESERVE_SECRET_KEY) as DecodedToken;
		const userId = decodedToken.id;

		const user: IUserModel | null = await User.findById(userId);

		if (!user) {
			return next(ApiError.forbidden(NOT_AUTHORIZED_ERROR));
		}

		return next();
	} catch (e) {
		return next(e);
	}
};
