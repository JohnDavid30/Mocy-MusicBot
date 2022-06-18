const { MessageEmbed, version, MessageActionRow, MessageButton, } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const si = require("systeminformation");

module.exports = {
    name: "vps",
    category: "Developer",
    description: 'Displays the VPS\' info.',
    aliases: ['vpsinfo', 'vpsstats'],
    args: false,
    usage: "stats",
    permission: [],
    owner: true,
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
const totalSeconds = os.uptime();
const realTotalSecs = Math.floor(totalSeconds % 60);
const days = Math.floor((totalSeconds % (31536 * 100)) / 86400);
const hours = Math.floor((totalSeconds / 3600) % 24);
const mins = Math.floor((totalSeconds / 60) % 60);

const statsEmbed = new MessageEmbed()
  .setAuthor('VPS')
  .setColor(client.embedColor)
  .addField('Host', `${os.type()} ${os.release()} (${os.arch()})`)
  .addField('CPU', `${os.cpus()[0].model}`)
  .addField('Uptime', `${days} days, ${hours} hours, ${mins} minutes, and ${realTotalSecs} seconds`)
  .addField('RAM', `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`)
  .addField('Memory Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
  .addField('CPU Load', `${(os.loadavg()[0]).toFixed(2)}%`)
  .addField('CPU Cores', `${os.cpus().length}`)
  .setFooter(`Node Version: ${process.version}`)
  .setTimestamp();
        message.reply({ embeds: [statsEmbed], components: [row] });

    },
};