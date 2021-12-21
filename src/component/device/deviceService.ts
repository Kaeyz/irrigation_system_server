import { AppError, responseMessages, StatusCodes } from "../../config/http";
import deviceRepository from "./deviceRepository";
import { IDevice, IRDeviceInput } from "./deviceInterface";

const deviceService = {
	createDevice: async (data: IRDeviceInput) => {
		const deviceExist = await deviceRepository.getDeviceBySerialNumber(data.serialNumber);
		if (deviceExist) throw new AppError(StatusCodes.BAD_REQUEST, null, responseMessages.DEVICE_EXIST);
		const newDevice = await deviceRepository.createDevice(data);
		return newDevice;
	},

	getAllDevices: (page?:number, limit?:number, search?:string,  type?: string, isMapped?:boolean) => {
		return deviceRepository.getDevices(page, limit, search, type, isMapped);
	},

	getDeviceBySerialNumber: async (serialNumber: IDevice["serialNumber"]) => {
		const device = await deviceRepository.getDeviceBySerialNumber(serialNumber);
		if (!device) throw new AppError(StatusCodes.NOT_FOUND, device, responseMessages.DEVICE_NOT_FOUND);
		return device;
	},

	checkDeviceAlreadyMapped: async (serialNumber: IDevice["serialNumber"]) => {
		const device = await deviceRepository.getDeviceBySerialNumber(serialNumber);
		if (!device) throw new AppError(StatusCodes.NOT_FOUND, null, responseMessages.DEVICE_NOT_FOUND);
		const data = { serialNumber: device.serialNumber };
		if (device.isMapped) throw new AppError(StatusCodes.BAD_REQUEST, data, responseMessages.DEVICE_IS_MAPPED);
		return device;
	},

	mapDevice: (serialNumber: IDevice["serialNumber"]) => {
		return deviceRepository.mapDevice(serialNumber);
	},

	unMapDevice: (serialNumber: IDevice["serialNumber"]) => {
		return deviceRepository.unMapDevice(serialNumber);
	}

};

export default Object.freeze(deviceService);