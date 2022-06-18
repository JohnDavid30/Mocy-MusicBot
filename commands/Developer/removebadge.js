
const { MessageEmbed } = require("discord.js");
const Data = require("../../schema/User")
module.exports ={
  name:"removebadge",
  category: "Developer",
  description: "remove badges",
  args: false,
  usage: "remove badges",
  permission: [],
  owner: true,
run: async (message, args, client, prefix) => {



        let member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]);
if (!member) return message.channel.send('Options are dev,owner,badge,premium,suppoter,bug');
        let Member = await Data.findOne({ memberID: member.user.id });
        if (!Member) { Data.create({ memberID: member.user.id }); }
        
        if(!args[1]){
        
            return message.reply(`Options are dev,owner,badge,premium,suppoter,bug`)
        }
        if(args[1] ==="dev"){
        
        Member.badge.dev = false;
        await Member.save();
        
        return message.reply(`removed dev badge to that member`)
        
        
        }else if(args[1] ==="owner"){
        
            Member.badge.owner = false;
            await Member.save();
            
            return message.reply(`removed owner badge to that member`)
            
            
            }else if(args[1] ==="premium"){
        
                Member.badge.premium = false;
                await Member.save();
                
                return message.reply(`removed premium badge to that member`)
                } else if(args[1] ==="suppoter"){
        
                    Member.badge.supporter = false;
                    await Member.save();
                    
                    return message.reply(`removed suppoter badge to that member`)
                    
                    
                    }else if(args[1] ==="bug"){
        
                        Member.badge.dev = false;
                        await Member.save();
                        
                        return message.reply(`removed bug hunter badge to that member`)
                        
                        
                        }else{
                            return message.reply(`Invaild Options`)
                        }
                        




    
  
}
  
}
