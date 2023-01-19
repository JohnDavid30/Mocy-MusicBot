require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "",  //
    prefix: process.env.PREFIX || ">", // bot prefix
    ownerID: ["786913832714240000", "396906512469196811", "541961223525236736"], //your discord id
    SpotifyID: process.env.SPOTIFYID || "5986ea56d7cd4bbda134198ebd42c2d3", // spotify client id
    SpotifySecret: process.env.SPOTIFYSECRET || "79afab0730584f3b9aaae78477e10654", // spotify client secret
    mongourl: process.env.MONGO_URI || "mongodb+srv://qqq:qqq@my.cq5sv.mongodb.net/Royal7?retryWrites=true&w=majority", // MongoDb URL
    embedColor: process.env.COlOR || "#303236", // embed colour
    logs: process.env.LOGS || "918347187384119336", // channel id for guild create and delete logs
    links: 
        {
            web: "http://vibely.ga/",
            support: "https://discord.gg/RuPEcVCYdd",
            img:"https://media.discordapp.net/attachments/934681551420145777/981737965745233930/Picsart_22-06-02_07-32-00-123.jpg",
            bg:"https://media.discordapp.net/attachments/934681551420145777/981737965745233930/Picsart_22-06-02_07-32-00-123.jpg",
            invite:"https://discord.com/api/oauth2/authorize?client_id=981582576592510987&permissions=8&scope=bot%20applications.commands",
        },

    nodes: [
    {
      host: process.env.NODE_HOST || "lava4.horizxon.studio",
      identifer: process.env.NODE_ID || "Main",
      port: parseInt(process.env.NODE_PORT || "80"),
      password: process.env.NODE_PASSWORD || "horizxon.studio",
      secure: parseBoolean(process.env.NODE_SECURE || "false"),

    }
  ],

}

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
