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

const rest = new REST({ version: '10' }).setToken('MTA2MTY2MzIzMjgwMjE2ODg2Mg.G0ME1p.fVEVtO3rAJPmTLE_644trML1qO5jYBUXevLfjM');

(async() => {
    try {
        console.log('Start downloading commands');
        const data = await rest.put(Routes.applicationCommands('1061663232802168862'), { body: commands });

        console.log('Downloading has been finished');
    }
    catch(error) {
        console.error(error);
    }
})();