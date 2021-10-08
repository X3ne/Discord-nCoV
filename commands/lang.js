const Discord = require('discord.js')
const db = require('quick.db');

module.exports.run = async (client, msg) => {
    const user = msg.author

    const lang = db.get(`${user.id}.userinfos.lang`)

    const filter = (reaction, user) => {
        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === msg.author.id;
    };

    const filterflag = (reaction, user) => {
        return ['🇫🇷', '🇺🇸'].includes(reaction.emoji.name) && user.id === msg.author.id;
    };

    if(!lang){
        msg.channel.send(`**Choose your language !** 
        \nReact to this message with the corresponding reaction
        \n:flag_fr: **Français** :flag_us: **English**
        `).then(async m => await m.react('🇫🇷').then(() => m.react('🇺🇸')).then(() => m.awaitReactions(filterflag, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
            const reaction = collected.first();
    
            if (reaction.emoji.name === '🇫🇷') {
                msg.reply('Tu as choisis la langue : **Français**');
                db.set(`${user.id}`, {userinfos : {lang: 'fr'}})
            } else {
                msg.reply('You have chosen the language : **English**');
                db.set(`${user.id}`, {userinfos : {lang: 'eng'}})
            }
        })))
    }else{
        if(lang === 'fr'){
            msg.channel.send(`La langue sélectionnée est : :flag_fr: **Français**`)
            msg.channel.send(`Veux-tu changer la langue ?`).then(async m => await m.react('✅').then(() => m.react('❌')).then(() => m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '✅') {
                    const filter1 = (reaction, user) => {
                        return ['🇫🇷', '🇺🇸'].includes(reaction.emoji.name) && user.id === msg.author.id;
                    };
    
                    msg.reply('Ok pas de problèmes, choisis la langue').then(async m => await m.react('🇫🇷').then(() => m.react('🇺🇸')).then(() => m.awaitReactions(filter1, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
                        const reaction = collected.first();
                
                        if (reaction.emoji.name === '🇫🇷') {
                            msg.reply('Tu as choisis la langue : **Français**');
                            db.set(`${user.id}`, {userinfos : {lang: 'fr'}})
                        } else {
                            msg.reply('You have chosen the language : **English**');
                            db.set(`${user.id}`, {userinfos : {lang: 'eng'}})
                        }
                    })))
                } else {
                    msg.reply('Ok on reste sur : **Français**');
                }
            })))
        }
    
        if(lang === 'eng'){
            msg.channel.send(`The selected language is : :flag_us: **English**`)
            msg.channel.send(`Do you want to change the language ?`).then(async m => await m.react('✅').then(() => m.react('❌')).then(() => m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '✅') {
                    const filter1 = (reaction, user) => {
                        return ['🇫🇷', '🇺🇸'].includes(reaction.emoji.name) && user.id === msg.author.id;
                    };
    
                    msg.reply('Ok no problem, choose the language').then(async m => await m.react('🇫🇷').then(() => m.react('🇺🇸')).then(() => m.awaitReactions(filter1, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
                        const reaction = collected.first();
                
                        if (reaction.emoji.name === '🇫🇷') {
                            msg.reply('Tu as choisis la langue : **Français**');
                            db.set(`${user.id}`, {userinfos : {lang: 'fr'}})
                        } else {
                            msg.reply('You have chosen the language : **English**');
                            db.set(`${user.id}`, {userinfos : {lang: 'eng'}})
                        }
                    })))
                } else {
                    msg.reply('Ok on reste sur : **Français**');
                }
            })))
        }
    }
}

module.exports.help = {
    name: "lang"
}