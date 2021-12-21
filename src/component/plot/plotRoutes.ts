import { Router } from "express";
import { authorizations } from "../../config/authorization";
import { catchAppError } from "../../config/http";
import plotController from "./plotController";

const { isLoggedIn } = authorizations;

const plotRouter = Router();

plotRouter.post("/", isLoggedIn, catchAppError(plotController.createPlot));
plotRouter.get("/", isLoggedIn, catchAppError(plotController.getUserPlots));
plotRouter.get("/:id", isLoggedIn, catchAppError(plotController.getPlotByPlotId));

export default Object.freeze(plotRouter);
