const { InteractionType } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    once : false,
    async execute(client, interaction) {

        if(interaction.type == InteractionType.ApplicationCommand){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply(`Cette commande n'xiste pas !`);
            cmd.runSlash(client, interaction);
        }

    }
}