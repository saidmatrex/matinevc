require('dotenv').config();
const Discord = require('discord.js-selfbot');
const fta = require('node-fetch');
const channel = "1216546408539226144";

const discord = require("discord.js-selfbot");
const client = new discord.Client({
  disableEveryone: true,
});

client.on("ready", () => {
  console.log(`Logged as: ${client.user.tag}`);
  joinVC();
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (newState.member.id === client.user.id && !newState.channelID) {
    joinVC();
  }
});

function joinVC() {
  const voiceChannel = client.channels.cache.get(channel);
  if (!voiceChannel) {
    console.log(`Error: Voice channel with ID ${channel} not found`);
    return;
  }
  voiceChannel.join().then(() => {
    console.log(`Joined voice channel ${voiceChannel.name}`);
  }).catch(error => {
    console.log(`Error joining voice channel: ${error}`);
  });
}

client.login(process.env.TOKEN);

const keepAlive = require('./server.js');
keepAlive();
