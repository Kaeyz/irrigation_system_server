import { Request, Response } from "express";
import userInputValidation from "./userInputValidation";
import { successResponse } from "../../config/http";
import userService from "./userService";

const userController = {

	createUser: async (req: Request, res: Response) => {
		userInputValidation.validateCreateUser(req.body);
		await userService.checkUserExist(req.body.email);
		const payload = req.body;
		payload.userType = "user";
		const newUser = await userService.createUser(payload);
		const response = { ...successResponse, data: newUser, message: "User created" };
		return res.status(response.statusCode).json(response);
	},

	createAdmin: async (req: Request, res: Response) => {
		userInputValidation.validateCreateUser(req.body);
		await userService.checkUserExist(req.body.email);
		const payload = req.body;
		payload.userType = "admin";
		const newUser = await userService.createUser(payload);
		const response = { ...successResponse, data: newUser, message: "Admin created" };
		return res.status(response.statusCode).json(response);
	},

	loginUser: async (req: Request, res: Response) => {
		userInputValidation.validateLoginUser(req.body);
		const token =	await userService.authenticateUser(req.body);
		const response = { ...successResponse, data: { token }, message: "Login Successful" };
		return res.status(response.statusCode).json(response);
	},

	forgotPassword: async (req: Request, res: Response) => {
		await userInputValidation.validateForgot(req.body);
		await userService.initiateForgot(req.body.email);
		const response = { ...successResponse, message: "Reset Password send to email" };
		return res.status(response.statusCode).json(response);
	},

	verifyToken: async (req: Request, res: Response) => {
		userInputValidation.validateVerify(req.body);
		const data = await userService.verifyToken(req.body.token);
		const response = { ...successResponse, data, message: "Token verified" };
		return res.status(response.statusCode).json(response);
	},

	resetPassword: async (req: Request, res: Response) => {
		userInputValidation.validateResetPassword(req.body);
		const user = await userService.resetPassword(req.body);
		const loginData = { email: user.email, password: req.body.password};
		const token = await userService.authenticateUser(loginData);
		const response = { ...successResponse, data: { token }, message: "Password reset Successful and user Logged in" };
		return res.status(response.statusCode).json(response);
	},

	getLoggedInUser: async (req: Request, res: Response) => {
		const response = { ...successResponse, data: req.user};
		return res.status(response.statusCode).json(response);
	}

};

export default Object.freeze(userController);