const { MessageEmbed } = require('discord.js');


module.exports = {
  name: 'shard',
  category: 'Information',
  description: 'Displays the bot\'s shards.',
  aliases: ['shardstats', 'shardinfo'],
  args: false,
  usage: "shard",
  permission: [],
  owner: false,
run: async (message, args, client, prefix) => {
    const embeds = [];
    const promises = [
            client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.broadcastEval(c => c.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)),
        ];

    const shardInfo = await client.shard.broadcastEval(c => ({
      id: c.shard.ids,
      shards: c.shard.shards,
      status: c.shard.client.presence.status,
      guilds: c.guilds.cache.size,
      channels: c.channels.cache.size,
      members: c.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0),
      memoryUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
      ping: c.ws.ping,
    }));


    let totalPlayers = 0;

    let totalPlayingPlayers = 0;

    for (let n = 0; n < shardInfo.length / 15; n++) {

      const shardArray = shardInfo.slice(n * 15, n * 15 + 15);

      const embed = new MessageEmbed()

        .setColor(client.embedColor)

        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL());

      shardArray.forEach(i => {

        const status = i.status === 'online' ? "<:mdgreen:968816325646491718>" : "<:mdred:968816394395336734>";

        embed.addField(`${status} Shard ${(parseInt(i.id)).toString()}`, `\`\`\`js\nServers: ${i.guilds.toLocaleString()}\nChannels: ${i.channels.toLocaleString()}\nUsers: ${i.members.toLocaleString()}\nMemory: ${Number(i.memoryUsage).toLocaleString()} MB\nAPI: ${i.ping.toLocaleString()}\n\`\`\``, true);
      });

      Promise.all(promises)

        .then(async results => {

          let totalMemory = 0;

          shardArray.forEach(s => totalMemory += parseInt(s.memoryUsage));

          let totalChannels = 0;

          shardArray.forEach(s => totalChannels += parseInt(s.channels));

          let avgLatency = 0;

          shardArray.forEach(s => avgLatency += s.ping);

          avgLatency = avgLatency / shardArray.length;

          avgLatency = Math.round(avgLatency);

          const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);

          const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);

          embed.setDescription(`This guild is currently on **Shard ${client.shard.ids}**.`);

          embed.addField("<:mdgreen:968816325646491718>" + ' Total Stats', `\`\`\`js

Total Servers: ${totalGuilds.toLocaleString()}\nTotal Channels: ${totalChannels.toLocaleString()}\nTotal Users: ${totalMembers.toLocaleString()}\nTotal Memory: ${totalMemory.toFixed(2)} MB\nAvg API Latency: ${avgLatency} ms\n\`\`\``);

          embed.setTimestamp();

          embeds.push(embed);

          if (embeds.length == Math.ceil(shardInfo.length / 15)) {

            await message.reply({ embeds });

          }

        });
    }
  }
};
