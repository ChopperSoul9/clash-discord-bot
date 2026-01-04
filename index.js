// index.js
import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

// Legge il token dal file .env
const TOKEN = process.env.DISCORD_TOKEN;

if (!TOKEN) {
  console.error('❌ Errore: devi mettere DISCORD_TOKEN nel file .env');
  process.exit(1);
}

// Crea il client Discord
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Quando il bot è pronto
client.once('ready', () => {
  console.log(`✅ Bot pronto! Loggato come ${client.user.tag}`);
});

// Esempio di comando: risponde "Ciao!" a "!ciao"
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === '!ciao') {
    message.channel.send('Ciao!');
  }
});

// Avvia il bot
client.login(TOKEN);
