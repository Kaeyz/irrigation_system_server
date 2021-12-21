import { Document, ObjectId } from "mongoose";
import { IUser } from "../user/userInterface";

type plotId = ObjectId;

/**
 * Interface for Plot Model
 * @interface IPlot
 */
export interface IPlot extends Document {
	_id: plotId;
	name: string;
	user: IUser["_id"];
	moistureRequirement: number;
	moistureSensor: string;
	controlValve: string;
	createdAt: number;
	updatedAt: number;
}

export interface IPlotInput {
	name: IPlot["name"];
	user: IPlot["user"];
	moistureRequirement: IPlot["moistureRequirement"];
	controlValve: IPlot["controlValve"];
	moistureSensor: IPlot["moistureSensor"];
}
export interface plotInput {
	name?: string;
	moistureRequirement?: string;
	controlValve?: string;
	moistureSensor?: string;
}