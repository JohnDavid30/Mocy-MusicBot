const { MessageEmbed, version, MessageActionRow, MessageButton, } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const si = require("systeminformation");
const Bot = require('../../schema/Bot');
module.exports = {
    name: 'commandstats',
    category: "Developer",
    description: 'Shows the most used commands.',
    aliases: ['commandsused'],
    args: false,
    usage: "commandstats",
    permission: [],
    owner: true,
    run: async (message, args, client, prefix) => {
Bot.findById(client.user.id, async (err, bot) => {
        if (err) client.logger.error(err);
    
        const commands = client.commands.sort((a, b) => b.timesUsed - a.timesUsed);
        const commandsString = [];

        for (let i = 0; i < commands.length; i++) {
          try {
            commandsString.push(`**${i + 1}.** ${commands[i]._id} (${commands[i].timesUsed.toLocaleString()} uses)`);
          }
          catch (e) {
            client.logger.error(e);
            return message.reply('An error occured.');
          }
        }

        const commandsPerPage = 20;
        const embeds = [];
        for (let i = 0; i < Math.ceil(commands.length / commandsPerPage); i++) {
          embeds.push({
            title: `Top ${i * commandsPerPage + commandsPerPage} most used commands`,
            description: commandsString.slice(i * commandsPerPage, i * commandsPerPage + commandsPerPage).join('\n'),
            color: client.embedColor,
          });
        }

        await message.reply({embeds})

  });
 }
};
