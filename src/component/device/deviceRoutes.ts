import { Router } from "express";
import { authorizations } from "../../config/authorization";
import { catchAppError } from "../../config/http";
import deviceController from "./deviceController";

const { isAdmin, isLoggedIn } = authorizations;

const deviceRouter = Router();

deviceRouter.post("/", isAdmin, catchAppError(deviceController.createDevice));
deviceRouter.get("/", isLoggedIn, catchAppError(deviceController.getDevices));
deviceRouter.get("/:serialNumber", isLoggedIn, catchAppError(deviceController.getDeviceBySerialNumber));

export default Object.freeze(deviceRouter);
