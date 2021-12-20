import validator from "validator";
import { StatusCodes, AppError } from "../../config/http";
import utils from "../../config/utils";
import { createDeviceInput } from "./deviceInterface";


const deviceInputValidations = {
  
	validateCreateDevice: (data: createDeviceInput) => {
		const errors: createDeviceInput = {};

		const serialNumber = utils.validateIsEmpty(data.serialNumber);
		const type = utils.validateIsEmpty(data.type);

		if (validator.isEmpty(serialNumber)) errors.serialNumber = "Serial Number is required";
		if (!["moistureSensor", "controlValve"].includes(data.type)) errors.type = "Type must moistureSensor or controlValve";
		if (validator.isEmpty(type)) errors.type = "Type is required";

		const isValid = utils.isEmpty(errors);
		if (!isValid) {
			throw new AppError(StatusCodes.INVALID_INPUT, errors);
		}
		return isValid;
	}

};

export default Object.freeze(deviceInputValidations);