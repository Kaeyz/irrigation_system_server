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

	getPlotsByUser: async (user: IPlot["user"], page = 1, limit = 10) => {
		const skip = (page * limit) - limit;
		
		const plotPromise = Plot.find({user});
		const plots = await plotPromise.skip(skip).limit(limit).sort({ createdAt: "desc" }).exec();
		
		const countPromise = Plot.find({user});
		const count = await countPromise.countDocuments();
		
		return { data: plots, count, limit, page };
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