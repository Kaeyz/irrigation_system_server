import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ISecureUserData } from "../component/user/userInterface";
import { StatusCodes, AppError, responseMessages } from "./http";


const authenticate = (req: Request, res: Response, next: NextFunction, callback?: (user: ISecureUserData, next: NextFunction) => void) => {
	passport.authenticate("jwt", { session: false }, (err, user: ISecureUserData) => {

		if (!user) {
			const response =	new AppError(StatusCodes.FORBIDDEN, null, responseMessages.SESSION_EXPIRED);
			return res.status(response.statusCode).json(response);	
		}
		if (!user.isActive) {
			const response = new AppError(StatusCodes.FORBIDDEN, null, responseMessages.USER_SUSPENDED);
			return res.status(response.statusCode).json(response);
		}
		req.user = user;
		if (callback) {
			return callback(user, next);
		}
		next();
	})(req, res, next);
};


export const authorizations = {
	isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
		return authenticate(req, res, next);
	},

	isUser: (req: Request, res: Response, next: NextFunction) => {
		return authenticate(req, res, next, (user) => {
			if (user.userType !== "user") {
				const response = new AppError(StatusCodes.FORBIDDEN, null, responseMessages.USER_UNAUTHORIZED);
				return res.status(response.statusCode).json(response);
			}
			next();
		});
	},

	isAdmin: (req: Request, res: Response, next: NextFunction) => {
		return authenticate(req, res, next, (user, next) => {
			if (user.userType !== "admin") {
				const response = new AppError(StatusCodes.FORBIDDEN, null, responseMessages.USER_UNAUTHORIZED);
				return res.status(response.statusCode).json(response);
			}
			next();
		});
	},
};