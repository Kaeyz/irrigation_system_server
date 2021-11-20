import User, { IUser } from "./User";

interface IUserInput {
  email: IUser["email"];
  firstName: IUser["firstName"];
	lastName: IUser["lastName"];
	userType: IUser["userType"];
}

const userRepository = {

	createUser: (data: IUserInput): Promise<IUser|Error>  => {
		return new Promise((resolve, reject) => {
			const newUser = new User(data);
			newUser.save()
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},
	
	getUserByEmail: (email: IUser["email"]): Promise<IUser|Error> => {
		return new Promise((resolve, reject) => {
			User.findOne({ email })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},
	
	getUserById: (id: IUser["_id"]): Promise<IUser|Error> => {
		return new Promise((resolve, reject) => {
			User.findById(id)
				.then((user: IUser) => resolve(user))
				.catch((err) => reject(err));
		});
	},
	
	updateUser: (id: IUser["_id"], data: IUserInput) : Promise<IUser|Error> => {
		return new Promise((resolve, reject) => {
			User.findByIdAndUpdate(id, data, { new: true })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},
	
	setPassword: (id: IUser["_id"], password: IUser["password"]) : Promise<IUser|Error> => {
		return new Promise((resolve, reject) => {
			User.findByIdAndUpdate(id, { password }, { new: true })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},

	setUserToken: (id: IUser["_id"], token: IUser["token"]): Promise<IUser | Error> => {
		return new Promise((resolve, reject) => {
			User.findByIdAndUpdate(id, { token, tokenExpires: Date.now() + 3600000 }, { new: true }) 	//token expires set to 1 hour
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},

	getUserByToken: (token: IUser["token"]): Promise<IUser | Error> => {
		return new Promise((resolve, reject) => {
			User.findOne({ token, tokenExpires: { $gt: Date.now() } })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},

	resetTokenAndExpiry: (token: IUser["token"]) => {
		return new Promise((resolve, reject) => {
			User.findOneAndUpdate({ token }, { token: undefined, tokenExpires: undefined }, { new: true })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	}

};

export default Object.freeze(userRepository);