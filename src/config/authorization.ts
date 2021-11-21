import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ISecureUserData } from "../component/user/userInterface";
import { StatusCodes, AppError, responseMessages } from "./http";


const authenticate = (req: Request, res: Response, next: NextFunction, callback?: (user: ISecureUserData, next: NextFunction) => void) => {
	passport.authenticate("jwt", { session: false }, (user: ISecureUserData) => {
		if (!user) throw new AppError(StatusCodes.FORBIDDEN, null, responseMessages.SESSION_EXPIRED);
		if (!user.isActive) throw new AppError(StatusCodes.FORBIDDEN, null, responseMessages.USER_SUSPENDED);
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
			if (user.userType !== "user") throw new AppError(StatusCodes.FORBIDDEN, null, responseMessages.USER_UNAUTHORIZED);
			next();
		});
	},

	isAdmin: (req: Request, res: Response, next: NextFunction) => {
		return authenticate(req, res, next, (user, next) => {
			if (user.userType !== "admin") throw new AppError(StatusCodes.FORBIDDEN, null, responseMessages.USER_UNAUTHORIZED);
			next();
		});
	},
};