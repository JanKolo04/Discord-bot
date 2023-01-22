const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Get meme"),
    
    async execute(interaction) {
        const { guild, memeber } = interaction;
        const embed = new EmbedBuilder();

        await fetch("https://www.reddit.com/r/memes/random/.json").then(async res => {
            let meme = await res.json();

            let title = meme[0].data.children[0].data.title;
            let url = meme[0].data.children[0].data.url;
            
            return interaction.reply({ embeds: [embed.setTitle(title).setImage(url).setURL(url).setColor("Random").setFooter({ text: "From reddit" })] });
        });
    }
}