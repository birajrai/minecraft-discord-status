import { Client, Intents, MessageEmbed } from "discord.js";
import * as dotenv from "dotenv";
import * as path from "path";
import fetchJavaServer from "./McServerStatus";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

// create a new client instance
let client = new Client({
  intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
});

let servers = {
  Proxy: "13.235.54.21:25565",
  Bedwars: "13.235.54.21:26674",
  Survival: "13.235.54.21:26245",
  Lobby: "13.235.54.21:26421",
  PvP: "13.235.54.21:20968",
};

client.on("ready", (client) => {
  console.log(
    `Logged in as ${client.user.username}#${client.user.discriminator}`
  );
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.inGuild) return;
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;
  const args = message.content
    .slice((process.env.PREFIX as string).length)
    .trim()
    .split(/ +/g);
  const command: string = args.shift()!.toLowerCase();
  // make sure that the command is "stats"
  if (command === "stats") {
    let embed = new MessageEmbed()
      .setTitle("Server status")
      .setFooter({ text: "Made by DayDevelopment (c) 2022 " })
      .setColor("BLURPLE");
    for (let [key, value] of Object.entries(servers)) {
      let status = await fetchJavaServer(value);
      let online = status ? "🟢" : "🔴";
      embed.addField(key, `Server status: ${online}`);
    }
    message.channel.send({ embeds: [embed] });
    message.delete();
  }
});

client.login(process.env.DISCORD_TOKEN);
