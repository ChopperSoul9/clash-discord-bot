// index.mjs
import 'dotenv/config';  // legge il token da .env
import { Client, GatewayIntentBits } from 'discord.js';

// Crea il client con i soli intenti necessari
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,         // necessario per comandi slash, eventi dei server
    GatewayIntentBits.GuildMessages,  // necessario se vuoi leggere i messaggi
    GatewayIntentBits.MessageContent  // necessario se vuoi leggere il contenuto dei messaggi
  ]
});

// Quando il bot è pronto
client.once('ready', () => {
  console.log(`Bot online come ${client.user.tag}`);
});

// Esempio: rispondere ai messaggi "ping"
client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === 'ping') {
    message.reply('Pong!');
  }
});

// Login con il token dal file .env
client.login(process.env.TOKEN);
