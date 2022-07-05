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

                const embed = new Discord.MessageEmbed()const Discord  = require("discord.js");

module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {
      if (interaction.isButton()) {
            if (interaction.guild.me.voice.channel && !interaction.guild.me.voice.channel.equals(interaction.member.voice.channel)) return await interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true});

                
        
            const player = client.manager.get(interaction.guild.id);
            if (!player) return;
        let channel = client.channels.cache.get(player.textChannel);
  if (!channel) return;
            switch (interaction.customId) {
                case 'PREVIOUS_BUTTON': {
                    if (player.queue.previous) {
                        player.queue.add(player.queue.previous, 0);

                        const embed = new Discord.MessageEmbed()
                            .setColor(client.embedColor)
                            .setAuthor(`Backing up to ${player.queue.current.title}`, interaction.member.displayAvatarURL());
                        await channel.send({ embeds: [embed], ephemeral: true }).then(responce => {

            setTimeout(() => {

                try {

                    responce.delete().catch(() => {

                        return

                    })

                } catch(err) {

                    return

                }

            }, 2000)
                            });
                    }
                    break;
                }
                case 'PAUSE_BUTTON': {
                    const buttonRow = interaction.message.components[0];
                    player.pause(!player.paused);
                    buttonRow.components[1] = new Discord.MessageButton()
                        .setCustomId('PAUSE_BUTTON')
                        .setStyle('PRIMARY')
                        .setEmoji(player.paused ? "<:kresume:924597935851831306>" : "<:kpause:924598020417392661>");

                    const embed = new Discord.MessageEmbed()
                        .setColor(client.embedColor)
                        .setAuthor(`Song is now ${player.playing ? 'resumed' : 'paused'}.`, interaction.member.displayAvatarURL());
                    await channel.send({ embeds: [embed], ephemeral: true }).then(responce => {

            setTimeout(() => {

                try {

                    responce.delete().catch(() => {

                        return

                    })

                } catch(err) {

                    return

                }

            }, 2000)

                            });
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
                    await channel.send({ embeds: [embed], ephemeral: true }).then(responce => {

            setTimeout(() => {

                try {

                    responce.delete().catch(() => {

                        return

                    })

                } catch(err) {

                    return

                }

            }, 2000)

                            });
                    break;
                }
                case 'LOOP_BUTTON': {
                    player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? "enabled" : "disabled";

                const embed = new Discord.MessageEmbed()
                        .setColor(client.embedColor)
                        .setAuthor(`Loop ${trackRepeat}`, interaction.member.displayAvatarURL());
                    await channel.send({ embeds: [embed] }).then(responce => {

            setTimeout(() => {

                try {

                    responce.delete().catch(() => {

                        return

                    })

                } catch(err) {

                    return

                }

            }, 2000)

                            });
                    break;
                }

                case 'SHUFFLE_BUTTON': {



                const embed = new Discord.MessageEmbed()

                        .setColor(client.embedColor)

                        .setAuthor(`Your Queue Has been shuffled`, interaction.member.displayAvatarURL());

                    await channel.send({ embeds: [embed] }).then(responce => {

            setTimeout(() => {

                try {

                    responce.delete().catch(() => {

                        return

                    })

                } catch(err) {

                    return

                }

            }, 2000)

                            });

                    break;

                }
            }
            }
    }
};
                        .setColor(client.embedColor)
                        .setAuthor(`Skipped ${title}`, interaction.member.displayAvatarURL());
                    await client.channels.cache.get(player.textChannel).send({ embeds: [embed] });
                    break;
                }
            }
            }
    }
};
