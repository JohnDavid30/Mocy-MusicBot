const { MessageEmbed, Message } = require("discord.js");
const schema = require("../../schema/premium")
const day = require("dayjs")

module.exports = {
        name: `removepremium`,
        category: `Developer`,
        aliases: [`rp`],
        description: `Remove Premium from guild`,
        usage: `removepremium`,
        owner: true,
        run: async (message, args, client, prefix) => {
                  if (!args[0]) return message.reply("Please Provide A Guild Id...")
        if (!client.guilds.cache.has(args[0])) return message.reply("Please Provide A Valid Guild ID")

        schema.findOne({
            Guild: args[0]
        }, async (err, data) => {
            if (!data) return message.reply(`\`\`\`\nNo Data Found\n\`\`\``);
            
            data.delete();
            const thing = new MessageEmbed()
            .setDescription(`${client.emoji.yes} **Successfully Removed Premium**`)
            .setColor(client.embedColor)
            message.reply({embeds: [thing]})
        })



        }
    }

    