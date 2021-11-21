import validator from "validator";
import { StatusCodes, AppError } from "../../config/http";
import utils from "../../config/utils";
import { forgotInput, loginInput, resetInput, userInput, verifyInput } from "./userInterface";


const userInputValidations = {

	validateCreateUser: (data: userInput) => {
		const errors: userInput = {};

		data.firstName = utils.validateIsEmpty(data.firstName);
		data.lastName = utils.validateIsEmpty(data.lastName);
		data.email = utils.validateIsEmpty(data.email);
		data.password = utils.validateIsEmpty(data.password);
		data.confirmPassword = utils.validateIsEmpty(data.confirmPassword);

		if (validator.isEmpty(data.firstName)) errors.firstName = "First Name is required";
		if (validator.isEmpty(data.lastName)) errors.lastName = "Last Name is required";
		if (!validator.isEmail(data.email)) errors.email = "Invalid Email";
		if (validator.isEmpty(data.email)) errors.email = "Email is required";
		if (data.password !== data.confirmPassword) errors.password = "Password do not match";
		if (validator.isEmpty(data.password)) errors.password = "Password is required";
		if (validator.isEmpty(data.confirmPassword)) errors.confirmPassword = "Confirm Password is required";

		const isValid = utils.isEmpty(errors);
		if (!isValid) {
			throw new AppError(StatusCodes.INVALID_INPUT, errors);
		}
		return isValid;
	},

	validateLoginUser: (data: loginInput) => {
		const errors: loginInput = {};

		data.email = utils.validateIsEmpty(data.email);
		data.password = utils.validateIsEmpty(data.password);

		if (!validator.isEmail(data.email)) errors.email = "Invalid Email";
		if (validator.isEmpty(data.email)) errors.email = "Email is required";
		if (validator.isEmpty(data.password)) errors.password = "Password is required";

		const isValid = utils.isEmpty(errors);
		if (!isValid) {
			throw new AppError(StatusCodes.INVALID_INPUT, errors);
		}
		return isValid;
	},

	validateForgot: (data: forgotInput) => {
		const errors: forgotInput = {};

		data.email = utils.validateIsEmpty(data.email);

		if (!validator.isEmail(data.email)) errors.email = "Invalid Email";
		if (validator.isEmpty(data.email)) errors.email = "Email is required";

		const isValid = utils.isEmpty(errors);
		if (!isValid) {
			throw new AppError(StatusCodes.INVALID_INPUT, errors);
		}
		return isValid;
	},

	validateVerify: (data: verifyInput) => {
		const errors: verifyInput = {};

		data.token = utils.validateIsEmpty(data.token);

		if (validator.isEmpty(data.token)) errors.token = "Token is required";

		const isValid = utils.isEmpty(errors);
		if (!isValid) {
			throw new AppError(StatusCodes.INVALID_INPUT, errors);
		}
		return isValid;		
	},

	validateResetPassword: (data: resetInput) => {
		const errors: resetInput = {};

		data.token = utils.validateIsEmpty(data.token);
		data.password = utils.validateIsEmpty(data.password);
		data.confirmPassword = utils.validateIsEmpty(data.confirmPassword);

		if (validator.isEmpty(data.token)) errors.token = "Token is required";
		if (data.password !== data.confirmPassword) errors.password = "Password do not match";
		if (validator.isEmpty(data.password)) errors.password = "Password is required";
		if (validator.isEmpty(data.confirmPassword)) errors.confirmPassword = "Confirm Password is required";

		const isValid = utils.isEmpty(errors);
		if (!isValid) {
			throw new AppError(StatusCodes.INVALID_INPUT, errors);
		}
		return isValid;
	}

};

export default Object.freeze(userInputValidations);