const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  category: "Music",
  description: "Show now playing song",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  run: async (message, args, client, prefix) => {

    const player = message.client.manager.get(message.guild.id);
    const song = player.queue.current
    if (!player.queue.current) {
      let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("There is no music playing.");
      return message.channel.send(thing);
    }

    const emojimusic = client.emoji.music;
    var total = song.duration;
    var current = player.position;
    var name = song.identifier;

    let embed = new MessageEmbed()
      .setAuthor("Now Playing:", message.author.displayAvatarURL())
      .setDescription(`${emojimusic} [\`${song.title}\`](${song.uri})`)
      .addField(`${client.emoji.duration} Duration:`, `\`${!player.queue.current.isStream ? `${new Date(player.queue.current.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\``, true)
      .addField(`${client.emoji.stage} Song by:`, `${player.queue.current.author}`, true)
      .addField(`🔁 Queue length: `, `\`${player.queue.length} Songs\``, true)
      .addField('Autoplay',`${player.get(`autoplay`) ? `${client.emoji.yes} Enabled` : `${client.emoji.no} Disabled` }`)         
      .addField('Loop',`${player.queueRepeat ? `${client.emoji.yes} Enabled` : player.trackRepeat ? `${client.emoji.yes} Enabled` : `${client.emoji.no} Disabled`}`)         
      .addField(`Requested by`, `[ ${song.requester} ]`, true)
      .setThumbnail(`https://img.youtube.com/vi/${name}/mqdefault.jpg`)
      .setColor(client.embedColor)
      .addField(`**Progress Bar**`, `${progressbar(player)}`)
    return message.channel.send({ embeds: [embed] })

  }
}