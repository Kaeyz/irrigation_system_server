import { IPlot } from "../plot/plotInterface";
import { historyInput, IHistoryInput } from "./historyInterface";
import historyRepository from "./historyRepository";

const historyService = {
	addNewHistory: async (data: historyInput, plot: IPlot) => {
		const value = Number(data.moistureValue);
		const isIrrigated = value < plot.moistureRequirement;
		const payload: IHistoryInput = {
			controlValve: plot.controlValve,
			moistureValue: data.moistureValue,
			moistureSensor: plot.moistureSensor,
			plot: plot._id,
			isIrrigated
		};

		const newHistory = await historyRepository.createHistory(payload);
		return newHistory;
	},

	getHistoryByPlotId: (plot: string, page?: number, limit?: number) => {
		const plotId = plot as unknown as IPlot["_id"];
		return historyRepository.getHistory(page, limit, plotId);
	},

};

export default Object.freeze(historyService);