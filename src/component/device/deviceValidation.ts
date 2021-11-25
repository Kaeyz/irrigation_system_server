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
		if (!["moisture_sensor", "control_valve"].includes(data.type)) errors.type = "Type must moisture_sensor or control_valve";
		if (validator.isEmpty(type)) errors.type = "Type is required";

		const isValid = utils.isEmpty(errors);
		if (!isValid) {
			throw new AppError(StatusCodes.INVALID_INPUT, errors);
		}
		return isValid;
	}

};

export default Object.freeze(deviceInputValidations);