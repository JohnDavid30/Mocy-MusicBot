const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js');
const db = require("../../schema/setup");
module.exports = async (client, player, track, payload) => {
 //if (player.nowPlayingMessage) player.nowPlayingMessage = null;
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
                new MessageButton()
                    .setCustomId('PREVIOUS_BUTTON')
                    .setStyle('SECONDARY')
                    .setEmoji("924597731710894100"),
                new MessageButton()
                    .setCustomId('PAUSE_BUTTON')
                    .setStyle('PRIMARY')
                    .setEmoji("924598020417392661"),
                new MessageButton()
                    .setCustomId('SKIP_BUTTON')
                    .setStyle('SECONDARY')
                    .setEmoji("924597839806488588"),
                new MessageButton()
                    .setCustomId('LOOP_BUTTON')
                    .setStyle('SECONDARY')
                    .setEmoji("924611891098165258"),

                new MessageButton()

                    .setCustomId('SHUFFLE_BUTTON')

                    .setStyle('SECONDARY')

                    .setEmoji("924611801537196032"));

  const thing = new MessageEmbed()
    .setAuthor(`Now Playing`, "https://eartensifier.net/images/cd.gif")
    .setDescription(`[${track.title}](${track.uri})\n\nDuration: \`[${!track.isStream ? `${new Date(track.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}]\` By: [\`${track.requester.tag}\`] `)
 
  
  
    .setColor(client.embedColor)
    
     
  const message = await client.channels.cache.get(player.textChannel).send({ embeds: [thing], components: [buttonRow] });
 
player.nowPlayingMessage = message;


};
