import { Router } from "express";
import { authorizations } from "../../config/authorization";
import { catchAppError } from "../../config/http";
import historyController from "./historyController";

const { isLoggedIn } = authorizations;

const deviceRouter = Router();

export const notificationRouter = Router().get("/", catchAppError(historyController.createHistory));

deviceRouter.get("/:plotId", isLoggedIn, catchAppError(historyController.getPlotHistory));

export default Object.freeze(deviceRouter);
