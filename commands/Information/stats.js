const { MessageEmbed, version, MessageActionRow, MessageButton, } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const si = require("systeminformation");

module.exports = {
    name: "stats",
    category: "Information",
    aliases: ["status"],
    description: "Show status bot",
    args: false,
    usage: "stats",
    permission: [],
    owner: false,
    run: async (message, args, client, prefix) => {
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel("Invite")
                .setStyle("LINK")
                .setURL(
                    client.config.links.invite
                ),

            new MessageButton()
                .setLabel("Support Server")
                .setStyle("LINK")
                .setURL(client.config.links.support),

            new MessageButton()
                .setLabel("Website")
                .setStyle("LINK")
                .setURL(client.config.links.web)
        );
        let totalSeconds = message.client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let x = new Date()
        let y = x.getTime() - Math?.floor(client.uptime);
        let uptime = `${days}d ${hours}h ${minutes}m ${seconds}s `;
        const cpu = await si.cpu();

        let connectedchannelsamount = 0;
        let guilds = client.guilds.cache.map((guild) => guild);
        for (let i = 0; i < guilds.length; i++) {
            if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
        }
        if (connectedchannelsamount > client.guilds.cache.size)
            connectedchannelsamount = client.guilds.cache.size;
        var color = client.embedColor

        const statsEmbed = new MessageEmbed()
            .setColor(color)
            .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL() })
.setTitle("STATS:")
            .addFields (
                { name: `<:servers:985095148075614268> • **Servers**`, value: `\`\`\`Total: ${client.guilds.cache.size} servers\`\`\``
                  
                },
                { name: `<:users:983362114607513630> • **Users**`, value: `\`\`\`Total: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} users\`\`\``
                },
                { name: `<:shards:985095257890914355> • Shards`, value: `\`\`\`${client.shard.ids}/${client.shard.count}\`\`\``

                  

                },
                { name: `<:nodes:985095420143362058> • **Node Version**`, value: `\`\`\`${process.version}\`\`\``
                },
                { name: `<:djsv13:985095543036469268> • **Discord.js**`, value: `\`\`\`v${version}\`\`\``
                },
                { name: `<a:uptime:985097015048421396> • **Uptime**`, value: `\`\`\`${uptime}\`\`\``
                },
                { name: `<a:ping:985097073705771010> • **Ping**`, value: `\`\`\`${client.ws.ping}ms\`\`\``
                },
                {
                    name: `<:rambot:985095626419212308> • **Ram**`,
                    value: `\`\`\`${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB\`\`\``
                  
                },
                { name: `<:stage:983362075449495582> • **Music**`, value: `\`\`\`Playing Music In ${connectedchannelsamount} Servers\`\`\`\n\n\n[Invite](${client.config.links.invite}) ● [Support](${client.config.links.support}) ● [Website](${client.config.links.web})`
                }
            )
            .setFooter(`Thanks For Choosing ${client.user.username}`, client.user.displayAvatarURL())
        message.reply({ embeds: [statsEmbed], components: [row] });

    },
};
