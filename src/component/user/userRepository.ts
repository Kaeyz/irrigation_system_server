import { IUser, IRUserInput } from "./userInterface";
import User from "./User";

const userRepository = {

	createUser: (data: IRUserInput): Promise<IUser> => {
		return new Promise((resolve, reject) => {
			const newUser = new User(data);
			newUser.save()
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},
	
	getUserByEmail: (email: IUser["email"]): Promise<IUser> => {
		return new Promise((resolve, reject) => {
			User.findOne({ email })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},
	
	getUserById: (id: IUser["_id"]): Promise<IUser> => {
		return new Promise((resolve, reject) => {
			User.findById(id)
				.then((user: IUser) => resolve(user))
				.catch((err) => reject(err));
		});
	},
	
	updateUser: (id: IUser["_id"], data: IRUserInput) : Promise<IUser> => {
		return new Promise((resolve, reject) => {
			User.findByIdAndUpdate(id, data, { new: true })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},
	
	setPassword: (id: IUser["_id"], password: IUser["password"]) : Promise<IUser> => {
		return new Promise((resolve, reject) => {
			User.findByIdAndUpdate(id, { password }, { new: true })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},

	setUserToken: (id: IUser["_id"], token: IUser["token"]): Promise<IUser> => {
		return new Promise((resolve, reject) => {
			User.findByIdAndUpdate(id, { token, tokenExpires: Date.now() + 3600000 }, { new: true }) 	//token expires set to 1 hour
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},

	getUserByToken: (token: IUser["token"]): Promise<IUser> => {
		return new Promise((resolve, reject) => {
			User.findOne({ token, tokenExpires: { $gt: Date.now() } })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	},

	resetTokenAndExpiry: (id: IUser["_id"]): Promise<IUser> => {
		return new Promise((resolve, reject) => {
			User.findByIdAndUpdate(id, {$unset: {token: 1, tokenExpires: 1}  }, { new: true })
				.then((user: IUser) => resolve(user))
				.catch(err => reject(err));
		});
	}

};

export default Object.freeze(userRepository);