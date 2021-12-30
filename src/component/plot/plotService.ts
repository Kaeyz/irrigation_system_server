import { AppError, responseMessages, StatusCodes } from "../../config/http";
import { IPlot, IPlotInput } from "./plotInterface";
import plotRepository from "./plotRepository";

const plotService = {
	createPlot: async (data: IPlotInput) => {
		const plot = await plotRepository.getPlotByUserAndName(data.user, data.name);
		if (plot) throw new AppError(StatusCodes.BAD_REQUEST, null, responseMessages.USER_PLOT_EXIST);
		const newPlot = await plotRepository.createPlot(data);
		return newPlot.toJSON();
	},
	geUserPlots: (user: IPlotInput["user"], page: number, limit: number) => {
		return plotRepository.getPlotsByUser(user, page, limit);
	},
	getPlot: async (id: string) => {
		const plot = await plotRepository.getPlotById(id);
		if (!plot) throw new AppError(StatusCodes.NOT_FOUND, null, responseMessages.PLOT_NOT_FOUND);
		return plot;
	},
	getPlotByMoistureSensor: async (moistureSensor: IPlot["moistureSensor"]) => {
		const plot = await plotRepository.getPlotByMoistureSensor(moistureSensor);
		if (!plot) throw new AppError(StatusCodes.NOT_FOUND, null, responseMessages.PLOT_NOT_FOUND);
		return plot;
	}
};

export default Object.freeze(plotService);