import { Response } from "express";
import { AuthRequest, successResponse } from "../../config/http";
import plotService from "../plot/plotService";
import historyInputValidation from "./historyInputValidation";
import historyService from "./historyService";

const historyController = {
	createHistory: async (req: AuthRequest, res: Response) => {
		const { moistureValue, moistureSensor } = req.query;
		const data = {
			moistureSensor: moistureSensor ? String(moistureSensor) : undefined,
			moistureValue: moistureValue ? String(moistureValue) : undefined 
		};
		historyInputValidation.validateNewHistory(data);
		const plot = await plotService.getPlotByMoistureSensor(data.moistureSensor);
		const history = await historyService.addNewHistory(data, plot);
		const response = { ...successResponse, data: history, message: "data logged successfully" };
		return res.status(response.statusCode).json(response);
	},
	getPlotHistory: async (req: AuthRequest, res: Response) => {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const plotHistory = await historyService.getHistoryByPlotId(req.params.plotId, +page, +limit);
		const response = { ...successResponse, data: plotHistory, message: "Operation successful" };
		return res.status(response.statusCode).json(response);
	}
};

export default historyController;