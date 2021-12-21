import { Response } from "express";
import { AuthRequest, successResponse } from "../../config/http";
import deviceService from "../device/deviceService";
import plotInputValidation from "./plotInputValidation";
import plotService from "./plotService";


const plotController = {
	createPlot: async (req: AuthRequest, res: Response) => {
		plotInputValidation.validateCreatePlot(req.body);
		await deviceService.checkDeviceAlreadyMapped(req.body.moistureSensor);
		await deviceService.checkDeviceAlreadyMapped(req.body.controlValve);
		const payload = { ...req.body, user: req.user._id };
		const plot = await plotService.createPlot(payload);
		await deviceService.mapDevice(req.body.moistureSensor);
		await deviceService.mapDevice(req.body.controlValve);
		const response = { ...successResponse, data: plot, message: "Plot created" };
		return res.status(response.statusCode).json(response);
	},
	getUserPlots: async (req: AuthRequest, res: Response) => {
		const plots = plotService.geUserPlots(req.user._id);
		const response = { ...successResponse, data: plots};
		return res.status(response.statusCode).json(response);
	},
	getPlotByPlotId: async (req: AuthRequest, res: Response) => {
		const plot = await plotService.getPlot(req.params.id);
		const response = { ...successResponse, data: plot};
		return res.status(response.statusCode).json(response);

	}
};

export default Object.freeze(plotController);