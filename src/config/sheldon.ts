import { Client, Intents, TextChannel } from "discord.js";
import keys from "./keys";

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
bot.login(keys.discordKey);

const sheldon = {
	sendMessage: async (message: string) => {
		bot.on("ready", async () => {
			const irrigationChannel = bot.channels.cache.find((c: TextChannel) => c.name === "irrigation_server_notification") as TextChannel;
			await irrigationChannel.send(message);
			return;
		});
		return;
	}
};

export default Object.freeze(sheldon);