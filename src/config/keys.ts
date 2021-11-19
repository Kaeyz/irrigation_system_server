const env = process.env;

interface keysInterface {
	port: string,
	host: string,
	mongoUri: string
	serverUsername: string,
	serverPassword: string
}

const keys: keysInterface = {
	port: env.PORT,
	host: env.HOST,
	mongoUri: env.MONGO_URI,
	serverUsername: env.SERVER_USERNAME,
	serverPassword: env.SERVER_PASSWORD
};

export default Object.freeze(keys);