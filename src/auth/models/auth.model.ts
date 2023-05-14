import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthDto {
	email: string;
	password: string;
}

export interface IAuthResponse {
	accessToken: string;
}

export interface IUser {
	email: string;
	passwordHash: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default mongoose.model<IUserModel>('User', UserSchema);
