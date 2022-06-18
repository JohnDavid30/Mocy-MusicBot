const { MessageEmbed, Client, ButtonInteraction, MessageButton, MessageActionRow } = require("discord.js");
const { convertTime } = require("../../utils/convert");
const { buttonReply } = require("../../utils/functions")

module.exports = {
    name: "playerButtons",

    /**
     * 
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     * @param {*} data 
     */

    run: async (client, interaction, data) => {
        
        if (!interaction.replied) await interaction.deferReply().catch(() => { });
        const color = client.embedColor;
        if (!interaction.member.voice.channel) return await buttonReply(interaction, `You are not connected to a voice channel to use this button.`, color);
        if (interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return await buttonReply(interaction, `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, color);
        const player = interaction.client.manager.get(interaction.guildId);
        
        if (player && interaction.customId === `stop_but_${interaction.guildId}`) {
            player.destroy();
            return await buttonReply(interaction, `Music has been stop.`);
        };
        if(!player) return await buttonReply(interaction, `Nothing is playing right now.`, color);
        if(!player.queue) return await buttonReply(interaction, `Nothing is playing right now.`, color);
        if(!player.queue.current) return await buttonReply(interaction, `Nothing is playing right now.`, color);
        if(player && player.state !== "CONNECTED") {
            player.destroy();
            return await buttonReply(interaction, `Nothing is playing right now.`, color);
        };
        const { title, uri, duration, requester, author, identifier } = player.queue.current;

        let message;
        try {

            message = await interaction.channel.messages.fetch(data.Message, { cache: true });

        } catch (e) { };

        let icon = client.config.links.bg;

let play = new MessageEmbed().setAuthor(`${title}`, "https://eartensifier.net/images/cd.gif").setDescription(`[${title}](${uri})\n**<:users:983362114607513630> ❯ Requested by:** \`${requester.tag}\`\n**<:stage:983362075449495582> ❯ Song By:** \`${author}\`\n**<a:time:982939142801465384> ❯ Duration:** \`${convertTime(duration)}\``).setThumbnail(`https://img.youtube.com/vi/${identifier}/mqdefault.jpg`).setColor(client.embedColor)
        let nowplaying = new MessageEmbed().setColor(color).setDescription(`[${title}](${uri}) • \`[${convertTime(duration)}]\``).setImage(icon).setFooter({ text: `Requested by ${requester.username}`, iconURL: requester.displayAvatarURL({ dynamic: true }) });

        if (interaction.customId === `pause_but_${interaction.guildId}`) {
            if (player.paused) {
                player.pause(false);

                await buttonReply(interaction, `[${title}](${uri}) is now unpaused/resumed.`, color);

                if (message) await message.edit({
                    embeds: [play]
                }).catch(() => { });
            } else {
                player.pause(true);

                await buttonReply(interaction, `[${title}](${uri}) is now paused.`,color); 

                if (message) await message.edit({
                    embeds: [play]
                }).catch(() => { });
            };
        } else if (interaction.customId === `previous_but_${interaction.guildId}`) {
            if (!player) return await buttonReply(interaction, `Process cancled due to player not found.`, color);
            if (!player.queue.previous) return await buttonReply(interaction, `No previously played song found.`, color);

            player.queue.add(player.queue.previous);
            if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();

            if (player.queue.size === 1) {
                player.stop();
            } else {
                player.queue.add(player.queue.previous, 0);

                if (player.queue.current.title !== player.queue.previous.title || player.queue.current.uri !== player.queue.previous.uri) player.stop();
            };

            return await buttonReply(interaction, `Now playing [${player.queue.previous.title}](${player.queue.previous.uri})`, color);
        } else if (interaction.customId === `stop_but_${interaction.guildId}`) {
            player.destroy();
            return await buttonReply(interaction, `Player has been stopped/destroyed.`, color);
        } else if (interaction.customId === `loopmodesbut_but_${interaction.guildId}`) {
            if (!player.queue.size) {
                if (player.trackRepeat) {
                    player.setTrackRepeat(false);
                    await buttonReply(interaction, `Player track looping/repeating is now disabled.`, color);
                    if (message) await message.edit({
                        embeds: [play]
                    }).catch(() => { });
                } else {
                    player.setTrackRepeat(true)
                    await buttonReply(interaction, `Player track looping/repeating is now enabled.`, color);
                    if (message) await message.edit({
                        embeds: [play]
                    }).catch(() => { });
                };
            } else {
                const choices = ["track", "queue", "shuffle"];
                let random = choices[Math.floor(Math.random() * choices.length)];

                if (random === choices[0]) {
                    if (player.trackRepeat) {
                        player.setTrackRepeat(false);
                        await buttonReply(interaction, `Player track looping/repeating is now disabled.`, color);
                        if (message) await message.edit({
                            embeds: [play]
                        }).catch(() => { });
                    };
                } else if (random === choices[1]) {
                    if (player.trackRepeat) {
                        player.setQueueRepeat(false);
                        await buttonReply(interaction, `Player queue looping/repeating is now disabled.`, color);
                        if (message) await message.edit({
                            embeds: [play]
                        }).catch(() => { });
                    } else {
                        player.setQueueRepeat(true)
                        await buttonReply(interaction, `Player queue looping/repeating is now enabled.`, color);
                        if (message) await message.edit({
                            embeds: [play]
                        }).catch(() => { });
                    };
                } else if (random === choices[2]) {
                    player.queue.shuffle();
                    await buttonReply(interaction, `Player queue is now shuffled.`, color);
                    if (message) await message.edit({
                        embeds: [play]
                    }).catch(() => { });
                };
            };
        } else if (interaction.customId === `forward_but_${interaction.guildId}`) {
            let forwardposition = Number(player.position) + 10000;
            if (forwardposition >= duration) return await buttonReply(interaction, `Cannot forward any further more.`, color);

            if (player.paused) return await buttonReply(interaction, `Cannot forward because the player is currently paused.`, color);

            if (!player.queue.current.isSeekable) return await buttonReply(interaction, `Unable to forward this track.`, color);

            player.seek(forwardposition);
            await buttonReply(interaction, `Forwarded \`[ 10s ]\` to \`[ ${convertTime(Number(player.position))} / ${convertTime(Number(duration))} ]\``, color);
            if (message) await message.edit({
                embeds: [nowplaying]
            }).catch(() => { });

        } else if (interaction.customId === `skipbut_but_${interaction.guildId}`) {
            if (!player.queue.size) return await buttonReply(interaction, `No more songs left in the queue to skip.`, color);

            player.stop();
            return await buttonReply(interaction, `Skipped [${title}](${uri})`, color);
        } else if (interaction.customId === `save_but_${interaction.guildId}`) {
            const song = player.queue.current
            const total = song.duration;
            const current = player.position;
            const user = client.users.cache.get(interaction.member.user.id);
            const urlbutt = new MessageButton().setLabel("Search").setStyle("LINK").setURL(song.uri)
            const row2 = new MessageActionRow().addComponents(urlbutt)
            await buttonReply(interaction,`:mailbox_with_mail: \`Check Your Dms!\``, color )
            let embed = new MessageEmbed()
                .setDescription(`**Song Details** \n\n > **__Song Name__**: [${song.title}](${song.uri}) \n > **__Song Duration__**: \`[${convertTime(song.duration)}]\` \n > **__Song Played By__**: [<@${song.requester.id}>] \n > **__Song Saved By__**: [<@${interaction.user.id}>]`)
                .setThumbnail(song.displayThumbnail())
                .setColor(color)
                .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
            return await user.send({ embeds: [embed], components: [row2] })
        } else if (interaction.customId === `rewindbut_but_${interaction.guildId}`) {
            let rewindposition = Number(player.position) - 10000;
            if (rewindposition < 0) return await buttonReply(interaction, `Cannot rewind any further more.`, color);

            if (player.paused) return await buttonReply(interaction, `Cannot forward because the player is currently paused.`, color);

            if (!player.queue.current.isSeekable) return await buttonReply(interaction, `Unable to rewind this track.`, color);

            player.seek(rewindposition);
            await buttonReply(interaction, `Rewinded \`[ 10s ]\` to \`[ ${convertTime(Number(player.position))} / ${convertTime(Number(duration))} ]\``, color);

            if (message) await message.edit({
                embeds: [play]
            }).catch(() => { });

        } else if (interaction.customId === `highvolume_but_${interaction.guildId}`) {
            let amount = Number(player.volume) + 10;
            if (amount >= 200) return await buttonReply(interaction, `Cannot higher the player volume further more.`, color);

            player.setVolume(amount);
            await buttonReply(interaction, ` volume set to \`[ ${player.volume}% ]\``, color);

            if (message) await message.edit({
                embeds: [play]
            }).catch(() => { });
        } else if (interaction.customId === `lowvolume_but_${interaction.guildId}`) {
            let amount = Number(player.volume) - 10;
            if (amount < 01) return await buttonReply(interaction, `Cannot higher the player volume further more.`, color);

            player.setVolume(amount);
            await buttonReply(interaction, ` volume set to \`[ ${player.volume}% ]\``, color);

            if (message) await message.edit({
                embeds: [play]
            }).catch(() => { });
        } else {
            if (message) await message.edit({
                embeds: [play]
            }).catch(() => { });

            return await buttonReply(interaction, `You've choosen an invalid button!`, color);
        };
    }
}

