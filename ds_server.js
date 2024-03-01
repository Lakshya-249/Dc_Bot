const {Client, IntentsBitField} = require("discord.js");
const {User,jUser} = require("./database");

require("dotenv").config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on("ready",(c)=>{
    console.log(`the bot: ${c.user.tag} is online`);
})

client.on("messageCreate", async (msg)=>{
    if(msg.author.bot) return;
    const content = msg.content.toLowerCase().replace(/\s+/g," ");
    if(content.startsWith("ori ")){
        const user_data = content.split("ori ")[1];
        if(user_data.startsWith("response")){
            const newuser_data = content.split("response ")[1].split(";");
            const check = await User.findOne({text: newuser_data[0].trim()});
            if(check){
                msg.reply(`Data already exit in database...`);
                return;
            }
            await User.create({
                text : newuser_data[0].trim(),
                reply : newuser_data[1].trim()
            })
            msg.reply(`${msg.author} response added to database...`);
        }
        else if(user_data.startsWith("tell_joke")){
            const joke_data = await jUser.find();
            msg.reply(`${msg.author} ${joke_data[Math.floor(Math.random()*88)].joke} 😂😂🤣`);
        }
        else{
            if(user_data == "hello"){
                msg.reply(`${msg.author} hello`);
            }
            const reply_data = await User.findOne({text: user_data});
            if(reply_data){
                msg.reply(`${msg.author} ${reply_data.reply}`);
            }else{
                msg.reply(`😞Sorry I do not have a proper response for it.. can u please provide a response by typing bot response {your text ;your response...}#{} brackets not really required...`);
            }
        }
    }
});

client.on("interactionCreate", (interc)=>{
    if(!interc.isChatInputCommand()) return;
    console.log(interc.commandName);
    if(interc.commandName == "hey"){
        interc.reply("hey!");
    }
    if(interc.commandName == "ping"){
        interc.reply("pong!");
    }

});

client.login(process.env.TOKEN);