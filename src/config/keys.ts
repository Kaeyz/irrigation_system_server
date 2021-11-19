const env = process.env;

interface keysInterface {
	port: string,
	mongoUri: string
}

const keys: keysInterface = {
	port: env.PORT,
	mongoUri: env.MONGO_URI
};

export default Object.freeze(keys);