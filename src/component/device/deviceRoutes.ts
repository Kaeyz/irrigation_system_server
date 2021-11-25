import { Router } from "express";
import { authorizations } from "../../config/authorization";
import { catchAppError } from "../../config/http";
import deviceController from "./deviceController";

const { isAdmin } = authorizations;

const deviceRouter = Router();

deviceRouter.post("/", isAdmin, catchAppError(deviceController.createDevice));

export default Object.freeze(deviceRouter);
