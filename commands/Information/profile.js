const User = require("../../schema/User");
const Discord = require("discord.js");
const { userInfo } = require("os");
module.exports = {
  name: "profile",
  category: "Information",
  description: "Check your Profile",
  args: false,
  usage: "profile",
  permission: [],
  owner: false,
    run: async (message, args, client, prefix) => {
        let cache =[]
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])|| message.member;
        let data = await User.findOne({userId:member.id});
        if(!data) data = await User.create({userId:member.id});
        



        if(data.badge.owner){
            cache.push(`${client.emoji.owner} Owner`)
          }
          
          if(data.badge.dev){
            cache.push(`${client.emoji.dev} Verified bot developer`)
          }
          
          if(data.badge.premium){
            cache.push(`${client.emoji.premium} Premium Holder`)
          }
          
          if(data.badge.suppoter){
            cache.push(`${client.emoji.suppoter} Suppoter`)
          }
          if(data.badge.bug){
            cache.push(`${client.emoji.bug} Bug Hunter`)
          }
          
          
          
          
          
          if(cache.length ===0){
              cache.push(`You have no achievements in ${client.user.username}! Don't worry [click here](${client.config.links.support}) to buy premium to get some achievements/badges in ${client.user.username}..`)
          }







        
        let embed = new Discord.MessageEmbed()
        .setColor(client.embedColor)
        .setTitle(`Profile`)
        .setDescription(`**Name:** ${member.user.username}\n**ID:** ${member.user.id}`)
        .addField(`__Command Used__`,`${data.count} commands`)
        .addField(`__Vibely Achievments__`,cache.join("\n"))
        .setFooter(`Requested by: ${member.user.tag}`)
     
        message.channel.send({ embeds:[embed] })
    }
  }
  