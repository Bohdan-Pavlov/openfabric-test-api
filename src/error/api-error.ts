import { StatusCodes } from '../constants';

class ApiError extends Error {
	status: number;
	message: string;

	constructor(status: number, message: string) {
		super();
		this.status = status;
		this.message = message;
	}

	static badRequest(message: string): ApiError {
		return new ApiError(StatusCodes.BAD_REQUEST, message);
	}

	static internal(message: string): ApiError {
		return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, message);
	}

	static forbidden(message: string): ApiError {
		return new ApiError(StatusCodes.FORBIDDEN, message);
	}

	static conflict(message: string): ApiError {
		return new ApiError(StatusCodes.CONFLICT, message);
	}

	static invalidDataPassed(message: string): ApiError {
		return new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, message);
	}
}

export default ApiError;
