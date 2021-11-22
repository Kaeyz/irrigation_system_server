import { Document, ObjectId } from "mongoose";

type deviceId = ObjectId;
type deviceTypeOptions = "moistureSensor" | "controlValve";

/**
 * Interface for Device Model
 * @interface IDevice
 */
export interface IDevice extends Document {
  _id: deviceId;
  type: deviceTypeOptions;
  serialNumber: string;
  createdAt: number;
  updatedAt: number;
}