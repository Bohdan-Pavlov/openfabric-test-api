import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { StatusCodes } from '../constants';
import { INVALID_CREDENTIALS_ERROR, RESERVE_SECRET_KEY, USER_ALREADY_EXISTS_ERROR } from '../auth/auth.constants';
import { ApiError } from '../error/api-error';
import { IAuthDto, IAuthResponse, IUserModel, User } from '../auth/models/auth.model';

const generateJwt = (id: string, email: string) => {
	return jwt.sign(
		{
			id,
			email,
		},
		process.env.SECRET_KEY ?? RESERVE_SECRET_KEY,
		{ expiresIn: '24h' }
	);
};

export const login = async (request: Request, response: Response, next: NextFunction) => {
	const { email, password } = request.body as IAuthDto;

	const user: IUserModel | null = await User.findOne({ email });

	if (!user) {
		return next(ApiError.badRequest(INVALID_CREDENTIALS_ERROR));
	}

	const isValidPassword = bcrypt.compareSync(password, user.passwordHash);

	if (!isValidPassword) {
		return next(ApiError.badRequest(INVALID_CREDENTIALS_ERROR));
	}

	const token = generateJwt(user.id, user.email);

	const responseData: IAuthResponse = {
		accessToken: token,
	};

	return response.status(StatusCodes.OK).json(responseData);
};

export const register = async (request: Request, response: Response, next: NextFunction) => {
	const { email, password } = request.body as IAuthDto;

	const candidate: IUserModel | null = await User.findOne({ email });

	if (candidate) {
		return next(ApiError.conflict(USER_ALREADY_EXISTS_ERROR));
	}

	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	const hashPassword = await bcrypt.hash(password, salt);

	const user: IUserModel = await User.create({ email, passwordHash: hashPassword });

	const token = generateJwt(user.id, user.email);

	const responseData: IAuthResponse = {
		accessToken: token,
	};

	return response.status(StatusCodes.OK).json(responseData);
};
