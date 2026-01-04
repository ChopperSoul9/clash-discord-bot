import { Client, GatewayIntentBits } from 'discord.js';

// Legge direttamente il token dalle variabili d'ambiente
const token = process.env.TOKEN;

if (!token) {
  console.error("⚠️ Errore: la variabile TOKEN non è impostata!");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
});

client.login(token);
