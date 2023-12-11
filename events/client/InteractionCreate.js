const { InteractionType } = require("discord.js");
const { Permissions } = require('../../db/index');

module.exports = {
    name: 'interactionCreate',
    once : false,
    async execute(client, interaction) {

        const perm = await Permissions.findOne({ id: 1 });

        if(interaction.type == InteractionType.ApplicationCommand){

            const cmd = client.commands.get(interaction.commandName);

            if(!cmd) return interaction.reply(`Cette commande n'xiste pas !`);

            if(cmd.admin){
                if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content :'Tu n\'as pas le droit d\'utiliser cette commande', ephemeral: true});
            }

            if(!perm) return client.commands.get('dbsetup').runSlash(client, interaction);

            if(perm.commands[cmd.name] != undefined || perm.commands[cmd.name] != null){
                if(cmd.name != 'dbsetup' && perm.commands[cmd.name].enable){
                    if(!perm.commands[cmd.name].roles.some(r => interaction.member.roles.cache.has(r)) && !perm.commands[cmd.name].users.includes(interaction.user.id)) return interaction.reply({content :'Tu n\'as pas le droit d\'utiliser cette commande', ephemeral: true});
                }
            }
            
            cmd.runSlash(client, interaction);


        }

    }
}