import { Request, Response } from "express";
import { successResponse } from "../../config/http";
import userInputValidation from "./userInputValidation";
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
		payload.userType = "user";
		const newUser = userService.createUser(payload);
		const response = { ...successResponse, data: newUser, message: "Admin created" };
		return res.status(response.statusCode).json(response);
	},

	loginUser: (req: Request, res: Response) => {
		return res.status(200).json(req.body);
	},

	forgotPassword: (req: Request, res: Response) => {
		return res.status(200).json(req.body);
	},

	verifyToken: (req: Request, res: Response) => {
		return res.status(200).json(req.body);
	},

	resetPassword: (req: Request, res: Response) => {
		return res.status(200).json(req.body);
	},

	getLoggedInUser: (req: Request, res: Response) => {
		return res.status(200).json(req.body);
	},

};

export default Object.freeze(userController);