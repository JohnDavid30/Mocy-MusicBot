const { MessageEmbed, Permissions } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: "play",
  category: "Music",
  aliases: ["p"],
  description: "Plays audio from YouTube or Soundcloud",
  args: true,
  usage: "<YouTube URL | Video Name | Spotify URL>",
  permission: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  run: async (message, args, client, prefix) => {

    if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`)] });

    const { channel } = message.member.voice;

    if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`)] });

    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist

    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
      volume: 100,
    });

    if (player.state != "CONNECTED") await player.connect();
    const search = args.join(' ');
    let res;

    try {
      res = await player.search(search, message.author);
      if (!player)
        return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Nothing is playing right now...")] });
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy();
        throw res.exception;
      }
    } catch (err) {
      return message.reply(`there was an error while searching: ${err.message}`);
    }
    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy();
        return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`No matches found for - ${search}`)] });
      case 'TRACK_LOADED':
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new MessageEmbed()
            .setColor(client.embedColor)
.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
  .setAuthor("Added Track")
  .addField(`Track`, `${client.emoji.addsong} [\`${track.title}\`](${track.uri})`)
  .addField(`Estimated time until played`, `${!track.isStream ? `${new Date(track.duration).toISOString().slice(11, 19)}` : '`â—‰ LIVE`'}`)
  .addField(`Track Length`, `${track.isStream ? `LIVE STREAM` : convertTime(track.duration)}`)
  .addField("\u200b", `\u200b`, true)
  .addField(`Position in upcoming`, `Next`)
  .addField(`Position in queue`, `${player.queue.length}`)
  .addField("\u200b", `\u200b`, true);
          return message.channel.send({ embeds: [thing] });
        }
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks);
        if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
        const thing = new MessageEmbed()
          .setColor(client.embedColor)
.setThumbnail(`https://img.youtube.com/vi/${res.tracks.identifier}/mqdefault.jpg`)
  .setAuthor("Added Playlist")
  .addField(`Playlist`, `${client.emoji.addsong} [\`${res.playlist.name}\`](${search})`)
  .addField(`Playlist Length`, `${convertTime(res.playlist.duration)}`)
  .addField(`Tracks`, `${res.tracks.length}`)
  .addField("\u200b", `\u200b`, true)
        return message.channel.send({ embeds: [thing] });
      case 'SEARCH_RESULT':
        var track = res.tracks[0];
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          return player.play();
        } else {
          const thing = new MessageEmbed()
            .setColor(client.embedColor)
.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
  .setAuthor("Added Track")
  .addField(`Track`, `${client.emoji.addsong} [\`${track.title}\`](${track.uri})`)
  .addField(`Estimated time until played`, `${!track.isStream ? `${new Date(track.duration).toISOString().slice(11, 19)}` : '`â—‰ LIVE`'}`)
  .addField(`Track Length`, `${track.isStream ? `LIVE STREAM` : convertTime(track.duration)}`)
  .addField("\u200b", `\u200b`, true)
  .addField(`Position in upcoming`, `Next`)
  .addField(`Position in queue`, `${player.queue.length}`)
  .addField("\u200b", `\u200b`, true);
          return message.channel.send({ embeds: [thing] });
        }
    }
  }
}
