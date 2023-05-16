export enum StatusCodes {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	CONFLICT = 409,
	UNPROCESSABLE_ENTITY = 422,
	INTERNAL_SERVER_ERROR = 500,
}

export const UNEXPECTED_ERROR = 'Unexpected error!';
export const DATABASE_CONNECTED_SUCCESSFULLY = 'Connected to MongoDB';
export const DATABASE_CONNECTION_ERROR = 'Error connecting to MongoDB';
