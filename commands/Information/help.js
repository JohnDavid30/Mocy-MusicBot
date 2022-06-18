const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const  ultrax = require('ultrax');
const { readdirSync } = require("fs");
module.exports = {
    name: "help",
    category: "Information",
    aliases: [ "h" ],
    description: "Return all commands, or one specific command",
    args: false,
    usage: "help ping",
    permission: [],
    owner: false,
 run: async (message, args, client, prefix) => {
   if (args[0]) {
          const embed = new MessageEmbed();
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          if (!cmd) {
              return message.reply({embeds: [embed.setColor("RED").setDescription(`No Information found for command **${args[0].toLowerCase()}**`)]});
          }
          if (cmd.name) embed.addField("<:name:982938594706587689> **Command name**", `\`${cmd.name}\``);
          if (cmd.description) embed.addField("<:description:982938808754511883> **Description**", `\`${cmd.description}\``);
          if (cmd.aliases) embed.addField("<a:settings:982938901679329311> **Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
          if (cmd.category) embed.addField("<:category:982939001856086076> **Category**", `\`${cmd.category}\``)
          if (cmd.cooldown) embed.addField("<a:time:982939142801465384> **Cooldown**", `\`${cmd.cooldown} Seconds\``);
          if (cmd.usage) {
              embed.addField("🛡️ **Usage**", `\`${prefix}${cmd.usage}\``);
              embed.setFooter("Syntax: <> = required, [] = optional");
          }
          return message.reply({embeds: [embed.setColor(client.embedColor)]});
        } else {
   const info = `${client.commands
        .filter((cmd) => cmd.category === `Information`)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cmd) => {
          return `**${cmd.name}:** *${cmd.description}*`;
        })
        .join("\n")}`;
  const music = `${client.commands
        .filter((cmd) => cmd.category === `Music`)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cmd) => {
          return `**${cmd.name}:** *${cmd.description}*`;
        })
        .join("\n")}`;
       const filter = `${client.commands
        .filter((cmd) => cmd.category === `Filters`)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cmd) => {
          return `**${cmd.name}:** *${cmd.description}*`;
        })
        .join("\n")}`;
            const play = `${client.commands
        .filter((cmd) => cmd.category === `Playlist`)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cmd) => {
          return `**${cmd.name}:** *${cmd.description}*`;
        })
        .join("\n")}`;
    const settings = `${client.commands
        .filter((cmd) => cmd.category === `Settings`)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cmd) => {
          return `**${cmd.name}:** *${cmd.description}*`;
        })
        .join("\n")}`;
   const owner = `${client.commands
        .filter((cmd) => cmd.category === `Developer`)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cmd) => {
          return `**${cmd.name}:** *${cmd.description}*`;
        })
        .join("\n")}`;
   const  embed1 = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`Page 1/5\n\n 
------------------------------
● To get help on a specific command type \`${prefix}help <command>\`!
------------------------------`)
.addField(`Information Commands`, info);
const  embed2 = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`Page 2/5\n\n 
------------------------------
● To get help on a specific command type \`${prefix}help <command>\`!
------------------------------`)
.addField("Music Commands", music);
const  embed3 = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`Page 3/5\n\n 
------------------------------
● To get help on a specific command type \`${prefix}help <command>\`!
------------------------------`)
.addField(`Filter Commands`, filter);
const  embed4 = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`Page 4/5\n\n 
------------------------------
● To get help on a specific command type \`${prefix}help <command>\`!
------------------------------`)
.addField("Playlist Commands", play);
const  embed5 = new MessageEmbed()
.setColor(client.embedColor)
.setDescription(`Page 5/5\n\n 
------------------------------
● To get help on a specific command type \`${prefix}help <command>\`!
------------------------------`)
.addField("Settings Commands", settings);
if (client.config.ownerID.includes(message.author.id)) {
        embed5.addField(`<:developer:982958651398561802> Developer`, owner);                                           }

const buttonBack = new MessageButton()
.setStyle("SECONDARY")
.setLabel("<")

const buttonForward = new MessageButton()
.setStyle("SECONDARY")
.setLabel(">")



// creating the buttons pages
await  ultrax.ButtonPaginator(message, [embed1, embed2, embed3, embed4, embed5], [buttonBack, buttonForward]);
   }
   }
}