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
  isMapped: boolean;
  createdAt: number;
  updatedAt: number;
}

/**
 * Interface for Devices
 * @interface IDevices
 */
export interface IDevices {
	data: IDevice[];
	count: number;
	limit: number;
	page: number;
}

/**
 * Interface for Device Repository Input 
 * @interface IRDeviceInput
 */
export interface IRDeviceInput {
  type: IDevice["type"];
  serialNumber: IDevice["serialNumber"];
}

export interface createDeviceInput {
  type?: string;
  serialNumber?: string;
}