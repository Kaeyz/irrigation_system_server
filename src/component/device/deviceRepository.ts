import { IDevice, IRDeviceInput, IDevices } from "./deviceInterface";
import Device from "./Device";

const deviceRepository = {

	createDevice: (data: IRDeviceInput): Promise<IDevice> => {
		return new Promise((resolve, reject) => {
			const newDevice = new Device(data);
			newDevice.save()
				.then((device: IDevice) => resolve(device))
				.catch(err => reject(err));
		});
	},
	
	getDevices: async (page = 1, limit = 10): Promise<IDevices> => {
		const skip = (page * limit) - limit;
		
		const devicePromise = Device.find({});
		const devices = await devicePromise.skip(skip).limit(limit).sort({ createdAt: "desc" }).exec();
		
		const countPromise = Device.find({});
		const count = await countPromise.countDocuments();
		
		return { data: devices, count, limit, page };
	},

	getDeviceBySerialNumber: (serialNumber: IDevice["serialNumber"]): Promise<IDevice> => {
		return new Promise((resolve, reject) => {
			Device.findOne({ serialNumber })
				.then((device: IDevice) => resolve(device))
				.catch(err => reject(err));
		});
	},

	mapDevice: (serialNumber: IDevice["serialNumber"]): Promise<IDevice> => {
		return new Promise((resolve, reject) => {
			Device.findOneAndUpdate({ serialNumber }, { isMapped: true }, { new: true })
				.then((device: IDevice) => resolve(device))
				.catch(err => reject(err));
		});
	},

	unMapDevice: (serialNumber: IDevice["serialNumber"]): Promise<IDevice> => {
		return new Promise((resolve, reject) => {
			Device.findOneAndUpdate({ serialNumber }, { isMapped: false }, { new: true })
				.then((device: IDevice) => resolve(device))
				.catch(err => reject(err));
		});
	}

};

export default Object.freeze(deviceRepository);