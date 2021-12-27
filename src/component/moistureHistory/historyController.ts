import { Response } from "express";
import { AuthRequest, successResponse } from "../../config/http";
import plotService from "../plot/plotService";
import historyInputValidation from "./historyInputValidation";
import historyService from "./historyService";

const historyController = {
	createHistory: async (req: AuthRequest , res: Response) => {
		historyInputValidation.validateNewHistory(req.body);
		const plot = await plotService.getPlotByMoistureSensor(req.body.moistureSensor);
		const history = await historyService.addNewHistory(req.body, plot);
		const response = { ...successResponse, data: history, message: "data logged successfully" };
		return res.status(response.statusCode).json(response);
	},
	getPlotHistory: async (req: AuthRequest, res: Response) => {
		const { page, limit } = req.query;
		const plotHistory = await historyService.getHistoryByPlotId(req.params.plotId, +page, +limit);
		const response = { ...successResponse, data: plotHistory, message: "Operation successful" };
		return res.status(response.statusCode).json(response);
	}
};

export default historyController;