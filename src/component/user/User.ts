import { Schema, models, model, Document, Model } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	userType: string;
	password?: string;
	token?: string;
	tokenExpires?: number;
	createdAt: Date;
}

const UserSchema: Schema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	userType: {
		type: String,
		enum: ["user", "admin"],
		required: true,
		lowercase: true,
	},
	password: String,
	token: String,
	tokenExpires: Number,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const User: Model<IUser> = models.users || model("User", UserSchema);

export default Object.freeze(User);