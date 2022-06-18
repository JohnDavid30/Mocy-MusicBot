const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js');
const db = require("../../schema/setup");
module.exports = async (client, player, track, payload) => {
 if (player.nowPlayingMessage) player.nowPlayingMessage = null;
        // if (player.nowPlayingMessageInterval) clearInterval(player.nowPlayingMessageInterval);
     
  const emojiplay = client.emoji.play;
  const volumeEmoji = client.emoji.volumehigh;
  const emojistop = client.emoji.stop;
  const emojipause = client.emoji.pause;
  const emojiresume = client.emoji.resume;
  const emojiskip = client.emoji.skip;
      let guild = client.guilds.cache.get(player.guild);

  if (!guild) return;
let data = await db.findOne({ Guild: guild.id });
  
  const buttonRow = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId(`lowvolume_but_${guild.Id}`).setEmoji("🔉").setStyle("SECONDARY"),
                new MessageButton()
                    .setCustomId(`previous_but_${guild.Id}`)
                .setEmoji("⏮️")
                .setStyle("SECONDARY"),
                new MessageButton()
                    .setCustomId('PAUSE_BUTTON')
                    .setStyle('PRIMARY')
                    .setEmoji(client.emoji.pause),
                new MessageButton()
                    .setCustomId(`skipbut_but_${guild.Id}`)
 .setEmoji("⏭️")
                .setStyle("SECONDARY"),
            new MessageButton().setCustomId(`highvolume_but_${guild.Id}`).setEmoji("🔊").setStyle("SECONDARY"));

  const thing = new MessageEmbed()
    .setAuthor(`${track.title}`, "https://eartensifier.net/images/cd.gif")
    .setDescription(`[${track.title}](${track.uri})\n**<:users:983362114607513630> ❯ Requested by:** \`${track.requester.tag}\`\n**<:stage:983362075449495582> ❯ Song By:** \`${track.author}\`\n**<a:time:982939142801465384> ❯ Duration:** \`${!track.isStream ? `${new Date(track.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\``)

  
  .setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
    .setColor(client.embedColor)
    

  player.nowPlayingMessage = await client.channels.cache.get(player.textChannel).send({ embeds: [thing], components: [] });
 

};