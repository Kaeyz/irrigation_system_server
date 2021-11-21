import { AppError, StatusCodes } from "../../config/http";
import userRepository, { IRUserInput } from "./userRepository";
import utils from "../../config/utils";

/**
 * Interface for Service User Input
 * @interface IRUserInput
 */
interface ISUserInput extends IRUserInput {
	password: string,
}


const userService = {
	checkUserExist: async (email: IRUserInput["email"]): Promise<boolean> => {	
		const user = await userRepository.getUserByEmail(email);
		if (user) throw new AppError(StatusCodes.BAD_REQUEST, null, "User with email already Exist");
		return !!user;
	},

	createUser: async (userData: ISUserInput) => {
		const passwordHash = await utils.hashValue(userData.password);
		delete userData.password;
		let newUser = await userRepository.createUser(userData);
		newUser = await userRepository.setPassword(newUser._id, passwordHash);
		const user = newUser.toJSON();
		delete user.password;
		return user;
	}
};

export default Object.freeze(userService);