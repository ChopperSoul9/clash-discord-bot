const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();  // legge TOKEN da .env o variabili ambiente

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`Bot online come ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === 'ciao') {
    message.reply('Ciao! 👋');
  }
});

client.login(process.env.TOKEN);

  setInterval(checkBattle, CHECK_INTERVAL);
});

client.login(DISCORD_TOKEN);
