import { Schema, models, model, Document, Model } from "mongoose";


type userId = typeof import("mongodb").ObjectID;

enum userTypeOptions {
	"admin", "user"
}
export interface IUser extends Document {
	_id: userId
	firstName: string;
	lastName: string;
	email: string;
	userType: userTypeOptions;
	password?: string;
	token?: string;
	tokenExpires?: number;
	createdAt: number;
	updatedAt: number;
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
}, {
	timestamps: { createdAt: true, updatedAt: true },
	versionKey: false
});

const User: Model<IUser> = models.users || model("User", UserSchema);

export default Object.freeze(User);