import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct {
	name: string;
	price: number;
	description: string;
	imgUrl: string;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		price: { type: Number, required: true },
		description: { type: String, required: true },
		imgUrl: { type: String, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export const Product = mongoose.model<IProductModel>('Product', ProductSchema);
