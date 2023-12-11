const { ApplicationCommandOptionType } = require('discord.js');
const { Permissions } = require('../../db/index');

module.exports = {
    admin: true,
    name: 'rmperm',
    description : 'Retire les permissions d\'utilisation des commandes',
    help:'Utilisation : /rmperm <commande> [role] [user]',
    options: [{
        name:'commande',
        description : 'Commande pour laquelle définir les permissions',
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        name:'role',
        description : 'Role à autoriser',
        type: ApplicationCommandOptionType.Role,
        required: false
    },
    {
        name:'user',
        description : 'Utilisateur à autoriser',
        type: ApplicationCommandOptionType.User,
        required: false
    },
],

    runSlash: async (client, interaction) => {

        const perm = await Permissions.findOne({ id: 1 });
        
        const cmd = interaction.options.getString('commande');
        const role = interaction.options.getRole('role');
        const user = interaction.options.getUser('user');

        if (client.commands.has(interaction.options.getString('commande'))) {
            if(role){
                if(perm.commands[cmd].roles.includes(role.id))perm.commands[cmd].roles = perm.commands[cmd].roles.filter(e => e !== role.id)
            }if(user){
                if(perm.commands[cmd].users.includes(user.id))perm.commands[cmd].users = perm.commands[cmd].users.filter(e => e !== user.id)
            }if(!role && !user){
                return interaction.reply({content :'Aucunne permission trouvée', ephemeral: true});
            }
        }else{
            return interaction.reply({content :'Commande inconnue', ephemeral: true});
        }
        
        await perm.save();

        interaction.reply({content :'Permission retirée', ephemeral: true});
    }
}