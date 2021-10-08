const Discord = require('discord.js')
const db = require('quick.db');
const langfile = require('../lang.json')

module.exports.run = async (client, msg) => {

    const user = msg.author
    
    const lang = db.get(`${user.id}.userinfos.lang`) || 'eng'

    msg.channel.send({
        embed: new Discord.RichEmbed()
            .setTitle(`**${langfile[lang].invite.title}**`)
            .setDescription(`https://discordapp.com/api/oauth2/authorize?client_id=671809678992343040&permissions=60480&scope=bot`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`By : _𝙓 𝙀 𝙣 𝙚 🔥🌹 | 🇷🇺 | Data : https://cutt.ly/hrIgmHD`)
    })
}

module.exports.help = {
    name: "invite"
}