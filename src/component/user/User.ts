import { Schema, models, model, Model, } from "mongoose";
import { IUser } from "./userInterface";

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