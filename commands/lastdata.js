const Discord = require('discord.js')
const db = require('quick.db');
const langfile = require('../lang.json')

module.exports.run = async (client, msg) => {

    const user = msg.author
    
    const lang = db.get(`${user.id}.userinfos.lang`) || 'eng'

    request('https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/', (error, 
    response, html) => {
        if (!error && response.statusCode == 200){
            const $ = cheerio.load(html);
                
            const data = [];
                $('h2:contains("Timeline (GMT)")')
                    .nextUntil('h3')
                    .each((idx, el) => {
                        if (el.name === 'h4') {
                            const obj = {
                                date: $(el)
                                    .text()
                                    .trim(),
                                    time: $(el)
                                        .next()
                                        .children('li')
                                        .toArray()
                                        .map(li => ({
                                            time_and_description: $(li)
                                                .text()
                                                .trim()
                                                .replace(' (Source)', ''),
                                        }))
                            };

                            const embed = new Discord.RichEmbed()
                                .setTitle(`**__${file.data[0].date} ${langfile[lang].lastdata.title}__**`)
                                .setColor('RANDOM')
                                .setDescription(`${tableaureturn} `)
                            msg.channel.send(embed).then(msg => { msg.delete(350000) })
                            
                            }})
                }
    })

    /*var tableau = []

    Array.from({length: 10}, (x,i) => {

        let time = file.data[1].time[i].time_and_description
    
        tableau.push(`${time} \n`)           
    })

    let tableaureturn = tableau.join(' ');

    console.log(tableaureturn)

    const embed = new Discord.RichEmbed()
        .setTitle(`**__${file.data[0].date} ${langfile[lang].lastdata.title}__**`)
        .setColor('RANDOM')
        .setDescription(`${tableaureturn} `)
    msg.channel.send(embed).then(msg => { msg.delete(350000) })*/

    let langfile = {
        fr: {
            "err": "Commande en cours de maintenance",
        },
        eng: {
            "err": "Command in maintenance"
        }
    }

    msg.channel.send(`😕 ${langfile[lang].err} !`)
}

module.exports.help = {
    name: "lastdata"
}