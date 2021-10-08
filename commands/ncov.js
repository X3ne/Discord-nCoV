const Discord = require('discord.js')
const superagent = require('superagent');
const db = require('quick.db');
const langfile = require('../lang.json')

module.exports.run = async (client, msg) => {

    const user = msg.author
    
    const lang = db.get(`${user.id}.userinfos.lang`) || 'eng'

    msg.channel.send(`🔃 ${langfile[lang].ncov.loading}`).then(msg => { msg.delete(1000) })

    let {body} = await superagent

    .get(`https://lab.isaaclin.cn/nCoV/api/overall`)
        
    const attachment = new Discord.Attachment('./graph.png', 'graph.png');

    msg.channel.send({
        embed: new Discord.RichEmbed()
            .setTitle(`**__Coronavirus 2019-nCoV__**`)
            .setDescription(`☣️ ${langfile[lang].ncov.confirmed} : **${body.results[0].confirmedCount} | + ${body.results[0].confirmedIncr} ${langfile[lang].ncov.en} 24h**
            \n👀 ${langfile[lang].ncov.suspicious} : **${body.results[0].suspectedCount} | + ${body.results[0].suspectedIncr} ${langfile[lang].ncov.en} 24h**
            \n⚕️ ${langfile[lang].ncov.cured} : **${body.results[0].curedCount} | + ${body.results[0].curedIncr} ${langfile[lang].ncov.en} 24h**
            \n😷 ${langfile[lang].ncov.serious} : **${body.results[0].seriousCount} | + ${body.results[0].seriousIncr} ${langfile[lang].ncov.en} 24h**
            \n${langfile[lang].ncov.death} : **${body.results[0].deadCount} | + ${body.results[0].deadIncr} ${langfile[lang].ncov.en} 24h**`)
            .setColor('RANDOM')
            .attachFile(attachment)
            .setImage('attachment://graph.png')
            .setTimestamp(new Date())
            .setFooter(`By : _𝙓 𝙀 𝙣 𝙚 🔥🌹 | 🇷🇺 | Data : https://cutt.ly/hrIgmHD`)
    })
}

module.exports.help = {
    name: "ncov"
}