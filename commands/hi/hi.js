const { SlashCommandBuilder } = require('discord.js');

//create module with command
module.exports = {
    //setup name of command and description
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription('Enter /hi to get Hello from bot'),
    //here is a output of our command
    async execute(interaction) {
        //all user data which send a message is stored in
        //---interaction.user---
        interaction.reply(`Hello ${interaction.user.username}`);
    }
}