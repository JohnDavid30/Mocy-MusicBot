const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "invite",
  category: "Information",
  aliases: ["addme", "support"],
  description: "give you an invite link of Music",
  args: false,
  usage: "invite",
  permission: [],
  owner: false,
  run: async (message, args, client, prefix) => {
      var web = client.config.links.web;
    var invite = client.config.links.invite;
var support = client.config.links.support;

    var color = client.embedColor
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("Invite")
          .setStyle("LINK")
          .setURL(invite),
        new MessageButton()
          .setLabel("Support Server")
          .setStyle("LINK")
          .setURL(support),

        new MessageButton()

          .setLabel("Website")

          .setStyle("LINK")

          .setURL(web)
      );

    const mainPage = new MessageEmbed()
      .setDescription(`[Support Server](${support})`)
      .addField(`<a:discord:982946164498395156> ${client.user.username}`, `[\`Invite Here\`](${invite})`)
      .setFooter(`Thanks For Choosing ${client.user.username}!`, client.user.displayAvatarURL())
      .setTimestamp()
      .setColor(color)
    message.reply({ embeds: [mainPage], components: [row] })
  }
}
