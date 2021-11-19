import User, { IUser } from "./User";

interface IUserInput {
  email: IUser["email"];
  firstName: IUser["firstName"];
	lastName: IUser["lastName"];
}

const userRepository = {
	
	createUser: (data: IUserInput) => User.create(data),
	
	getUserByEmail: (email: IUser["email"]) => User.findOne({ email }),
	
	getUserById: (id: IUser["_id"]) => User.findById(id),
	
	updateUser: (id: IUser["_id"], data: IUserInput) => User.findByIdAndUpdate(id, data, { new: true }),
	
	setPassword: (id: IUser["_id"], password: IUser["password"]) => User.findByIdAndUpdate(id, { password }, { new: true }),
	
	//token expires set to 1 hour
	setUserToken: (id: IUser["_id"], token: IUser["token"]) => User.findByIdAndUpdate(id, { token, tokenExpires: Date.now() + 3600000 }, { new: true }),

	getUserByToken: (token: IUser["token"]) => User.find({ token, tokenExpires: { $gt: Date.now() } }),

	resetTokenAndExpiry: (token: IUser["token"]) => User.findOneAndUpdate({ token }, { token: undefined, tokenExpires: undefined }, { new: true })

};

export default Object.freeze(userRepository);