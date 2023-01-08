const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = [];

for(const folder of fs.readdirSync('./commands')) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);

(async() => {
    try {
        console.log('Start downloading commands');
        const data = await rest.put(Routes.applicationCommands(process.env.APP_TOKEN), { body: commands });

        console.log('Downloading has been finished');
    }
    catch(error) {
        console.error(error);
    }
})();