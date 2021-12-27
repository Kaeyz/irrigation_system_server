import validator from "validator";
import { StatusCodes, AppError } from "../../config/http";
import utils from "../../config/utils";
import { historyInput } from "./historyInterface";


const moistureInputValidations = {
	
	validateNewHistory: (data: historyInput) => {
		const errors: historyInput = {};

		const moistureSensor = utils.validateIsEmpty(data.moistureSensor);
		const moistureValue = utils.validateIsEmpty(data.moistureValue);

		if (validator.isEmpty(moistureSensor)) errors.moistureSensor = "Moisture Sensor is required";
		if (validator.isEmpty(moistureValue)) errors.moistureValue = "Moisture value is required";

		const isValid = utils.isEmpty(errors);
		
		if (!isValid) throw new AppError(StatusCodes.INVALID_INPUT, errors);
		return isValid;
	}

};

export default Object.freeze(moistureInputValidations);