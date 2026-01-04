// index.mjs 
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente dal file .env (non necessario su Railway se usi ENV vars)
dotenv.config();

// Crea il client Discord con gli intent necessari
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Quando il bot è pronto
client.on('ready', () => {
  console.log(`✅ Bot online! Logged in as ${client.user.tag}`);
});

// Quando riceve un messaggio
client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignora altri bot
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

// Login del bot usando il token da variabile d'ambiente
client.login(process.env.BOT_TOKEN);

