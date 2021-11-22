import { Schema, models, model, Model, } from "mongoose";
import { IDevice } from "./deviceInterface";

const DeviceSchema: Schema = new Schema({
	serialNumber: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
		enum: ["moistureSensor", "controlValve"],
		required: true,
		lowercase: true,
	},
}, {
	timestamps: { createdAt: true },
	versionKey: false,
});

const Device: Model<IDevice> = models.devices || model("Device", DeviceSchema);

export default Device;