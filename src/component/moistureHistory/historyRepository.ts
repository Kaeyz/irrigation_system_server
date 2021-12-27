import { IHistory, IHistoryInput, IHistoryList } from "./historyInterface";
import History from "./History";

const historyRepository = {

	createHistory: (data: IHistoryInput): Promise<IHistory> => {
		return new Promise((resolve, reject) => {
			const newHistory = new History(data);
			newHistory.save()
				.then((history: IHistory) => resolve(history))
				.catch(err => reject(err));
		});
	},
	
	getHistory: async (page = 1, limit = 10, plot: IHistory["plot"] ): Promise<IHistoryList> => {
		const skip = (page * limit) - limit;

		const historyPromise = History.find({plot});
		const historyList = await historyPromise.skip(skip).limit(limit).sort({ createdAt: "desc" }).exec();
		
		const countPromise = History.find({ plot });
		const count = await countPromise.countDocuments();
		
		return { data: historyList, count, limit, page };
	}

};

export default Object.freeze(historyRepository);