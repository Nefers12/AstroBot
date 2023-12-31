const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'roll',
    help:'Utilisation: /r <nombre de faces> [nombre de dés] [cache]',
    description : 'Lance un dé',
    options : [{
        name:'faces',
        description : 'Nombre de faces du dé',
        type: ApplicationCommandOptionType.Integer,
        required: true
    },
    {
        name:'nombre',
        description : 'Nombre de dés lancés',
        type: ApplicationCommandOptionType.Integer,
        required: false
    },
    {
        name:'cache',
        description : 'Cache le lancé de dés aux autres joueurs',
        type: ApplicationCommandOptionType.Boolean,
        required: false
    }],
    runSlash: async (client, interaction) => {
            
        const faces = interaction.options.getInteger('faces');
        const nombre = interaction.options.getInteger('nombre');
        const cache = interaction.options.getBoolean('cache');
        
        let hidden = false;

        if(nombre > 10) return interaction.reply({content :'Tu ne peux pas lancer plus de 10 dés', ephemeral: true});
        if(faces < 1) return interaction.reply({content :'Tu ne peux pas lancer un dé à moins d\'une face', ephemeral: true});
        if(cache == true) hidden = true;

        if(!nombre) {
            const rollEmbed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({name: `${interaction.user.username} lance un dé à ${faces} faces`, iconURL: interaction.user.displayAvatarURL()})
            .setTitle(`Résultat : ${Math.floor(Math.random() * faces) + 1}`)
            .setTimestamp()

            interaction.reply({embeds: [rollEmbed], ephemeral: hidden});

    }else{
        let result = [];
        for(let i = 0; i < nombre; i++) {
            result.push(Math.floor(Math.random() * faces) + 1);
        }
        const rollEmbed = new EmbedBuilder()
        .setColor('Random')
        .setAuthor({name: `${interaction.user.username} lance ${nombre} dés à ${faces} faces`, iconURL: interaction.user.displayAvatarURL()})
        .setTitle(`Résultat : ${result.join(', ')}\nTotal : ${result.reduce((a, b) => a + b, 0)}`)
        .setTimestamp()

        interaction.reply({embeds: [rollEmbed], ephemeral: hidden});

    }
}

}