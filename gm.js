const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { Client } = require('discord.js-selfbot-v13');
const moment = require('moment');

// Load config from JSON
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
console.log('Config Loaded:', config);

// Mode check (auto or manual)
const mode = config.mode;
console.log('Mode:', mode);

// Function to get server and channel info
const getChannelInfo = async (client, channelId) => {
  try {
    const channel = await client.channels.fetch(channelId);
    const serverName = channel.guild.name;  // Nama server
    const channelName = channel.name;  // Nama channel
    return `${serverName} - #${channelName}`;
  } catch (error) {
    console.error(`⚠️ Error fetching channel info for ID: ${channelId}`);
    return `Unknown Server - #UnknownChannel`;
  }
};

// Function to send GM to channels
const sendGM = async (client, channelId, message) => {
  try {
    const channelInfo = await getChannelInfo(client, channelId);
    const channel = await client.channels.fetch(channelId);  // Always fetch channel
    if (channel) {
      await channel.send(message);
      console.log(`[${moment().format('HH:mm:ss')}] 📩 GM sent from 🧑‍💻 ${client.user.username} 🧑‍💻 to channel 📤➜  ${channelInfo} : ${message}`);
    } else {
      console.log(`⚠️  Channel tidak ditemukan: ${channelId}`);
    }
  } catch (error) {
    console.error(`❌ Error sending GM to channel ID: ${channelId} - ${error.message}`);
  }
};

// Function to handle the sending of GM in any mode
const handleGM = (tokens) => {
  console.log(`Tokens Loaded: ${Object.keys(tokens).length} tokens`);
  
  const clients = [];  // Store all the clients for active management
  
  Object.keys(tokens).forEach(accountName => {
    const token = tokens[accountName].trim();
    if (token) {
      const client = new Client();
      clients.push(client);  // Store the client for cleanup after usage

      client.on('ready', () => {
        console.log(`✅ Client ${client.user.tag} is ready`);
        config.accounts.forEach(account => {
          account.servers.forEach(server => {
            server.channels.forEach(channel => {
              console.log(`✅ Login sebagai: ${accountName}`);
              sendGM(client, channel.id, channel.message);
            });
          });
        });
      });

      client.login(token).catch(err => {
        console.log(`❌ Gagal login: ${accountName} - Token invalid`);
      });
    } else {
      console.log(`⚠️ Token kosong untuk akun: ${accountName}`);
    }
  });

  console.log('🚀 Semua GM berhasil dikirim! 💯');
};

// Function to handle errors or missing token.json
const loadTokens = () => {
  try {
    const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, 'token.json'), 'utf8'));
    return tokens;
  } catch (error) {
    console.error("❌ Gagal memuat file 'token.json'. Pastikan file tersebut ada dan format JSON benar.");
    process.exit(1);  // Exit program if the tokens can't be loaded
  }
};

// Run GM auto every day at 7 AM Jakarta time
if (mode === 'auto') {
  console.log('Running in AUTO mode...');
  cron.schedule(config.schedule, () => {
    console.log('🔁 Mode: AUTO - Menjalankan GM otomatis...');
    const tokens = loadTokens();  // Load tokens
    handleGM(tokens);  // Send GM
  });
}

// If mode is manual, you can trigger GM by running the script manually
if (mode === 'manual') {
  console.log('Running in MANUAL mode...');
  console.log('🔁 Mode: MANUAL - Menjalankan GM sekarang...');
  const tokens = loadTokens();  // Load tokens
  handleGM(tokens);  // Send GM
}
