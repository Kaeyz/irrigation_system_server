import { Router } from "express";
import { authorizations } from "../../config/authorization";
import { catchAppError } from "../../config/http";
import userController from "./userController";

const { isLoggedIn } = authorizations;

const userRouter = Router();

userRouter.post("/", catchAppError(userController.createUser));
userRouter.post("/admin", catchAppError(userController.createAdmin));
userRouter.post("/login", catchAppError(userController.loginUser));
userRouter.get("/me", isLoggedIn, catchAppError(userController.getLoggedInUser));
userRouter.post("/forgot", catchAppError(userController.forgotPassword));
userRouter.post("/verify", catchAppError(userController.verifyToken));
userRouter.post("/reset-password", catchAppError(userController.resetPassword));

export default Object.freeze(userRouter);
