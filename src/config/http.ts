import { Request, Response } from "express";

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
	RESET_TOKEN_SENT: "Reset Token has been sent to registered email"
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

export class AppError extends Error {
	statusCode: ErrCodes;
	type: string;
	data: unknown;
	errorMessage: string;
	trace: string;
	constructor(statusCode?: ErrCodes, data?: unknown, message?: string, type?: string) {
		super(message || errorTypes[500]);
		this.statusCode = statusCode || 500;
		this.type = type || errorTypes[statusCode] || errorTypes[500];
		this.errorMessage = message || errorTypes[statusCode];
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