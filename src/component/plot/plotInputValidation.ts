import validator from "validator";
import { StatusCodes, AppError } from "../../config/http";
import utils from "../../config/utils";
import { plotInput  } from "./plotInterface";


const plotInputValidations = {

	validateCreatePlot: (data: plotInput) => {
		const errors: plotInput = {};

		data.name = utils.validateIsEmpty(data.name);
		data.moistureRequirement = utils.validateIsEmpty(data.moistureRequirement);
		data.moistureSensor = utils.validateIsEmpty(data.moistureSensor);
		data.controlValve = utils.validateIsEmpty(data.controlValve);

		if (validator.isEmpty(data.name)) errors.name = "Name is required";
		if (!validator.isFloat(data.moistureRequirement)) errors.moistureRequirement = "Moisture requirement must be a number";
		if (validator.isEmpty(data.moistureRequirement)) errors.moistureRequirement = "Moisture Requirement is required";
		if (validator.isEmpty(data.moistureSensor)) errors.moistureSensor = "Moisture Sensor is required";
		if (validator.isEmpty(data.controlValve)) errors.controlValve = "Control Valve is required";

		const isValid = utils.isEmpty(errors);
		if (!isValid) throw new AppError(StatusCodes.INVALID_INPUT, errors);
		return isValid;
	},

};

export default Object.freeze(plotInputValidations);