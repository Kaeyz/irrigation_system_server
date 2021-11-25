import { Client, Intents, TextChannel } from "discord.js";
import keys from "./keys";

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
bot.on("ready", () => console.log("Sheldon is ready;"));
bot.login(keys.discordKey);

const sheldon = {
	sendMessage: async (message: string) => {
		const irrigationChannel = bot.channels.cache.find((c: TextChannel) => c.name === "irrigation_server_notification") as TextChannel;
		await irrigationChannel.send(message);
		return message;
	}
};

export default Object.freeze(sheldon);