const { MessageEmbed, Message } = require("discord.js");
const schema = require("../../schema/premium")
const day = require("dayjs")

module.exports = {
    name: `addpremium`,
    category: `Developer`,
    aliases: [`adp`],
    description: `Add Premium`,
    usage: `addpremium <id> <time>`,
    owner: true,
    run: async (message, args, client, prefix) => {


        const thing = new MessageEmbed()
            .setDescription(`Please Provide A Guild Id...`)
            .setColor(client.embedColor)
        const things = new MessageEmbed()
            .setDescription(`Please Provide A Valid Guild ID`)
            .setColor(client.embedColor)
        if (!args[0]) return message.reply({ embeds: [thing] })
        if (!client.guilds.cache.has(args[0])) return message.reply({ embeds: [things] });




        schema.findOne({ Guild: args[0] }, async (err, data) => {

            if (data) data.delete();


            if (args[1]) {
                const Expire = day(args[1]).valueOf();

                new schema({
                    Guild: args[0],
                    Expire,
                    Permanent: false
                }).save();

            } else {
                new schema({
                    Guild: args[0],
                    Expire: 0,
                    Permanent: true
                }).save();

            }
            const guildop = args[0]
            const guildname = client.guilds.cache.get(guildop)

            const thing = new MessageEmbed()
                .setDescription(`${client.emoji.yes} Successfully Added **${guildname.name}** In Premium List`)
                .setColor(client.embedColor)
            message.reply({ embeds: [thing] })
        })




    },
    
}
/// 6 errors the