import { Document, ObjectId } from "mongoose";
import { IUser } from "../user/userInterface";

type plotId = ObjectId;

/**
 * Interface for Plot Model
 * @interface IPlot
 */
export interface IPlot extends Document {
	_id: plotId;
	user: IUser["_id"];
	moistureRequirement: number;
	moistureSensor: string;
	controlValve: string;
	createdAt: number;
	updatedAt: number;
}

