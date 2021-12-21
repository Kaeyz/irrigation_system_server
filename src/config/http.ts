import { Request, Response } from "express";
import { ISecureUserData } from "../component/user/userInterface";

export enum StatusCodes {
	SUCCESS = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INVALID_INPUT = 406,
	INTERNAL_SERVER_ERROR = 500,
}

export const responseMessages = {
	USER_EXIST: "User with email already Exist",
	LOGIN_FAILED: "Incorrect username or password",
	USER_SUSPENDED: "User has been suspended",
	USER_UNAUTHORIZED: "User unauthorized",
	SESSION_EXPIRED: "User session Expired",
	INVALID_TOKEN: "Invalid or Expired Token",
	RESET_TOKEN_SENT: "Reset Token has been sent to registered email",
	DEVICE_EXIST: "Device already exist",
	DEVICE_NOT_FOUND: "Device not found",
	DEVICE_IS_MAPPED: "Device is already mapped",
	USER_PLOT_EXIST: "Plot with similar name exist under Logged In Uer",
	PLOT_NOT_FOUND: "Plot not found"
};
	
const errorTypes = {
	200: "Success",
	400: "Bad Request",
	401: "Unauthorized",
	403: "Forbidden",
	404: "Not Found",
	406: "Input Validation Error",
	500: "Internal Server Error"
};

type ErrCodes = 200 | 400 | 401 | 403 | 404 | 406 | 500;

export class AppError {
	statusCode: ErrCodes;
	type: string;
	message: string;
	data: unknown;
	constructor(statusCode?: ErrCodes, data?: unknown, message?: string, type?: string) {
		this.statusCode = statusCode || 500;
		this.type = type || errorTypes[statusCode] || errorTypes[500];
		this.message = message || errorTypes[statusCode];
		this.data = data || null;
	}
}

export const catchAppError = (fn: (req: Request, res: Response) => Promise<unknown>) => {
	return (req: Request, res: Response) => {
		return fn(req, res).catch(async (err: AppError) => {
			return res.status(err.statusCode).json(err);
		});
	};
};

export interface AuthRequest extends Request {
	user: ISecureUserData
}

interface ISuccessResponse {
	statusCode: number;
	data: unknown,
	message: string
}

export const successResponse: ISuccessResponse = {
	statusCode: 200,
	data: null,
	message: "Operation Successful"
};