import { IRUserInput, ISUserInput, IUser, ISecureUserData, IJwtPayload, loginInput, resetInput, } from "./userInterface";
import { AppError, StatusCodes, responseMessages } from "../../config/http";
import userRepository from "./userRepository";
import utils from "../../config/utils";
import sheldon from "../../config/sheldon";
import keys from "../../config/keys";

const convertToSecureUserData = (user: IUser): ISecureUserData => {
	const secureData = user.toJSON();
	delete secureData.password;
	delete secureData.token;
	delete secureData.tokenExpires;
	return secureData as unknown as ISecureUserData;
};

const userService = {
	checkUserExist: async (email: IRUserInput["email"]): Promise<boolean> => {
		const user = await userRepository.getUserByEmail(email);
		if (user) throw new AppError(StatusCodes.BAD_REQUEST, null, responseMessages.USER_EXIST);
		return !!user;
	},

	createUser: async (userData: ISUserInput): Promise<ISecureUserData> => {
		const passwordHash = await utils.hashValue(userData.password);
		delete userData.password;
		let newUser = await userRepository.createUser(userData);
		newUser = await userRepository.setPassword(newUser._id, passwordHash);
		return convertToSecureUserData(newUser);
	},

	authenticateUser: async (loginData: loginInput): Promise<string> => {
		const user = await userRepository.getUserByEmail(loginData.email);
		if (!user) throw new AppError(StatusCodes.BAD_REQUEST, null, responseMessages.LOGIN_FAILED);
		const isMatch = await utils.compareHash(user.password, loginData.password);
		if (!isMatch) throw new AppError(StatusCodes.BAD_REQUEST, null, responseMessages.LOGIN_FAILED);
		const payload: IJwtPayload  = { _id: user._id, email: user.email };
		const authToken = await utils.generateLoginToken(payload);
		return authToken;
	},

	getLoggedInUser: async (jwt_id: IUser["_id"]): Promise<ISecureUserData> => {
		const user = await userRepository.getUserById(jwt_id);
		return convertToSecureUserData(user);
	},

	initiateForgot: async (email: IUser["email"] ): Promise<void> => {
		let user = await userRepository.getUserByEmail(email);
		if (!user) throw new AppError(StatusCodes.SUCCESS, null, responseMessages.RESET_TOKEN_SENT);
		if (!user.isActive) throw new AppError(StatusCodes.FORBIDDEN, null, responseMessages.USER_SUSPENDED);
		const token = utils.getRandomToken(3).toUpperCase();
		user = await userRepository.setUserToken(user._id, token);
		const resetMessage = `Reset token for ${user.email} is: ${user.token}
Reset link: ${keys.webAppLink}/reset/${user.token}`;
		await sheldon.sendMessage(resetMessage);
		return;
	},

	verifyToken: async (token: IUser["token"]) => {
		const user = await userRepository.getUserByToken(token);
		if (!user) throw new AppError(StatusCodes.BAD_REQUEST, null, responseMessages.INVALID_TOKEN);
		return { isValid: !!user, user: convertToSecureUserData(user) };
	},

	resetPassword: async (resetData: resetInput): Promise<ISecureUserData> => {
		const { user } = await userService.verifyToken(resetData.token);
		const passwordHash = await utils.hashValue(resetData.password);
		let updatedUser = await userRepository.setPassword(user._id, passwordHash);
		updatedUser = await userRepository.resetTokenAndExpiry(updatedUser._id);
		return convertToSecureUserData(updatedUser);
	}
	
};

export default Object.freeze(userService);