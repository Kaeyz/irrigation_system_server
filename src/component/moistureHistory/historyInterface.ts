import { Document, ObjectId } from "mongoose";
import { IPlot } from "../plot/plotInterface";

type plotId = ObjectId;

/**
 * Interface for History Model
 * @interface IHistory
 */
export interface IHistory extends Document {
	_id: plotId;
  plot: IPlot["_id"];
  moistureSensor: IPlot["moistureSensor"];
  controlValve: IPlot["controlValve"];
  moistureValue: string;
  isIrrigated: boolean;
	createdAt: number;
}

export interface IHistoryInput {
  plot: IHistory["plot"];
  moistureValue: IHistory["moistureValue"];
  moistureSensor: IHistory["moistureSensor"];
  controlValve: IHistory["controlValve"];
  isIrrigated: IHistory["isIrrigated"];
}
export interface historyInput {
	moistureSensor?: string;
	moistureValue?: string;
}

/**
 * Interface for History list
 * @interface IHistoryList
 */
export interface IHistoryList {
	data: IHistory[];
	count: number;
	limit: number;
	page: number;
}