import 'dotenv/config'; // se usi dotenv

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CR_TOKEN = process.env.CR_TOKEN;
const PLAYER_TAG = process.env.PLAYER_TAG;
const USER_ID = process.env.USER_ID;


const CHECK_INTERVAL = 60_000; // ogni 60 secondi

// -------------------- INIZIALIZZAZIONE BOT --------------------
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds] });

let lastBattleId = null; // per non inviare DM doppi

// -------------------- FUNZIONE CONTROLLO BATTAGLIA --------------------
async function checkBattle() {
  try {
    const res = await fetch(`https://api.clashroyale.com/v1/players/${PLAYER_TAG}/battlelog`, {
      headers: { Authorization: `Bearer ${CR_TOKEN}` }
    });

    if (!res.ok) throw new Error(`Errore API: ${res.status}`);

    const data = await res.json();
    const latestBattle = data[0]; // prima battaglia nella lista

    if (!latestBattle) return; // nessuna battaglia

    // Controlla se è nuova
    if (latestBattle.battleTime !== lastBattleId) {
      lastBattleId = latestBattle.battleTime;

      const user = await client.users.fetch(USER_ID);
      await user.send(`⚔️ Il giocatore ha appena iniziato una battaglia!`);
      console.log("DM inviato ✅");
    }
  } catch (err) {
    console.error("Errore nel check battaglia:", err);
  }
}

// -------------------- EVENTO BOT --------------------
client.once("clientReady", async () => {
  console.log("Bot online ✅");

  // test DM iniziale
  try {
    const user = await client.users.fetch(USER_ID);
    await user.send("💌 Bot attivo e pronto a monitorare le battaglie!");
    console.log("Messaggio di test inviato ✅");
  } catch (err) {
    console.error("Errore invio DM test:", err);
  }

  // avvia controllo battaglie ogni intervallo
  setInterval(checkBattle, CHECK_INTERVAL);
});

client.login(DISCORD_TOKEN);
