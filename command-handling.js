const { REST, Routes } = require('discord.js');
const fs = require('fs');
const { toASCII } = require('punycode');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Commands', 'Status');

const commands = [];

for(const folder of fs.readdirSync('./commands')) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken('client token');

(async() => {
    try {
        console.log(' Start downloading commands');
        const data = await rest.put(Routes.applicationCommands('app token'), { body: commands });

        //print loaded commands
        for(let i=0; i<commands.length; i++) {
            table.addRow(commands[i].name, "loaded");
        }

        console.log(table.toString(), '\n Downloading has been finished')
    }
    catch(error) {
        console.error(error);
    }
})();