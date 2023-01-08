require('dotenv').config();
const fs = require('fs');

//define client intents
const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const client = new Client({
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

client.commands = new Collection();
//fetch all files in ./commads folder
for (const folder of fs.readdirSync('./commands')) {
    //check if file in dir is JS file
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    //set up all commands
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        client.commands.set(command.data.name, command);
    }
}
//set up bot
client.once('ready', () => {
    console.log('Bot is ready');

    client.user.setPresence({ activities: [{ name: 'Test', type: ActivityType.Listening }] });
});

//invoking commands
client.on('interactionCreate', async interaction => {
    //check if interaction isn't a command
    if(!interaction.isChatInputCommand()) {
        return console.log('Errro');
    }

    //declare command
    const command = interaction.client.commands.get(interaction.commandName);

    //if somethinf wrong with our command return error
    if(!command) {
        return console.log('This command doesnt exist');
    }

    //try to execute a command
    try {
        await command.execute(interaction);
    }
    catch(error) {
        console.error(error);
        await interaction.replay({ content: 'Something is wrong', ephemeral: true });
    }
});

client.login(process.env.CLIENT_TOKEN);