const Discord = require('discord.js')
const db = require('quick.db');
const langfile = require('../lang.json')

module.exports.run = async (client, msg) => {

    const user = msg.author
    
    const lang = db.get(`${user.id}.userinfos.lang`) || 'eng'

    msg.channel.send({
        embed: new Discord.RichEmbed()
            .setTitle(`**${langfile[lang].symptoms.title}**`)
            .setDescription(`**- ${langfile[lang].symptoms.s1}
            - ${langfile[lang].symptoms.s2}
            - ${langfile[lang].symptoms.s3}**
            \n
            **${langfile[lang].symptoms.s4}**
            `)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`By : _𝙓 𝙀 𝙣 𝙚 🔥🌹 | 🇷🇺 | ${msg.author.username}`)
    })
}

module.exports.help = {
    name: "symptoms"
}