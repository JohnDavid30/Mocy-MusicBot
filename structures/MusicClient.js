const Discord = require("discord.js"); 
const { Client, Intents, Collection, MessageEmbed, MessageButton, MessageSelectMenu } = require("discord.js");
const { Manager } = require("erela.js");
const { readdirSync } = require("fs");
const deezer = require("erela.js-deezer");
const Spotify = require("erela.js-spotify");
const apple = require("erela.js-apple");
const facebook = require("erela.js-facebook");
const mongoose = require('mongoose');
require("./PlayerBase"); 
require("../utils/mocymusic");
const intents = new Intents([ 
  "GUILD_MEMBERS" 
]);

// Hello from the new soul bot lol

class MusicBot extends Client {
	 constructor() {
        super({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS,
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    presence: {
        status: "dnd",
        activities: [{
        name: ">play | Beta",
        type: "LISTENING"
        }]
    },
    ws: { intents },
    fetchAllMembers: false,
    restTimeOffset: 0,
    shards: "auto",
    restWsBridgetimeout: 100,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
		 this.commands = new Collection();
     this.slashCommands = new Collection();
     this.config = require("../config.js");
     this.owner = this.config.ownerID;
     this.prefix = this.config.prefix;
     this.embedColor = this.config.embedColor;
     this.aliases = new Collection();
     this.logger = require("../utils/logger.js");
     this.emoji = require("../utils/emoji.json");
     if(!this.token) this.token = this.config.token;
   /**
    *  Mongose for data base
    */
		 const dbOptions = {
        useNewUrlParser: true,
        autoIndex: false,
        connectTimeoutMS: 10000,
        family: 4,
        useUnifiedTopology: true,
      };
        mongoose.connect(this.config.mongourl, dbOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
         this.logger.log('[DB] DATABASE CONNECTED', "ready");
              });
        mongoose.connection.on('err', (err) => {
         console.log(`Mongoose connection error: \n ${err.stack}`, "error");
              });
        mongoose.connection.on('disconnected', () => {
         console.log('Mongoose disconnected');
              });
        
    /**
     * Error Handler
     */
    this.on("disconnect", () => console.log("Bot is disconnecting..."))
    this.on("reconnecting", () => console.log("Bot reconnecting..."))
    this.on('warn', error => console.log(error));
    this.on('error', error => console.log(error));
    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error))
    const client = this;
    this.manager = new Manager({
    
      nodes: this.config.nodes,
      plugins: [
        new deezer(),
        new Spotify({
          clientID: this.config.SpotifyID,
          clientSecret: this.config.SpotifySecret
      }),
        new apple(),
        new facebook(),
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      },
    })
		  
/**
 * Client Events
 */
   readdirSync("./events/Client/").forEach(file => {
    const event = require(`../events/Client/${file}`);
    this.on(event.name, (...args) => event.run(this, ...args));
});
/**
 * Erela Manager Events
 */ 
  readdirSync("./events/Lavalink/").forEach(file => {
    const event = require(`../events/Lavalink/${file}`);
    let eventName = file.split(".")[0];
    this.logger.log(`Loading Events Lavalink ${eventName}`, "event");
    this.manager.on(eventName, event.bind(null, this));
});
/**
 * Import all commands
 */
  readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`);
        this.logger.log(`Loading ${command.category} commands ${command.name}`, "cmd");
        this.commands.set(command.name, command);
    }
})
/**
 * SlashCommands 
 */
  const data = [];
       
  
	  this.on("ready", async () => {
        await this.application.commands.set(data).then(() => this.logger.log(`Client Application (/) Registered.`, "cmd")).catch((e) => console.log(e));
    });
	 }
		 connect() {
        return super.login(this.token);
    };
};
module.exports = MusicBot;