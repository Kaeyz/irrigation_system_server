import Plot from "./Plot";
import { IPlot, IPlotInput } from "./plotInterface";

const plotRepository = {
	createPlot: (data: IPlotInput): Promise<IPlot> => {
		return new Promise((resolve, reject) => {
			const newPlot = new Plot(data);
			newPlot.save()
				.then((plot: IPlot) => resolve(plot))
				.catch(err => reject(err));
		});
	},

	getPlotByUserAndName: (user: IPlot["user"], name: IPlot["name"]): Promise<IPlot> => {
		return new Promise((resolve, reject) => {
			Plot.findOne({ name, user })
				.then((plot: IPlot) => resolve(plot))
				.catch((err => reject(err)));
		});
	},

	getPlotsByUser: (user: IPlot["user"]) => {
		return new Promise((resolve, reject) => {
			Plot.find({ user })
				.then((plots: IPlot[]) => resolve(plots))
				.catch(err => reject(err));
		});
	},

	getPlotById: (id: string) => {
		return new Promise((resolve, reject) => {
			Plot.findById(id)
				.then((plot: IPlot) => resolve(plot))
				.catch(err => reject(err));
		});
	},

	getPlotByMoistureSensor: (moistureSensor: IPlot["moistureSensor"]): Promise<IPlot> => {
		return new Promise((resolve, reject) => {
			Plot.findOne({ moistureSensor })
				.then((plot: IPlot) => resolve(plot))
				.catch(err => reject(err));
		});
	}

};

export default Object.freeze(plotRepository);