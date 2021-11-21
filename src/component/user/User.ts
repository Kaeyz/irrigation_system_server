import { Schema, models, model, Document, Model, ObjectId } from "mongoose";

type userId = ObjectId;
type userTypeOptions = "user" | "admin";
export interface IUser extends Document {
	_id: userId;
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
	isActive: {
		type: Boolean,
		default: true
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
	versionKey: false,
});

const User: Model<IUser> = models.users || model("User", UserSchema);

export default User;