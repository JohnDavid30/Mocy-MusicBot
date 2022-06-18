const delay = require("delay");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ms = require('ms');

module.exports = async (client, player) => {
  const channel = client.channels.cache.get(player.textChannel);
	const emojiwarn = client.emoji.warn;
  const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle(`Queue Concluded`)
        .setDescription(`Enjoying music with me? Consider Inviting me on your server.`);
  channel.send({embeds: [embed] });
    
}