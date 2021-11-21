import { Document, ObjectId } from "mongoose";

type userId = ObjectId;
type userTypeOptions = "user" | "admin";

/**
 * Interface for User Model
 * @interface IUser
 */
export interface IUser extends Document {
	_id: userId;
	firstName: string;
	lastName: string;
	email: string;
	isActive: boolean;
	userType: userTypeOptions;
	password?: string;
	token?: string;
	tokenExpires?: number;
	createdAt: number;
	updatedAt: number;
}

/**
 * Interface for Repository User Input
 * @interface IRUserInput
 */
export interface IRUserInput { 
	email: IUser["email"];
	firstName: IUser["firstName"];
	lastName: IUser["lastName"];
	userType: IUser["userType"];
}

/**
 * Interface for Service User Input
 * @interface ISUserInput
 */
export interface ISUserInput extends IRUserInput {
	password: string,
}

/**
 * Interface for JWT User Payload
 * @interface IJwtPayload
 */
export interface IJwtPayload {
	_id: IUser["_id"];
	email: IUser["email"];
}

/**
 * Interface for Secure User Data
 * @interface ISecureUserData
 */
export interface ISecureUserData  {
	_id: IUser["_id"];
	email: IUser["email"];
	firstName: IUser["firstName"];
	lastName: IUser["lastName"];
	isActive: IUser["isActive"];
	userType: IUser["userType"];
}

export interface userInput {
	firstName?: string,
	lastName?: string,
	email?: string,
	password?: string,
	confirmPassword?: string,
}

export interface loginInput {
	email?: string;
	password?: string;
}

export interface resetInput {
	token?: string;
	password?: string;
	confirmPassword?: string;
}

export interface verifyInput {
	token?: string;
}

export interface forgotInput {
	email?: string;
}
