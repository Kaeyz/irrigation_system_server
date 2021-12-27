import { Schema, models, model, Model, } from "mongoose";
import { IHistory } from "./historyInterface";

const HistorySchema: Schema = new Schema({
	plot: {
		type: Schema.Types.ObjectId,
		ref: "plots"
	},
	moistureSensor: String,
	controlValve: String,
	moistureValue: {
		type: Number,
		required: true
	},
	isIrrigated: {
		type: Boolean,
	}
}, {
	timestamps: { createdAt: true },
	versionKey: false,
});

const History: Model<IHistory> = models.history || model("history", HistorySchema);

export default History;