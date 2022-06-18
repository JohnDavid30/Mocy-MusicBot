const emoji = require("./emojis.json");
module.exports = {
    progressbar: function (player) {
try{
    let size = 15;
    if (!player.queue.current) return `**${emoji.progress_bar.emptybeginning}${emoji.progress_bar.filledframe}${emoji.progress_bar.emptyframe.repeat(size - 1)}${emoji.progress_bar.emptyend}**\n**00:00:00 / 00:00:00**`;
    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
    let total = player.queue.current.duration;
    let rightside = size - Math.round(size * (current / total));
    let leftside = Math.round(size * (current / total));
    let bar;
    if (leftside < 1) bar = String(emoji.progress_bar.emptybeginning) + String(emoji.progress_bar.emptyframe).repeat(rightside) + String(emoji.progress_bar.emptyend);
    else bar = String(emoji.progress_bar.leftindicator) + String(emoji.progress_bar.filledframe).repeat(leftside) + String(emoji.progress_bar.emptyframe).repeat(rightside) + String(size - rightside !== 1 ? emoji.progress_bar.emptyend : emoji.progress_bar.rightindicator);
    return `**${bar}**\n**${!player.queue.current.isStream ? `**${new Date(player.position).toISOString().substr(11, 8)} / ${new Date(player.queue.current.duration).toISOString().slice(11, 19)}**` : '<:live:985800781607366686> `LIVE`'}**`;
  }catch (e){
    console.log(String(e.stack).bgRed)
  }
    }
 }
