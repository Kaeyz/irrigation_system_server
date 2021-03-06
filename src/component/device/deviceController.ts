import { Request, Response } from "express";
import deviceValidation from "./deviceValidation";
import { successResponse } from "../../config/http";
import deviceService from "./deviceService";

const deviceController = {
	createDevice: async (req: Request, res: Response) => {
		deviceValidation.validateCreateDevice(req.body);
		const device = await deviceService.createDevice(req.body);
		const response = { ...successResponse, data: device, message: "Device created" };
		return res.status(response.statusCode).json(response);
	},

	getDevices: async (req: Request, res: Response) => {
		const limit = req.query.limit || 10;
		const page = req.query.page || 1;
		const devices = await deviceService.getAllDevices(+page, +limit);
		const response = { ...successResponse, data: devices }; 
		return res.status(response.statusCode).json(response);
	},
	
	getDeviceBySerialNumber: async (req: Request, res: Response) => {
		const device = await deviceService.getDeviceBySerialNumber(req.params.serialNumber);
		const response = { ...successResponse, data: device };
		return res.status(response.statusCode).json(response);
	}
};

export default Object.freeze(deviceController);