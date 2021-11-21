const env = process.env;

interface keysInterface {
	port: string,
	host: string,
	appEnv: string,
	mongoUri: string
	serverUsername: string,
	serverPassword: string,
	discordKey: string
}

const keys: keysInterface = {
	port: env.PORT,
	host: env.HOST,
	appEnv: env.APP_ENV,
	mongoUri: env.MONGO_URI,
	serverUsername: env.SERVER_USERNAME,
	serverPassword: env.SERVER_PASSWORD,
	discordKey: env.DISCORD_KEY
};

export default Object.freeze(keys);