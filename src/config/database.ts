import mongoose, { ConnectOptions } from "mongoose";
import keys from "./keys";

const db = {
	connect: async () => {
		try {
			await mongoose.connect(keys.mongoUri, {
				useNewUrlParser: true,
				useUnifiedTopology: true
			} as ConnectOptions);
			console.log("Connected to Database Successfully");
		} catch (err) {
			console.error({ err });
			throw new Error(`dbErr: ${err}`);
		}
	}
};

export default Object.freeze(db);