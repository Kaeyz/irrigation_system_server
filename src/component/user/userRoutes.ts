import userController from "./userController";
import { Router } from "express";
import { catchAppError } from "../../config/http";

const userRouter = Router();

userRouter.post("/", catchAppError(userController.createUser));
userRouter.get("/", userController.getLoggedInUser);
userRouter.post("/admin", userController.createAdmin);
userRouter.post("/login", userController.loginUser);
userRouter.post("/forgot", userController.forgotPassword);
userRouter.post("/verify", userController.verifyToken);
userRouter.post("/reset-password", userController.resetPassword);

export default Object.freeze(userRouter);