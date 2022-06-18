const Discord  = require("discord.js");

module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {
      if (interaction.isButton()) {
            if (interaction.guild.me.voice.channel && !interaction.guild.me.voice.channel.equals(interaction.member.voice.channel)) return;
        
            const player = client.manager.get(interaction.guild.id);
            if (!player) return;
        let channel = client.channels.cache.get(player.textChannel);
  if (!channel) return;
            switch (interaction.customId) {
                case 'PREVIOUS_BUTTON': {
                    if (player.queue.previous) {
                        player.seek(0);

                        const embed = new Discord.MessageEmbed()
                            .setColor(client.embedColor)
                            .setAuthor(`Backing up to ${player.queue.current.title}`, interaction.member.displayAvatarURL());
                        await channel.send({ embeds: [embed] });
                    }
                    break;
                }
                case 'PAUSE_BUTTON': {
                    const buttonRow = interaction.message.components[0];
                    player.pause(!player.paused);
                    buttonRow.components[1] = new Discord.MessageButton()
                        .setCustomId('PAUSE_BUTTON')
                        .setStyle('PRIMARY')
                        .setEmoji(player.paused ? client.emoji.resume : client.emoji.pause);

                    const embed = new Discord.MessageEmbed()
                        .setColor(client.embedColor)
                        .setAuthor(`Song is now ${player.playing ? 'resumed' : 'paused'}.`, interaction.member.displayAvatarURL());
                    await client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
                    await interaction.update({ components: [buttonRow] });
                    break;
                }
                case 'SKIP_BUTTON': {
                    const title = player.queue.current.title;
                    if (player.trackRepeat) player.setTrackRepeat(false);
                    if (player) player.stop();

                const embed = new Discord.MessageEmbed()
                        .setColor(client.embedColor)
                        .setAuthor(`Skipped ${title}`, interaction.member.displayAvatarURL());
                    await client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
                    break;
                }
            }
            }
    }
};