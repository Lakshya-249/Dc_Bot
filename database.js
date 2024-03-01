const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/bot_db")
    .then(()=> console.log("Database Connected..."))
    .catch((err)=>{
        console.log("Eror while connecting to database...");
    })

const userschema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
        unique: true
    },
    reply:{
        type: String,
        required: true,
    } 
});

const userschema2 = new mongoose.Schema({
    joke:{
        type: String,
        unique: true
    }
})

const User = mongoose.model("bot_user",userschema);
const jUser = mongoose.model("joke_user",userschema2);

module.exports = {User,jUser};