import { Schema, models, model, Model, } from "mongoose";
import { IPlot } from "./plotInterface";

const PlotSchema: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	moistureRequirement: {
		type: Number,
		required: true
	},
	moistureSensor: {
		type: String,
	},
	controlValve: {
		type: String,
	}
}, {
	timestamps: { createdAt: true },
	versionKey: false,
});

const Plot: Model<IPlot> = models.plots || model("Plot", PlotSchema);

export default Plot;