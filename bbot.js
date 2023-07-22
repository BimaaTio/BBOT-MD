require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const fsx = require('fs-extra')
const bochil = require('@bochilteam/scraper')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const jsobfus = require('javascript-obfuscator')
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader')
const { toAudio, toPTT, toVideo, ffmpeg } = require('./lib/converter')
const moment = require('moment-timezone')
const { JSDOM } = require('jsdom')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc')
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('./lib/addlist');

// read database
global.db.data = JSON.parse(fs.readFileSync('./src/database.json'))
if (global.db.data) global.db.data = {
    users: {},
    group: {},
    chats: {},
    database: {},
    settings: {},
    donate: {},
    others: {},
    sticker: {},
    ...(global.db.data || {})
}

moment.tz.setDefault("Asia/Jakarta").locale("id")

module.exports = conn = async (conn, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const full_args = body.replace(command, '').slice(1).trim()
        const pushname = m.pushName || "No Name"
        const botNumber = await conn.decodeJid(conn.user.id)
        const isCreator = [botNumber, ...global.owner, '6288225464285@s.whatsapp.net'].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)

	    
        const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
    	const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false

        // Days
        const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
        const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
        const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')
        const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')

        const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
        if(time2 < "23:59:00"){
        var ucapanWaktu = 'Selamat Malam 🏙️'
        }
        if(time2 < "19:00:00"){
        var ucapanWaktu = 'Selamat Petang 🌆'
        }
        if(time2 < "18:00:00"){
        var ucapanWaktu = 'Selamat Sore 🌇'
        }
        if(time2 < "15:00:00"){
        var ucapanWaktu = 'Selamat Siang 🌤️'
        }
        if(time2 < "10:00:00"){
        var ucapanWaktu = 'Selamat Pagi 🌄'
        }
        if(time2 < "05:00:00"){
        var ucapanWaktu = 'Selamat Subuh 🌆'
        }
        if(time2 < "03:00:00"){
        var ucapanWaktu = 'Selamat Tengah Malam 🌃'
        }


        // ALL Fake
        const ftroli = {
            key: {
                fromMe: false,
                "participant": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast"
            },
            "message": {
                orderMessage: {
                    itemCount: 2022,
                    status: 200,
                    thumbnail: thumb,
                    surface: 200,
                    message: `${namaowner}`,
                    orderTitle: 'Bimatio',
                    sellerJid: '0@s.whatsapp.net'
                }
            },
            contextInfo: {
                "forwardingScore": 999,
                "isForwarded": true
            },
            sendEphemeral: true
        }
        
        const fkontak = {
            key: {
                participant: `0@s.whatsapp.net`,
                ...(m.chat ? {
                    remoteJid: `status@broadcast`
                } : {})
            },
            message: {
                'contactMessage': {
                    'displayName': `${namaowner}`,
                    'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;Bimatio,;;;\nFN:BBOT-MD\nitem1.TEL;waid=6289513081052:6289513081052\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                    'jpegThumbnail': thumb,
                    thumbnail: thumb,
                    sendEphemeral: true
                }   
            }
        }
        // Database Tambahan!!

        let prem = JSON.parse(fs.readFileSync('./database/premium.json'))
        let ban = JSON.parse(fs.readFileSync('./database/banned.json'))
        let vnnya = JSON.parse(fs.readFileSync('./database/vnnya.json'))
        let db_error = JSON.parse(fs.readFileSync('./database/error.json'));
        let db_respon_list = JSON.parse(fs.readFileSync('./database/list.json'));
        
        
        // Const Tambahan Sc Gw
        const more = String.fromCharCode(8206)
        const readmore = more.repeat(4001)
        const totalFitur = () =>{
            var mytext = fs.readFileSync("./bbot.js").toString()
            var numUpper = (mytext.match(/case '/g) || []).length;
            return numUpper
        }
        const sendvn = (teks) => {
            conn.sendMessage(from, { audio: teks, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
        }

        for (let anju of vnnya) {
            if (budy === anju) {
                let buffer = fs.readFileSync(`./database/AUDIO/${anju}.mp3`)
                sendvn(buffer)
            }
        }
        

        // Function Created By Bimatio Alias Dryan ft .𝐗𝐓𝐑𝐀𝐌
function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

(function(_0x391ba4,_0x421240){const _0x331109=_0x13a5,_0x1adcc2=_0x391ba4();while(!![]){try{const _0x40c670=parseInt(_0x331109(0x1be))/0x1+-parseInt(_0x331109(0x1b3))/0x2*(parseInt(_0x331109(0x1bb))/0x3)+-parseInt(_0x331109(0x1b9))/0x4*(-parseInt(_0x331109(0x1c1))/0x5)+parseInt(_0x331109(0x1c0))/0x6*(-parseInt(_0x331109(0x1b8))/0x7)+-parseInt(_0x331109(0x1b7))/0x8+-parseInt(_0x331109(0x1bc))/0x9+-parseInt(_0x331109(0x1c2))/0xa*(-parseInt(_0x331109(0x1b4))/0xb);if(_0x40c670===_0x421240)break;else _0x1adcc2['push'](_0x1adcc2['shift']());}catch(_0x52dca3){_0x1adcc2['push'](_0x1adcc2['shift']());}}}(_0x29e9,0xc89d4));function _0x29e9(){const _0x322969=['1122272AirDVV','isLink','6Opzccm','5EVzgCS','50yGvzzi','getObfuscatedCode','14wGPoDT','4699178fatIuF','obfuscate','sendMessage','4074528rhwIbc','10754611khoYWD','1743604zPhtLl','Bimatio','6087gVSFPI','7312995uObpvU','chat'];_0x29e9=function(){return _0x322969;};return _0x29e9();}function _0x13a5(_0x5b95a9,_0x39450a){const _0x29e9b1=_0x29e9();return _0x13a5=function(_0x13a53a,_0x4c4258){_0x13a53a=_0x13a53a-0x1b3;let _0x2152f0=_0x29e9b1[_0x13a53a];return _0x2152f0;},_0x13a5(_0x5b95a9,_0x39450a);}async function obfus(_0xfea0bc){return new Promise((_0x4e9071,_0x149431)=>{const _0x1bfb1a=_0x13a5;try{const _0x5bec3f=jsobfus[_0x1bfb1a(0x1b5)](_0xfea0bc,{'compact':![],'controlFlowFlattening':!![],'controlFlowFlatteningThreshold':0x1,'numbersToExpressions':!![],'simplify':!![],'stringArrayShuffle':!![],'splitStrings':!![],'stringArrayThreshold':0x1}),_0x21630c={'status':0xc8,'author':_0x1bfb1a(0x1ba),'result':_0x5bec3f[_0x1bfb1a(0x1c3)]()};_0x4e9071(_0x21630c);}catch(_0x226fe6){_0x149431(_0x226fe6);}});}async function newReply(_0xf99f6){const _0x4b0fdd=_0x13a5,_0x45581c={'text':_0xf99f6,'contextInfo':{'externalAdReply':{'showAdAttribution':!![],'title':ucapanWaktu+'\x20'+pushname,'body':_0x4b0fdd(0x1ba),'thumbnailUrl':''+imageurl,'sourceUrl':''+global[_0x4b0fdd(0x1bf)],'mediaType':0x1,'renderLargerThumbnail':!![]}}};return conn[_0x4b0fdd(0x1b6)](m[_0x4b0fdd(0x1bd)],_0x45581c,{'quoted':m});}

        try {
            let isNumber = x => typeof x === 'number' && !isNaN(x)
            let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
            let user = global.db.data.users[m.sender]
            if (typeof user !== 'object') global.db.data.users[m.sender] = {}
            if (user) {
                if (!isNumber(user.afkTime)) user.afkTime = -1
                if (!('afkReason' in user)) user.afkReason = ''
                if (!isNumber(user.limit)) user.limit = limitUser
            } else global.db.data.users[m.sender] = {
                afkTime: -1,
                afkReason: '',
                limit: limitUser,
            }
            let chats = global.db.data.chats[m.chat]
            if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
            if (chats) {
                if (!('mute' in chats)) chats.mute = false
                if (!('antilink' in chats)) chats.antilink = false
                if (!('antilinkyt' in chats)) chats.antilinkyt = false
                if (!('antilinktt' in chats)) chats.antilinktt = false
                if (!('antivirtex' in chats)) chats.antivirtex = true
            } else global.db.data.chats[m.chat] = {
                mute: false,
                antilink: false,
                antilinkyt: false,
                antilinktt: false,
                antivirtex: true,
            }
            let setting = global.db.data.settings[botNumber]
            if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
            if (setting) {
                if (!isNumber(setting.status)) setting.status = 0
                if (!('autobio' in setting)) setting.autobio = false
                if (!('autoread' in setting)) setting.autoread = false
            } else global.db.data.settings[botNumber] = {
                status: 0,
                autobio: false,
                autoread: false
            }

        } catch (err) {
            console.error(err)
        }
        // Public & Self
        if (!conn.public) {
            if (!m.key.fromMe && !isPremium && !isCreator) return
        }
        
        
        function _0x177a(){var _0x1c2844=['4281635LnIqDr','134690YtLptT','key','4374228MlnyAa','1418480tRWwDc','message','4523208FsuoKn','1700584sNuylB','7740649CnQRYU','data'];_0x177a=function(){return _0x1c2844;};return _0x177a();}function _0x2290(_0x10c98f,_0x4573d6){var _0x177a4c=_0x177a();return _0x2290=function(_0x229025,_0x159fff){_0x229025=_0x229025-0xa7;var _0x38b2b1=_0x177a4c[_0x229025];return _0x38b2b1;},_0x2290(_0x10c98f,_0x4573d6);}var _0x116958=_0x2290;(function(_0xa46f9d,_0x57c669){var _0x4a088c=_0x2290,_0x32dddf=_0xa46f9d();while(!![]){try{var _0x9935d3=parseInt(_0x4a088c(0xac))/0x1+-parseInt(_0x4a088c(0xa8))/0x2+-parseInt(_0x4a088c(0xa7))/0x3+parseInt(_0x4a088c(0xaf))/0x4+parseInt(_0x4a088c(0xab))/0x5+parseInt(_0x4a088c(0xae))/0x6+parseInt(_0x4a088c(0xa9))/0x7;if(_0x9935d3===_0x57c669)break;else _0x32dddf['push'](_0x32dddf['shift']());}catch(_0x6f8537){_0x32dddf['push'](_0x32dddf['shift']());}}}(_0x177a,0xc8cb6));m[_0x116958(0xb0)]&&(global['db'][_0x116958(0xaa)]['settings'][botNumber]['autoread']&&conn['readMessages']([m[_0x116958(0xad)]]));
        
        // Push Message To Console && Auto Read
        if (m.message) {
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
        }
        
        let cron = require('node-cron')
        cron.schedule('00 12 * * *', () => {
            let user = Object.keys(global.db.data.users)
            let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
            for (let jid of user) global.db.data.users[jid].limit = limitUser
            console.log('Reseted Limit')
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })
        
	    if (db.data.settings[botNumber].autobio) {
	    let setting = global.db.data.settings[botNumber]
	    if (new Date() * 1 - setting.status > 1000) {
		let _uptime = process.uptime() * 1000
		let uptime = clockString(_uptime)
		await conn.updateProfileStatus(`I am ${namabot} | Aktif Selama ${uptime} ⏳ | Mode : ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'} | User : ${Object.keys(global.db.data.users).length} 👥| Jangan Telp Bot 📞 | © Created Bimatio`).catch(_ => _)
		setting.status = new Date() * 1
	    }
	    }
	
        // Respon Cmd with media
        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
        let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
        let { text, mentionedJid } = hash
        let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
            userJid: conn.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        conn.ev.emit('messages.upsert', msg)
        }
        
        if (db.data.chats[m.chat].antilink) {
            if (budy.match(`chat.whatsapp.com`)) {
                newReply(`「 ANTI LINK WHATSAPP 」\n\nKamu Terdeteksi Mengirim Link Group, Maaf Kamu Akan Di Kick !`)
                if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`)
                let gclink = (`https://chat.whatsapp.com/` + await conn.groupInviteCode(m.chat))
                let isLinkThisGc = new RegExp(gclink, 'i')
                let isgclink = isLinkThisGc.test(m.text)
                if (isgclink) return newReply(`Ehh Maaf Gak Jadi, Link Group Ini Ternyata 😆`)
                if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`)
                if (isCreator) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
                conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }
        }
        //Anti Link YouTube
        if (db.data.chats[m.chat].antilinkyt) {
            if (budy.match(`https://youtu.be`)) {
                newReply(`「 ANTI LINK YOUTUBE 」\n\nKamu Terdeteksi Mengirim Link Youtube, Maaf Kamu Akan Di Kick !`)
                if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`)
                if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`)
                if (isCreator) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
                conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }
        }
        //Anti Link Tiktok
        if (db.data.chats[m.chat].antilinktt) {
            if (budy.match(`https://vt.tiktok.com`)) {
                newReply(`「 ANTI LINK TIKTOK 」\n\nKamu Terdeteksi Mengirim Link TikTok, Maaf Kamu Akan Di Kick !`)
                if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`)
                if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`)
                if (isCreator) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
                conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }
        }
        //AntiVirtex
        if (db.data.chats[m.chat].antivirtex) {
            if (budy.length > 3500) {
                newReply(`Seseorang mengirim spam virus!! tandai sebagai membaca⚠️\n`.repeat(300))
                newReply(`「 ANTI VIRTEX 」\n\nKamu Terdeteksi Mengirim Virtex, Maaf Kamu Akan Di Kick !`)
                if (!isBotAdmins) return newReply(`Ehh Bot Gak Admin T_T`)
                if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`)
                if (isCreator) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
                conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }
        }
        // Mute Chat
        if (db.data.chats[m.chat].mute && !isAdmins && !isCreator) {
            return
        }
        switch (command) {
        
        // Owner Fitur
        case 'public': {
                if (!isCreator) return newReply(mess.owner)
                conn.public = true
                newReply('Sukses Ubah Ke Penggunaan Umum')
        }
        break
        case 'self': {
                if (!isCreator) return newReply(mess.owner)
                conn.public = false
                newReply('Sukses Ubah Ke Penggunaan Sendiri')
            }
        break
        
        case 'dellist':{
            function _0x4537(_0x233404, _0x7f2252) {
            var _0x35cd9a = _0x246c();
            return _0x4537 = function (_0x1afa47, _0x3608c1) {
                _0x1afa47 = _0x1afa47 - (-0xf7 + -0x3 * -0x8bf + -0x175a);
                var _0x2f55bb = _0x35cd9a[_0x1afa47];
                return _0x2f55bb;
            }, _0x4537(_0x233404, _0x7f2252);
            }
            var _0x1ecddc = _0x4537;
            (function (_0x9e366, _0x13b6b0) {
                var _0x2ef239 = _0x4537, _0x4ace76 = _0x9e366();
                while (!![]) {
                    try {
                        var _0xd7b576 = -parseInt(_0x2ef239(0x1fc)) / (-0x72e * 0x2 + -0x275 * 0x1 + 0x10d2) * (parseInt(_0x2ef239(0x1f7)) / (0x824 + -0x10a3 * -0x1 + 0x18c5 * -0x1)) + parseInt(_0x2ef239(0x1f1)) / (0x1bba + -0x1018 + 0xb9f * -0x1) * (-parseInt(_0x2ef239(0x1fb)) / (0x84e + 0x1 * -0x1369 + -0x49 * -0x27)) + -parseInt(_0x2ef239(0x1ed)) / (0x296 + -0x2 * -0x2ef + -0x86f) * (-parseInt(_0x2ef239(0x1f8)) / (-0xed9 + -0xf * 0x253 + 0x31bc)) + parseInt(_0x2ef239(0x1f6)) / (-0x4 * 0x426 + -0x2468 + -0xb5 * -0x4b) * (parseInt(_0x2ef239(0x202)) / (0x4da + 0x1 * -0x74b + 0x279 * 0x1)) + -parseInt(_0x2ef239(0x1ec)) / (-0x1c7f + 0x1 * 0x493 + 0x17f5) * (-parseInt(_0x2ef239(0x204)) / (-0x1944 + 0x1f7 * 0xe + -0x234)) + -parseInt(_0x2ef239(0x1fa)) / (0x25e4 + -0x14f * 0x2 + -0x137 * 0x1d) * (-parseInt(_0x2ef239(0x1ff)) / (-0x75 * -0x39 + -0x39 * -0x3d + -0x2796)) + -parseInt(_0x2ef239(0x1ef)) / (-0x26f + -0x22ed + 0x2569 * 0x1) * (parseInt(_0x2ef239(0x206)) / (-0x1047 * 0x1 + 0x19dd + -0x4 * 0x262));
                        if (_0xd7b576 === _0x13b6b0)
                            break;
                        else
                            _0x4ace76['push'](_0x4ace76['shift']());
                    } catch (_0x1009b0) {
                        _0x4ace76['push'](_0x4ace76['shift']());
                    }
                }
                }(_0x246c, 0x36725 + -0x3 * 0x1fe47 + -0x125 * -0x5ab));
                if (!m[_0x1ecddc(0x200)])
                    return newReply(mess[_0x1ecddc(0x1f0)]);
                function _0x246c() {
                    var _0x300e8c = [
                        '2050oDAmwE',
                        '\x20Yang\x20Mana',
                        '9242646DuFXDQ',
                        '10089xIavbY',
                        '16715ozsRiS',
                        'botAdmin',
                        '13NdcbMj',
                        'group',
                        '259887vybgIN',
                        'Mau\x20Delete',
                        'ge\x20di\x20data',
                        '?\x0a\x0a',
                        'Belum\x20ada\x20',
                        '1668149RsTVKp',
                        '44pjLIZV',
                        '54hHmali',
                        'list\x20messa',
                        '5145899IlcriZ',
                        '4kWxUUf',
                        '9147TIoEuw',
                        'chat',
                        'length',
                        '12ITHfMO',
                        'isGroup',
                        'base',
                        '16cyehMQ',
                        'key'
                    ];
                    _0x246c = function () {
                        return _0x300e8c;
                    };
                    return _0x246c();
                }
                if (!isAdmins && !isCreator)
                    return newReply(mess[_0x1ecddc(0x1ee)]);
                if (db_respon_list[_0x1ecddc(0x1fe)] === 0x1adf + 0x2b * 0x19 + -0x1f12)
                    return newReply(_0x1ecddc(0x1f5) + _0x1ecddc(0x1f9) + _0x1ecddc(0x1f3) + _0x1ecddc(0x201));
                var arr_rows = [];
                for (let x of db_respon_list) {
                    x['id'] === m[_0x1ecddc(0x1fd)] && newReply(_0x1ecddc(0x1f2) + _0x1ecddc(0x205) + _0x1ecddc(0x1f4) + x[_0x1ecddc(0x203)]);
                }
                        }
        break

        case 'addlimit':
            function _0x3b86(_0x4937b5, _0x28bc90) {
            var _0x41194b = _0x5386();
            return _0x3b86 = function (_0x1d4cdc, _0x2bcd06) {
                _0x1d4cdc = _0x1d4cdc - (0x2 * 0x4be + 0x1e62 + -0x2687);
                var _0x201f8f = _0x41194b[_0x1d4cdc];
                return _0x201f8f;
            }, _0x3b86(_0x4937b5, _0x28bc90);
            }
            var _0x183f42 = _0x3b86;
            (function (_0x590665, _0x4b5f13) {
                var _0x51b092 = _0x3b86, _0x140426 = _0x590665();
                while (!![]) {
                    try {
                        var _0x1a987c = -parseInt(_0x51b092(0x15d)) / (0x102e * 0x1 + 0x22b9 * -0x1 + 0x128c) + parseInt(_0x51b092(0x15f)) / (-0x14b * 0xd + -0x1397 + 0x48d * 0x8) + parseInt(_0x51b092(0x16c)) / (0x8fd + -0xfe3 + 0x1d * 0x3d) + parseInt(_0x51b092(0x15b)) / (0x5 * 0x103 + 0x26ed + 0xe * -0x324) * (parseInt(_0x51b092(0x157)) / (-0x1b * -0x7d + 0x2 * 0xcf9 + 0x138e * -0x2)) + -parseInt(_0x51b092(0x164)) / (-0xaca * 0x2 + 0x46 * -0x85 + 0x848 * 0x7) + parseInt(_0x51b092(0x165)) / (-0xdfe + -0x386 * 0xb + 0xe5 * 0x3b) + -parseInt(_0x51b092(0x167)) / (-0x1668 + -0x1832 + 0x2ea2) * (-parseInt(_0x51b092(0x158)) / (-0x2179 + 0x405 + -0x1 * -0x1d7d));
                        if (_0x1a987c === _0x4b5f13)
                            break;
                        else
                            _0x140426['push'](_0x140426['shift']());
                    } catch (_0x16053b) {
                        _0x140426['push'](_0x140426['shift']());
                    }
                }
            }(_0x5386, 0x29 * 0x4a7 + 0x2b * 0x2276 + 0x1340f));
            if (!isCreator)
                return newReply(mess[_0x183f42(0x166)]);
            if (!q)
                return newReply(_0x183f42(0x160) + (prefix + command) + (_0x183f42(0x15e) + _0x183f42(0x16b)));
            nomernya = text[_0x183f42(0x15c)]('|')[-0xa3 * 0x5 + -0xcc1 + 0xff0] ? text[_0x183f42(0x15c)]('|')[-0x13 * -0x143 + 0x16 + -0x180f] : '-', limitnya = text[_0x183f42(0x15c)]('|')[-0xe09 + 0x1f22 + -0x1118] ? text[_0x183f42(0x15c)]('|')[0x208b + 0xa8e + -0x8 * 0x563] : '-', db[_0x183f42(0x162)][_0x183f42(0x15a)]['' + nomernya][_0x183f42(0x16a)] += '' + limitnya, newReply(_0x183f42(0x168) + nomernya + (_0x183f42(0x159) + _0x183f42(0x161) + _0x183f42(0x169) + _0x183f42(0x163)) + limitnya);
            function _0x5386() {
                var _0x196156 = [
                    'split',
                    '847776wPVfTs',
                    '\x20628951308',
                    '240414McVLOj',
                    'Example\x20',
                    'Tambahkan\x20',
                    'data',
                    'nyak\x20',
                    '5079432ZNSxnM',
                    '1184932EhJhPG',
                    'owner',
                    '8gDYwHF',
                    'Nomor\x20',
                    'Limit\x20Seba',
                    'limit',
                    '1052|100',
                    '1047879uEvFqI',
                    '65EBPwkE',
                    '5983137tYFbqN',
                    '\x20Telah\x20Di\x20',
                    'users',
                    '276252lbwdch'
                ];
                _0x5386 = function () {
                    return _0x196156;
                };
                return _0x5386();
            }
        break

        case 'dellimit':
            var _0x3cddf3 = _0x3a0d;
                (function (_0x1457a9, _0x13749b) {
                    var _0x4d930e = _0x3a0d, _0x2430dc = _0x1457a9();
                    while (!![]) {
                        try {
                            var _0x4d8185 = parseInt(_0x4d930e(0x7b)) / (0x4b6 + -0x11b0 + 0xcfb) + -parseInt(_0x4d930e(0x77)) / (-0x1159 + -0x244a + 0x35a5) * (parseInt(_0x4d930e(0x8d)) / (0x339 + 0x2069 + -0x239f * 0x1)) + -parseInt(_0x4d930e(0x81)) / (-0x17e * -0x8 + -0xdc * 0x7 + -0x5e8) + -parseInt(_0x4d930e(0x87)) / (-0x1 * -0x234d + 0x236 * -0x6 + 0x2 * -0xb02) * (-parseInt(_0x4d930e(0x83)) / (0x24a + 0x1998 + -0x1bdc)) + -parseInt(_0x4d930e(0x78)) / (-0x67 * 0xa + -0xce0 + 0x10ed) + parseInt(_0x4d930e(0x86)) / (-0x95b + 0x1faa + -0x3 * 0x76d) + parseInt(_0x4d930e(0x82)) / (0x9d * -0xb + 0x1fce + -0x2 * 0xc83) * (-parseInt(_0x4d930e(0x7c)) / (-0x13d7 + 0x2 * 0x82 + -0x1b7 * -0xb));
                            if (_0x4d8185 === _0x13749b)
                                break;
                            else
                                _0x2430dc['push'](_0x2430dc['shift']());
                        } catch (_0x40210f) {
                            _0x2430dc['push'](_0x2430dc['shift']());
                        }
                    }
                        }(_0x1647, 0xc8afb + 0x1a3 * -0x2fc + -0x7af3));
                        if (!isCreator)
                            return newReply(mess[_0x3cddf3(0x8b)]);
                        function _0x3a0d(_0x5c2672, _0x54b03a) {
                            var _0x10ef68 = _0x1647();
                            return _0x3a0d = function (_0x8c3e69, _0x2d1a85) {
                                _0x8c3e69 = _0x8c3e69 - (0x6d7 + 0xcc4 * -0x2 + -0x1328 * -0x1);
                                var _0x4f154c = _0x10ef68[_0x8c3e69];
                                return _0x4f154c;
                            }, _0x3a0d(_0x5c2672, _0x54b03a);
                        }
                        if (!q)
                            return newReply(_0x3cddf3(0x7f) + (prefix + command) + (_0x3cddf3(0x84) + _0x3cddf3(0x7d)));
                        function _0x1647() {
                            var _0x5ee171 = [
                                'limit',
                                '7111856NVgUxL',
                                '1534935WINKlw',
                                'Kurangkan\x20',
                                'Limit\x20Seba',
                                'split',
                                'owner',
                                'Nomor\x20',
                                '1953lsEFio',
                                '120XiSsIR',
                                '6159965nhrpuq',
                                'users',
                                'data',
                                '866771dBAUtf',
                                '20FfrjzW',
                                '1052|100',
                                '\x20Telah\x20Di\x20',
                                'Example\x20',
                                'nyak\x20',
                                '2680492eQdOAc',
                                '2777022ZNMioh',
                                '18JnVctU',
                                '\x20628951308'
                            ];
                            _0x1647 = function () {
                                return _0x5ee171;
                            };
                            return _0x1647();
                        }
                        nomernya = text[_0x3cddf3(0x8a)]('|')[-0xd * 0x274 + 0x1 * -0x21e + 0x2202] ? text[_0x3cddf3(0x8a)]('|')[-0x35 * 0x79 + -0x20d3 + 0x39e0] : '-', limitnya = text[_0x3cddf3(0x8a)]('|')[-0x2705 + -0x5 * 0x271 + 0x333b] ? text[_0x3cddf3(0x8a)]('|')[-0x1c * -0x61 + -0x14e5 + 0xa4a] : '-', db[_0x3cddf3(0x7a)][_0x3cddf3(0x79)]['' + nomernya][_0x3cddf3(0x85)] -= '' + limitnya, newReply(_0x3cddf3(0x8c) + nomernya + (_0x3cddf3(0x7e) + _0x3cddf3(0x88) + _0x3cddf3(0x89) + _0x3cddf3(0x80)) + limitnya);
                                break
                                case 'enc': {
                                    if (!isCreator) return newReply(mess.owner)
                                    if (!q) return newReply(`Contoh ${prefix+command} const bbot = require('bbot-api')`)
                                    let meg = await obfus(q)
                                    newReply(`${meg.result}`)
                                }
        break

        case 'addprem':
            if (!isCreator) return newReply(mess.owner)
            if (!args[0]) return newReply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281214281312`)
            bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
            let ceknye = await conn.onWhatsApp(bnnd + `@s.whatsapp.net`)
            if (ceknye.length == 0) return newReply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
            premium.push(bnnd)
            fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
            newReply(`Nomor ${bnnd} Telah Sudah Premium!!!`)
        break
        
        case 'delprem':
            if (!isCreator) return newReply(mess.owner)
            if (!args[0]) return newReply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281214281312`)
            yaki = q.split("|")[0].replace(/[^0-9]/g, '')
            unp = premium.indexOf(yaki)
            premium.splice(unp, 1)
            fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
            newReply(`Nomor ${yaki} Telah Di Hapus Dari Premium!!!`)
        break
        
        case 'listprem':
            teksooo = '*List Premium*\n\n'
            for (let i of premium) {
                teksooo += `- ${i}\n`
            }
            teksooo += `\n*Total : ${premium.length}*`
            conn.sendMessage(m.chat, { text: teksooo.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": premium } })
        break
        
        case 'addblock':
            if (!isCreator) return newReply(mess.owner)
            if (!args[0]) return newReply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281214281312`)
            bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
            let bannednya = await conn.onWhatsApp(bnnd + `@s.whatsapp.net`)
            if (bannednya.length == 0) return newReply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
            banned.push(bnnd)
            fs.writeFileSync('./database/banned.json', JSON.stringify(banned))
            newReply(`Nomor ${bnnd} Telah Sudah banned!!!`)
        break
        
        case 'delblock':
            if (!isCreator) return newReply(mess.owner)
            if (!args[0]) return newReply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281214281312`)
            yaki = q.split("|")[0].replace(/[^0-9]/g, '')
            unp = banned.indexOf(yaki)
            banned.splice(unp, 1)
            fs.writeFileSync('./database/banned.json', JSON.stringify(banned))
            newReply(`Nomor ${yaki} Telah Di Hapus Dari banned!!!`)
        break
        
        case 'listblock':
            teksooo = '*List banned*\n\n'
            for (let i of banned) {
                teksooo += `- ${i}\n`
            }
            teksooo += `\n*Total : ${banned.length}*`
            conn.sendMessage(m.chat, { text: teksooo.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": banned } })
        break
       
        case 'myip': {
        if (!isCreator) return newReply(mess.owner)
                var http = require('http')
                http.get({
                    'host': 'api.ipify.org',
                    'port': 80,
                    'path': '/'
                }, function(resp) {
                    resp.on('data', function(ip) {
                        newReply("🔎 My public IP address is: " + ip);
                    })
                })
            }
        break
        case 'react': {
                if (!isCreator) return newReply(mess.owner)
                reactionMessage = {
                    react: {
                        text: args[0],
                        key: { remoteJid: m.chat, fromMe: true, id: quoted.id }
                    }
                }
                conn.sendMessage(m.chat, reactionMessage)
            }
        break
        case 'shutdown': {
             if (!isCreator) return newReply(mess.owner)
			 newReply(`Otsukaresama deshita🖐`)
             await sleep(3000)
             process.exit()
             }
        break
        case 'join': {
                if (!isCreator) return newReply(mess.owner)
                if (!text) return 'Masukkan Link Group!'
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return 'Link Invalid!'
                newReply(mess.wait)
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await conn.groupAcceptInvite(result).then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
        }
        break
        case 'leave': {
                if (!isCreator) return newReply(mess.owner)
                await conn.groupLeave(m.chat).then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
        }
        break

        case 'setpp':
        case 'setpp':
        case 'setppbot': {
            var _0x481223 = _0x328b;
(function (_0xe9515c, _0x1a6733) {
    var _0x5179e4 = _0x328b, _0x2587c4 = _0xe9515c();
    while (!![]) {
        try {
            var _0xb17963 = -parseInt(_0x5179e4(0x9d)) / (0x2 * -0x1091 + -0x108e + 0x31b1 * 0x1) * (parseInt(_0x5179e4(0x88)) / (-0x1175 + 0x1 * 0x23ca + -0x1253)) + -parseInt(_0x5179e4(0x7f)) / (-0x211e + -0x2656 * -0x1 + -0x535) + parseInt(_0x5179e4(0x9a)) / (0x1ae3 + -0x1d8f + 0x2b0 * 0x1) * (-parseInt(_0x5179e4(0x8f)) / (-0x3 * -0x98f + 0x1403 + -0x30ab)) + -parseInt(_0x5179e4(0x86)) / (0x946 + -0x3 * -0xb1 + 0xd * -0xdf) * (parseInt(_0x5179e4(0x8c)) / (0x1159 + 0x114 * -0x1d + -0xa * -0x165)) + -parseInt(_0x5179e4(0x91)) / (0x92d * -0x3 + 0x57 + 0x4 * 0x6ce) * (parseInt(_0x5179e4(0x82)) / (-0x472 * -0x6 + 0x1 * -0x173a + 0x3 * -0x123)) + -parseInt(_0x5179e4(0x8b)) / (-0xdd * 0x4 + -0x1be0 + 0x1f5e) * (parseInt(_0x5179e4(0x99)) / (0x47 + -0x17 * -0x13d + -0x1cb7)) + -parseInt(_0x5179e4(0x89)) / (-0x10bf + -0x1c64 + 0x2d2f) * (-parseInt(_0x5179e4(0x84)) / (0x1627 * -0x1 + -0x196d + 0x2fa1));
            if (_0xb17963 === _0x1a6733)
                break;
            else
                _0x2587c4['push'](_0x2587c4['shift']());
        } catch (_0x549ae9) {
            _0x2587c4['push'](_0x2587c4['shift']());
        }
    }
}(_0x12ab, -0x8ad00 + -0x3 * 0xf2be + 0x137602));
if (!isCreator)
    return newReply(mess[_0x481223(0x7d)]);
if (!quoted)
    return reply(_0x481223(0x97) + _0x481223(0x95) + _0x481223(0x7c) + _0x481223(0x90) + (prefix + command));
if (!/image/[_0x481223(0x9b)](mime))
    return reply(_0x481223(0x97) + _0x481223(0x95) + _0x481223(0x7c) + _0x481223(0x90) + (prefix + command));
function _0x328b(_0x1d5539, _0x482fd3) {
    var _0x2aab33 = _0x12ab();
    return _0x328b = function (_0x302765, _0x9f848e) {
        _0x302765 = _0x302765 - (-0x1740 + 0x1 * 0x19e1 + -0x225);
        var _0x19b86b = _0x2aab33[_0x302765];
        return _0x19b86b;
    }, _0x328b(_0x1d5539, _0x482fd3);
}
function _0x12ab() {
    var _0x3b6266 = [
        '/full',
        '31362Glnucl',
        'ilePicture',
        '12tiLwPG',
        '960uFqmWc',
        'unlinkSync',
        '2980fYVETZ',
        '413RYLuJM',
        'ppbot.jpeg',
        'Sukses',
        '25pbHOUw',
        'on\x20',
        '8Dyjman',
        'Message',
        'picture',
        'dSaveMedia',
        'y\x20Image\x20De',
        'updateProf',
        'Kirim/Repl',
        'success',
        '12001GLfQSM',
        '53032acShOW',
        'test',
        'downloadAn',
        '120843lCOpcn',
        'ngan\x20Capti',
        'owner',
        'set',
        '2950887mHyeNL',
        'w:profile:',
        'query',
        '4766400kHcDLK',
        'image',
        '562003BwikmQ'
    ];
    _0x12ab = function () {
        return _0x3b6266;
    };
    return _0x12ab();
}
if (/webp/[_0x481223(0x9b)](mime))
    return reply(_0x481223(0x97) + _0x481223(0x95) + _0x481223(0x7c) + _0x481223(0x90) + (prefix + command));
var medis = await conn[_0x481223(0x9c) + _0x481223(0x94) + _0x481223(0x92)](quoted, _0x481223(0x8d));
if (args[-0xa * 0x118 + 0x9 * -0x3c3 + 0x2ccb] == _0x481223(0x85)) {
    var {img} = await generateProfilePicture(medis);
    await conn[_0x481223(0x81)]({
        'tag': 'iq',
        'attrs': {
            'to': botNumber,
            'type': _0x481223(0x7e),
            'xmlns': _0x481223(0x80) + _0x481223(0x93)
        },
        'content': [{
                'tag': _0x481223(0x93),
                'attrs': { 'type': _0x481223(0x83) },
                'content': img
            }]
    }), fs[_0x481223(0x8a)](medis), reply(mess[_0x481223(0x98)]);
} else {
    var memeg = await conn[_0x481223(0x96) + _0x481223(0x87)](botNumber, { 'url': medis });
    fs[_0x481223(0x8a)](medis), newReply(_0x481223(0x8e));
}
            }
        break
        
        // Created By Agus
        case 'autoread':
            if (!isCreator) return newReply(mess.owner)
            if (args.length < 1) return newReply(`Contoh ${prefix + command} on/off`)
            if (q === 'on'){
            autoread = false
            newReply(`Berhasil mengubah autoread ke ${q}`)
            } else if (q === 'off'){
            autoread = true
            newReply(`Berhasil mengubah autoread ke ${q}`)
            }
        break
        
        // Main Menu
        case 'speedtest': {
                newReply('Testing Speed...')
                let cp = require('child_process')
                let {
                    promisify
                } = require('util')
                let exec = promisify(cp.exec).bind(cp)
                let o
                try {
                    o = await exec('python speed.py')
                } catch (e) {
                    o = e
                } finally {
                    let {
                        stdout,
                        stderr
                    } = o
                    if (stdout.trim()) newReply(stdout)
                    if (stderr.trim()) newReply(stderr)
                }
            }
        break
        case 'owner': 
        case 'creator': {
                conn.sendContact(m.chat, global.owner, m)
               }
        break
        case 'runtime':
            	newReply(`*Bot Telah Online Selama*\n*${runtime(process.uptime())}*`)
        break
        
        
        // Group Fitur
            case 'kick': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await conn.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
            }
            break
            case 'add': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await conn.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
            }
            break
            case 'culik': {
                if (args.length < 1) return newReply('_*Masukin id grupnya tolol*_')
                let pantek = []
                for (let i of groupMembers) {
                    pantek.push(i.jid)
                }
                conn.groupParticipantsUpdate(args[0], pantek)
            }
            break
            case 'promote': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await conn.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
            }
            break
            case 'demote': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await conn.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
            }
            break
            case 'block': {
                if (!isCreator) return newReply(mess.owner)
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await conn.updateBlockStatus(users, 'block').then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
            }
            break
            case 'unblock': {
                if (!isCreator) return newReply(mess.owner)
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                await conn.updateBlockStatus(users, 'unblock').then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
            }
            break
            case 'setname':
            case 'setsubject': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (!text) return 'Text ?'
                await conn.groupUpdateSubject(m.chat, text).then((res) => newReply(mess.success)).catch((err) => newReply(jsonformat(err)))
            }
            break
            case 'setdesc':
            case 'setdesk': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (!text) return 'Text ?'
                await conn.groupUpdateDescription(m.chat, text).then((res) => newReply(mess.success)).catch((err) => newReply(jsonformat(err)))
            }
            break
            case 'setppgroup':
            case 'setppgrup':
            case 'setppgc': {
                var _0x1d8fd1 = _0x2525;
function _0x117a() {
    var _0x5c09ba = [
        '20xGhMme',
        'set',
        '1510776rtjWlH',
        'w:profile:',
        'query',
        'admin',
        'isGroup',
        'chat',
        'Kirim/Repl',
        '/panjang',
        'on\x20',
        '1551222uzOBFt',
        'downloadAn',
        '1018557FTsDiz',
        '8cYgAHE',
        'unlinkSync',
        'ppgc.jpeg',
        '2316454EQehUY',
        'ngan\x20Capti',
        '30ZhDeZU',
        '482574OAnfTx',
        'image',
        'updateProf',
        'group',
        'botAdmin',
        'dSaveMedia',
        'test',
        'Message',
        '707082ObeoPG',
        'picture',
        'Sukses',
        'ilePicture',
        'y\x20Image\x20De',
        '281584npNwvs'
    ];
    _0x117a = function () {
        return _0x5c09ba;
    };
    return _0x117a();
}
(function (_0x406473, _0x201520) {
    var _0x53f8b1 = _0x2525, _0x4023b3 = _0x406473();
    while (!![]) {
        try {
            var _0x2f1656 = parseInt(_0x53f8b1(0xda)) / (-0x1 * -0x1682 + 0x2595 + -0x3c16) + -parseInt(_0x53f8b1(0xe2)) / (-0x2633 + -0x16bf * -0x1 + -0x2 * -0x7bb) + -parseInt(_0x53f8b1(0xc8)) / (0x16bd + -0x1e49 * 0x1 + 0x78f) + -parseInt(_0x53f8b1(0xc5)) / (0x7ca + -0x493 * 0x1 + -0x333) * (parseInt(_0x53f8b1(0xc6)) / (0x85 * -0x2b + -0x10 * -0x21a + 0xe * -0xce)) + parseInt(_0x53f8b1(0xd1)) / (0x9d * -0x11 + -0xcf2 * -0x1 + -0x27f * 0x1) + parseInt(_0x53f8b1(0xd7)) / (-0x688 + -0x1 * 0x18bc + 0x1f4b) * (parseInt(_0x53f8b1(0xd4)) / (-0x17 * 0xdf + -0xdca + 0x3c3 * 0x9)) + -parseInt(_0x53f8b1(0xd3)) / (0x2b * 0x33 + -0x7 * 0x11b + -0xcb) * (-parseInt(_0x53f8b1(0xd9)) / (0x11cc + -0x2041 + 0x1 * 0xe7f));
            if (_0x2f1656 === _0x201520)
                break;
            else
                _0x4023b3['push'](_0x4023b3['shift']());
        } catch (_0x324f1f) {
            _0x4023b3['push'](_0x4023b3['shift']());
        }
    }
}(_0x117a, -0x40e92 + 0x18b91 + 0x6acc4));
if (!m[_0x1d8fd1(0xcc)])
    return reply(mess[_0x1d8fd1(0xdd)]);
if (!isAdmins)
    return reply(mess[_0x1d8fd1(0xcb)]);
if (!isBotAdmins)
    return reply(mess[_0x1d8fd1(0xde)]);
if (!quoted)
    return reply(_0x1d8fd1(0xce) + _0x1d8fd1(0xc4) + _0x1d8fd1(0xd8) + _0x1d8fd1(0xd0) + (prefix + command));
function _0x2525(_0x3b9b78, _0x30f41b) {
    var _0x41a687 = _0x117a();
    return _0x2525 = function (_0xebb7b5, _0x3e8326) {
        _0xebb7b5 = _0xebb7b5 - (-0x244e + -0x1d6e + 0x427f);
        var _0x436880 = _0x41a687[_0xebb7b5];
        return _0x436880;
    }, _0x2525(_0x3b9b78, _0x30f41b);
}
if (!/image/[_0x1d8fd1(0xe0)](mime))
    return reply(_0x1d8fd1(0xce) + _0x1d8fd1(0xc4) + _0x1d8fd1(0xd8) + _0x1d8fd1(0xd0) + (prefix + command));
if (/webp/[_0x1d8fd1(0xe0)](mime))
    return reply(_0x1d8fd1(0xce) + _0x1d8fd1(0xc4) + _0x1d8fd1(0xd8) + _0x1d8fd1(0xd0) + (prefix + command));
var mediz = await conn[_0x1d8fd1(0xd2) + _0x1d8fd1(0xdf) + _0x1d8fd1(0xe1)](quoted, _0x1d8fd1(0xd6));
if (args[0xf06 * 0x2 + -0x1 * -0x1707 + -0x3513] == _0x1d8fd1(0xcf)) {
    var {img} = await generateProfilePicture(mediz);
    await conn[_0x1d8fd1(0xca)]({
        'tag': 'iq',
        'attrs': {
            'to': m[_0x1d8fd1(0xcd)],
            'type': _0x1d8fd1(0xc7),
            'xmlns': _0x1d8fd1(0xc9) + _0x1d8fd1(0xe3)
        },
        'content': [{
                'tag': _0x1d8fd1(0xe3),
                'attrs': { 'type': _0x1d8fd1(0xdb) },
                'content': img
            }]
    }), fs[_0x1d8fd1(0xd5)](mediz), reply(_0x1d8fd1(0xe4));
} else {
    var memeg = await conn[_0x1d8fd1(0xdc) + _0x1d8fd1(0xc3)](m[_0x1d8fd1(0xcd)], { 'url': mediz });
    fs[_0x1d8fd1(0xd5)](mediz), reply(_0x1d8fd1(0xe4));
}
            }
            break
            case 'tagall': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let teks = `*👥 Tag All By Admin*
 
                 🗞️ *Pesan : ${q ? q : 'kosong'}*\n\n`
                for (let mem of participants) {
                    teks += `• @${mem.id.split('@')[0]}\n`
                }
                conn.sendMessage(m.chat, {
                    text: teks,
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
            }
            break
            case 'hidetag': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                conn.sendMessage(m.chat, {
                    text: q ? q : '',
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                })
            }
            break
            case 'totag': {
               if (!m.isGroup) return newReply(mess.group)
               if (!isBotAdmins) return mess.botAdmin
               if (!isAdmins) return mess.admin
               if (!m.quoted) return `Reply pesan dengan caption ${prefix + command}`
               conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) })
               }
               break
            case 'antilink': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (args[0] === "on") {
                    if (db.data.chats[m.chat].antilink) return newReply(`Sudah Aktif Sebelumnya 🕊️`)
                    db.data.chats[m.chat].antilink = true
                    newReply(`Antilink Group WhatsApp Aktif 🕊️`)
                } else if (args[0] === "off") {
                    if (!db.data.chats[m.chat].antilink) return newReply(`Sudah Nonaktif Sebelumnya 🕊`)
                    db.data.chats[m.chat].antilink = false
                    newReply(`Antilink Group WhatsApp Nonaktif 🕊️`)
                } else {
                    newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`)
                }
            }
            break
            case 'antilinkyt': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (args[0] === "on") {
                    if (db.data.chats[m.chat].antilinkyt) return newReply(`Sudah Aktif Sebelumnya 🕊`)
                    db.data.chats[m.chat].antilinkyt = true
                    newReply(`Antilink YouTube Aktif 🕊️`)
                } else if (args[0] === "off") {
                    if (!db.data.chats[m.chat].antilinkyt) return newReply(`Sudah Nonaktif Sebelumnya 🕊`)
                    db.data.chats[m.chat].antilinkyt = false
                    newReply(`Antilink YouTube Nonaktif 🕊️`)
                } else {
                    newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`)
                }
            }
            break
            case 'antilinktt': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (args[0] === "on") {
                    if (db.data.chats[m.chat].antilinktt) return newReply(`Sudah Aktif Sebelumnya 🕊`)
                    db.data.chats[m.chat].antilinktt = true
                    newReply(`Antilink TikTok Aktif 🕊️`)
                } else if (args[0] === "off") {
                    if (!db.data.chats[m.chat].antilinktt) return newReply(`Sudah Nonaktif Sebelumnya 🕊`)
                    db.data.chats[m.chat].antilinktt = false
                    newReply(`Antilink TikTok Nonaktif 🕊️`)
                } else {
                    newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`)
                }
            }
            break
            case 'mutegc': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (args[0] === "on") {
                    if (db.data.chats[m.chat].mute) return newReply(`Sudah Aktif Sebelumnya 🕊`)
                    db.data.chats[m.chat].mute = true
                    newReply(`${ntiktok} telah di mute di group ini 🕊️`)
                } else if (args[0] === "off") {
                    if (!db.data.chats[m.chat].mute) return newReply(`Sudah Tidak Aktif Sebelumnya 🕊`)
                    db.data.chats[m.chat].mute = false
                    newReply(`${ntiktok} telah di unmute di group ini 🕊️`)
                } else {
                   newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`)
                }
            }
            break
            case 'ephemeral': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (args[0] === '1') {
                    await conn.groupToggleEphemeral(m.chat, 1*24*3600).then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
                } else if (args[0] === '7') {
                    await conn.groupToggleEphemeral(m.chat, 7*24*3600).then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
                } else if (args[0] === '90') {
                    await conn.groupToggleEphemeral(m.chat, 90*24*3600).then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
                } else if (args[0] === 'off') {
                    await conn.groupToggleEphemeral(m.chat, 0).then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
                } else {
                let sections = [
                {
                title: "CHANGE EFFECTIVE GROUP",
                rows: [
                {title: "⌲ Ephemeral 1 day", rowId: `ephemeral 1`, description: `Activate the ephemeral group for 1 day`},
                {title: "⌲ Ephemeral 7 day's", rowId: `ephemeral 7`, description: `Activate the ephemeral group for 7 day's`},
                {title: "⌲ Ephemeral 90 days's", rowId: `ephemeral 90`, description: `Activate the ephemeral group for 90 day's`},
                {title: "⌲ Ephemeral Off", rowId: `ephemeral off`, description: `Deactivate this Ephemeral group`}
                ]
                },
                ]
                conn.sendListMsg(m.chat, `Please select the following Ephemeral Options List !`, ntiktok, `Hello Admin ${groupMetadata.subject}`, `Touch Me (⁠≧⁠▽⁠≦⁠)`, sections, m)
                }
            }
            break
            case 'bcgc': case 'bcgroup': {
                if (!isCreator) return newReply(mess.owner)
                if (!text) return `Text mana?\n\nContoh : ${prefix + command} Akame ><`
                let getGroups = await conn.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)
                newReply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`)
                for (let i of anu) {
                    await sleep(1500)
                      let txt = `「 Broadcast Bot 」\n\n${text}`
                    newReply(txt)
                }
                newReply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
            }
            break
            case 'bc': case 'broadcast': case 'bcall': {
                if (!isCreator) return newReply(mess.owner)
                if (!text) return `Text mana?\n\nContoh : ${prefix + command} Akame ><`
                let anu = await store.chats.all().map(v => v.id)
                newReply(`Mengirim Broadcast Ke ${anu.length} Chat\nWaktu Selesai ${anu.length * 1.5} detik`)
    		    for (let yoi of anu) {
    		            await sleep(1500)
    		            let txt = `「 Broadcast Bot 」\n\n${text}`
                        newReply(txt)
                    }
    		    newReply('Sukses Broadcast')
                }
            break
            case 'group':
            case 'grup': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return newReply(mess.admin)
                if (!isBotAdmins) return newReply(mess.botAdmin)
                if (args[0] === 'close') {
                    await conn.groupSettingUpdate(m.chat, 'announcement').then((res) => newReply(`Sukses Menutup Group 🕊️`)).catch((err) => newReply(jsonformat(err)))
                } else if (args[0] === 'open') {
                    await conn.groupSettingUpdate(m.chat, 'not_announcement').then((res) => newReply(`Sukses Membuka Group 🕊️`)).catch((err) => newReply(jsonformat(err)))
                } else {
                  newReply(`Mode ${command}\n\n\nKetik ${prefix + command}open/close`)
                }
            }
            break
            case 'editinfo': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                if (args[0] === 'open') {
                    await conn.groupSettingUpdate(m.chat, 'unlocked').then((res) => newReply(`Sukses Membuka Edit Info Group 🕊️`)).catch((err) => newReply(jsonformat(err)))
                } else if (args[0] === 'close') {
                    await conn.groupSettingUpdate(m.chat, 'locked').then((res) => newReply(`Sukses Menutup Edit Info Group 🕊️`)).catch((err) => newReply(jsonformat(err)))
                } else {
                    newReply(`Mode ${command}\n\n\nKetik ${prefix + command}on/off`)
                }
            }
            break
            case 'linkgroup':
            case 'linkgrup':
            case 'linkgc': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                let response = await conn.groupInviteCode(m.chat)
                conn.sendText(m.chat, `👥 *INFO LINK GROUP*\n📛 *Nama :* ${groupMetadata.subject}\n👤 *Owner Grup :* ${groupMetadata.owner !== undefined ? '@' + groupMetadata.owner.split`@`[0] : 'Tidak diketahui'}\n🌱 *ID :* ${groupMetadata.id}\n🔗 *Link Chat :* https://chat.whatsapp.com/${response}\n👥 *Member :* ${groupMetadata.participants.length}\n`, m,  {
                    detectLink: true
                })
            }
            break
            case 'revoke': {
                if (!m.isGroup) return newReply(mess.group)
                if (!isAdmins && !isGroupOwner && !isCreator) return mess.admin
                if (!isBotAdmins) return mess.botAdmin
                await conn.groupRevokeInvite(m.chat)
                    .then(res => {
                        newReply(`Sukses Menyetel Ulang, Tautan Undangan Grup ${groupMetadata.subject}`)
                    }).catch((err) => newReply(jsonformat(err)))
                    }
            break
            case 'listonline':
            case 'liston': {
                if (!m.isGroup) newReply(mess.group)
                let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                let online = [...Object.keys(store.presences[id]), botNumber]
                conn.sendText(m.chat, '⏰ List Online:\n\n' + online.map(v => '🌱 @' + v.replace(/@.+/, '')).join`\n`, m, {
                    mentions: online
                })
            }
            break
			// DOWNLOADER FITUR
			case 'ytmp3':
    			if (args.length == 0) return newReply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
    			newReply(mess.wait)
    			axios
    				.get(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${apikey}&url=${args[0]}`)
    				.then(({ data }) => {
    					var caption = `❖ Title    : *${data.result.title}*\n`
    					caption += `❖ Size     : *${data.result.size}*`
    					conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
    						conn.sendMessage(m.chat, { audio: { url: data.result.link }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3` })
    					})
    				})
    				.catch(console.error)
			break
			
		    case 'ytmp4':
    			if (args.length == 0) return newReply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
    			newReply(mess.wait)
    			axios
    				.get(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${apikey}&url=${args[0]}`)
    				.then(({ data }) => {
    					var caption = `❖ Title    : *${data.result.title}*\n`
    					caption += `❖ Size     : *${data.result.size}*`
    					conn.sendMessage(m.chat, { image: { url: data.result.thumbnail }, caption }).then(() => {
    						conn.sendMessage(m.chat, { video: { url: data.result.link }, mimetype: 'video/mp4', fileName: `${data.result.title}.mp4` })
    					})
    				})
    				.catch(console.error)
			break
			
			case 'tiktok': {
    			if (args.length == 0) return newReply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
    			newReply(mess.wait)
    			axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
    				conn.sendMessage(m.chat, { video: { url: data.result.link }, mimetype: 'video/mp4' })
    			})
    			
    			}
			break
			
			case 'tiktokaudio': {
    			if (args.length == 0) return newReply(`Example: ${prefix + command} https://vt.tiktok.com/ZSwWCk5o/`)
    			newReply(mess.wait)
    			conn.sendMessage(m.chat, { audio: { url: `https://api.lolhuman.xyz/api/tiktokmusic?apikey=${apikey}&url=${args[0]}` }, mimetype: 'audio/mp4', fileName: `${data.result.title}.mp3` })
    			
    			}
			break
			
			case 'igdl': {
    			if (args.length == 0) return newReply(`Example: ${prefix + command} https://www.instagram.com/p/CJ8XKFmJ4al/?igshid=1acpcqo44kgkn`)
    			newReply(mess.wait)
    			axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
    				var url = data.result[0]
    				if (url.includes('.mp4')) {
    					conn.sendMessage(m.chat, { video: { url }, mimetype: 'video/mp4' })
    				} else {
    					conn.sendMessage(m.chat, { image: { url } })
    				}
    			})
    			
                }
			break
			
			case 'twtdl': {
    			if (args.length == 0) return newReply(`Example: ${prefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`)
    			newReply(mess.wait)
    			axios.get(`https://api.lolhuman.xyz/api/twitter?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
    				conn.sendMessage(m.chat, { video: { url: data.result.link[data.result.link.length - 1].link }, mimetype: 'video/mp4' })
    			})
    			
    			}
			break
			
		    case 'fbdl': {
    			if (args.length == 0) return newReply(`Example: ${prefix + command} https://id-id.facebook.com/SamsungGulf/videos/video-bokeh/561108457758458/`)
    			newReply(mess.wait)
    			axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=${apikey}&url=${args[0]}`).then(({ data }) => {
    				conn.sendMessage(m.chat, { video: { url: data.result }, mimetype: 'video/mp4' })
    			})
    			
    			}
			break
			
			// Tools Fitur
            case 'hapus': 
            case 'delete': 
            case 'del': 
            case 'd': {
                if (!m.quoted) return false
                let { chat, fromMe, id, isBaileys } = m.quoted
                if (!isBaileys) return newReply('Pesan tersebut bukan dikirim oleh bot!')
                conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break
            
            case 'q':
            case 'quoted': {
                if (!m.quoted) return newReply('Reply Pesannya!!')
                let wokwol = await conn.serializeM(await m.getQuotedObj())
                if (!wokwol.quoted) return newReply('Pesan Yang Anda Reply Tidak Mengandung Reply')
                await wokwol.quoted.copyNForward(m.chat, true)
            }
            break
            
            case 'ebinary': {
                let {
                    eBinary
                } = require('./lib/binary')
                let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
                let eb = await eBinary(teks)
                newReply(eb)
            }
            break
            case 'dbinary': {
                let {
                    dBinary
                } = require('./lib/binary')
                let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
                let db = await dBinary(teks)
                newReply(db)
            }
            break
			
            // Information Fitur
            
            case 'google': {
                if (!text) return newReply(`Contoh : ${prefix + command} fatih arridho`)
                if (!isPremium && global.db.data.users[m.sender].limit < 1) return newReply(mess.endLimit) // respon ketika limit habis
                db.data.users[m.sender].limit -= 1 // -1 limit
                let google = require('google-it')
                google({'query': text}).then(res => {
                let teks = `Google Search From : ${text}\n\n`
                for (let g of res) {
                teks += `• *Title* : ${g.title}\n`
                teks += `• *Description* : ${g.snippet}\n`
                teks += `• *Link* : ${g.link}\n\n────────────────────────\n\n`
                } 
                newReply(teks)
                })
                }
            break

            case 'infochat': {
                if (!m.quoted) newReply('Reply Pesan')
                let msg = await m.getQuotedObj()
                if (!m.quoted.isBaileys) return newReply('Pesan tersebut bukan dikirim oleh bot!')
                let teks = ''
                for (let i of msg.userReceipt) {
                    let read = i.readTimestamp
                    let unread = i.receiptTimestamp
                    let waktu = read ? read : unread
                    teks += `👤 @${i.userJid.split('@')[0]}\n`
                    teks += `⏳ *Waktu :* ${moment(waktu * 1000).format('DD/MM/YY HH:mm:ss')}\n📈 *Status :* ${read ? 'Dibaca' : 'Terkirim'}\n\n`
                }
                newReply(teks)
            }
            break
			
		    case 'infogempa':
            case 'gempa':
    			var { data } = await axios.get(`https://api.lolhuman.xyz/api/infogempa?apikey=${apikey}`)
    			newReply(mess.wait)
    			var caption = `Lokasi : ${data.result.lokasi}\n`
    			caption += `Waktu : ${data.result.waktu}\n`
    			caption += `Potensi : ${data.result.potensi}\n`
    			caption += `Magnitude : ${data.result.magnitude}\n`
    			caption += `Kedalaman : ${data.result.kedalaman}\n`
    			caption += `Koordinat : ${data.result.koordinat}`
    			conn.sendMessage(m.chat, { image: { url: data.result.map }, caption })
    			break
			
			// CONVERT FITUR
			case 'qc': {
                const { quote } = require('./lib/quote.js')
                if (!q) return ('Masukan Text')
                let ppnyauser = await await conn.profilePictureUrl(m.sender, 'image').catch(_=> './media/bbot.jpg')
                const rest = await quote(q, pushname, ppnyauser)
                newReply(mess.wait)
                conn.sendImageAsSticker(m.chat, rest.result, m, { packname: `${global.packname}`, author: `${global.author}`})
                }
            break
            
            case 'qcimg': {
                const { quote } = require('./lib/quote.js')
                if (!q) return ('Masukan Text')
                let ppnyauser = await await conn.profilePictureUrl(m.sender, 'image').catch(_=> './media/bbot.jpg')
                const rest = await quote(q, pushname, ppnyauser)
                newReply(mess.wait)
                conn.sendMessage(m.chat, { image: { url: rest.result }, caption: `Done?`}, {quoted: m})
                }
            break
            
			case 'sticker':
            case 'stiker':
            case 's':{
                if (!quoted) return newReply(`Balas Video/Image Dengan Caption ${prefix + command}`)
                newReply(mess.wait)
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await conn.sendImageAsSticker(m.chat, media, m, {
                        packname: global.packname,
                        author: global.author
                    })
                    await fs.unlinkSync(encmedia)
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return newReply('Maksimal 10 detik!')
                    let media = await quoted.download()
                    let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, {
                        packname: global.packname,
                        author: global.author
                    })
                    await fs.unlinkSync(encmedia)
                } else {
                    return newReply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
                }
            }
            break
            
            case 'smeme': {
    	        let respond = `Kirim/reply image/sticker dengan caption ${prefix + command} text1|text2`
    	        if (!/image/.test(mime)) return newReply(respond)
                if (!text) return newReply(respond)
    	        newReply(mess.wait)
                atas = text.split('|')[0] ? text.split('|')[0] : '-'
                bawah = text.split('|')[1] ? text.split('|')[1] : '-'
    	        let dwnld = await conn.downloadAndSaveMediaMessage(qmsg)
    	        let fatGans = await TelegraPh(dwnld)
    	        let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`
    	        let FaTiH = await conn.sendImageAsSticker(m.chat, smeme, m, { packname: global.packname, author: global.auhor })
    	        await fs.unlinkSync(FaTiH)
                }
	        break
	             
            case 'swm': {
                let [teks1, teks2] = text.split`|`
                if (!teks1) return newReply(`Kirim/reply image/video dengan caption ${prefix + command} teks1|teks2`)
                if (!teks2) return newReply(`Kirim/reply image/video dengan caption ${prefix + command} teks1|teks2`)
            	newReply(mess.wait)
                if (/image/.test(mime)) {
                    let media = await conn.downloadMediaMessage(qmsg)
                    let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
                    await fs.unlinkSync(encmedia)
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return newReply('Maksimal 10 detik!')
                    let media = await conn.downloadMediaMessage(qmsg)
                    let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: teks1, author: teks2 })
                    await fs.unlinkSync(encmedia)
                } else {
                    return newReply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
                }
            }
            break
            
            case 'emojimix': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return newReply(`Contoh : ${prefix + command} 😅+🤔`)
                if (!emoji2) return newReply(`Contoh : ${prefix + command} 😅+🤔`)
                newReply(mess.wait)
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await conn.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                    await fs.unlinkSync(encmedia)
                }
                
            }
            break

            case 'toimage': 
            case 'toimg': {
                if (!/webp/.test(mime)) return newReply(`Reply sticker dengan caption *${prefix + command}*`)
                newReply(mess.wait)
                let media = await conn.downloadAndSaveMediaMessage(qmsg)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return err
                    let buffer = fs.readFileSync(ran)
                    conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
                    fs.unlinkSync(ran)
                })
                }
            break

	        case 'tomp4': 
	        case 'tovideo': {
                if (!/webp/.test(mime)) return newReply(`Reply stiker dengan caption *${prefix + command}*`)
                newReply(mess.wait)
                let media = await conn.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
                await fs.unlinkSync(media)  
                }
            break
            
            case 'toaud': 
            case 'toaudio': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return newReply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`)
                newReply(mess.wait)
                let media = await conn.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                conn.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
                
                }
            break
            
            case 'tomp3': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return newReply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`)
                newReply(mess.wait)
                let media = await conn.downloadMediaMessage(qmsg)
                let audio = await toAudio(media, 'mp4')
                conn.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert By Bimatio.mp3`}, { quoted : m })
                
                }
            break
            
            case 'tovn': 
            case 'toptt': {
                if (!/video/.test(mime) && !/audio/.test(mime)) return newReply(`Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`)
                newReply(mess.wait)
                let media = await conn.downloadMediaMessage(qmsg)
                let { toPTT } = require('./lib/converter')
                let audio = await toPTT(media, 'mp4')
                conn.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
                
                }
            break
            
            case 'togif': {
                if (!/webp/.test(mime)) return newReply(`Reply stiker dengan caption *${prefix + command}*`)
                newReply(mess.wait)
                let media = await conn.downloadAndSaveMediaMessage(qmsg)
                let webpToMp4 = await webp2mp4File(media)
                await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
                await fs.unlinkSync(media)
                }
            break
            
	        case 'tourl': {
                newReply(mess.wait)
                let media = await conn.downloadAndSaveMediaMessage(qmsg)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    newReply(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    newReply(util.format(anu))
                }
                await fs.unlinkSync(media)
                }
            break
            
			case 'memeindo':
                newReply(mess.wait)
                conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/meme/memeindo?apikey=${apikey}`}, caption: `Done?`}, {quoted: m})
            break
			
	        // Creator Image
	       
	        case 'carbon':
	            if (!q) return newReply(`Example: ${prefix + command} const bbot = required('bbot-api')`)
	            newReply(mess.wait)
	            conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/carbon?apikey=${apikey}&code=${q}&language=nodejs`}, caption: `Created By Bimatio\n\n\nCode:\n\n${q}`}, {quoted: m})
	        break
	     
        // Text Prome
        case 'pornhub':
		case 'glitch':
		case 'avenger':
		case 'space':
		case 'ninjalogo':
		case 'marvelstudio':
		case 'lionlogo':
		case 'wolflogo':
		case 'steel3d':
		case 'wallgravity':
			if (args.length == 0) return reply(`Example: ${prefix + command} Bimatio`)
			if (!isPremium && global.db.data.users[m.sender].limit < 1) return newReply(mess.endLimit) // respon ketika limit habis
            db.data.users[m.sender].limit -= 4 // -1 limit
			newReply(mess.wait)
			conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome2/${command}?apikey=${apikey}&text1=${args[0]}&text2=${args[1]}`}, caption: `Created By Bimatio\n\n Type: ${command}\n\nText: ${args}`})
			break

        case 'blackpink':
		case 'neon':
		case 'greenneon':
		case 'advanceglow':
		case 'futureneon':
		case 'sandwriting':
		case 'sandsummer':
		case 'sandengraved':
		case 'metaldark':
		case 'neonlight':
		case 'holographic':
		case 'text1917':
		case 'minion':
		case 'deluxesilver':
		case 'newyearcard':
		case 'bloodfrosted':
		case 'halloween':
		case 'jokerlogo':
		case 'fireworksparkle':
		case 'natureleaves':
		case 'bokeh':
		case 'toxic':
		case 'strawberry':
		case 'box3d':
		case 'roadwarning':
		case 'breakwall':
		case 'icecold':
		case 'luxury':
		case 'cloud':
		case 'summersand':
		case 'horrorblood':
		case 'thunder':
			if (args.length == 0) return newReply(`Example: ${prefix + command} Bimatio`)
			if (!isPremium && global.db.data.users[m.sender].limit < 1) return newReply(mess.endLimit) // respon ketika limit habis
            db.data.users[m.sender].limit -= 2 // -1 limit
			newReply(mess.wait)
			conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome/${command}?apikey=${apikey}&text=${args}` }, caption: `Created By Bimatio\n\n Type: ${command}\n\nText: ${args}`})
			break
	
        case 'wikimedia': {
            if (!text) return newReply('Mau Cari Wikimedia Apa?')
            newReply(mess.wait)
            if (!isPremium && global.db.data.users[m.sender].limit < 1) return newReply(mess.endLimit) // respon ketika limit habis
            db.data.users[m.sender].limit -= 1 // -1 limit
            let {
                wikimedia
            } = require('./lib/scraper')
            anu = await wikimedia(text)
            result = anu[Math.floor(Math.random() * anu.length)]
            conn.sendMessage(m.chat, { image: { url: result}, caption: mess.done}, { quoted: m })
        }
        break
               
		case 'nomerhoki': case 'nomorhoki': {
            if (!Number(text)) return newReply(`Contoh : ${prefix + command} 6288292024190`)
            let anu = await primbon.nomer_hoki(Number(text))
            if (anu.status == false) return newReply(anu.message)
            conn.sendText(m.chat, `• *Nomor HP :* ${anu.message.nomer_hp}\n• *Angka Shuzi :* ${anu.message.angka_shuzi}\n• *Energi Positif :*\n- Kekayaan : ${anu.message.energi_positif.kekayaan}\n- Kesehatan : ${anu.message.energi_positif.kesehatan}\n- Cinta : ${anu.message.energi_positif.cinta}\n- Kestabilan : ${anu.message.energi_positif.kestabilan}\n- Persentase : ${anu.message.energi_positif.persentase}\n• *Energi Negatif :*\n- Perselisihan : ${anu.message.energi_negatif.perselisihan}\n- Kehilangan : ${anu.message.energi_negatif.kehilangan}\n- Malapetaka : ${anu.message.energi_negatif.malapetaka}\n- Kehancuran : ${anu.message.energi_negatif.kehancuran}\n- Persentase : ${anu.message.energi_negatif.persentase}`, m)
            }
        break
        
        case 'artinama': {
            if (!text) return newReply(`Contoh : ${prefix + command} Dika Ardianta`)
            let anu = await primbon.arti_nama(text)
            if (anu.status == false) return newReply(anu.message)
            conn.sendText(m.chat, `• *Nama :* ${anu.message.nama}\n• *Arti :* ${anu.message.arti}\n• *Catatan :* ${anu.message.catatan}`, m)
            }
        break

        case 'keberuntungan': {
            if (!text) return newReply(`Contoh : ${prefix + command} Dika, 7, 7, 2005`)
            let [nama, tgl, bln, thn] = text.split`,`
            let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn)
            if (anu.status == false) return newReply(anu.message)
            conn.sendText(m.chat, `• *Nama :* ${anu.message.nama}\n• *Lahir :* ${anu.message.tgl_lahir}\n• *Hasil :* ${anu.message.result}`, m)
            }
        break
            
        case 'setcmd': {
            if (!m.quoted) return newReply('Reply Pesan!')
            if (!m.quoted.fileSha256) return newReply('SHA256 Hash Tidak Ditemukan ❎')
            if (!text) return newReply(`Untuk Command Apa?`)
            let hash = m.quoted.fileSha256.toString('base64')
            if (global.db.data.sticker[hash] && global.db.data.sticker[hash].locked) return newReply('Anda Tidak Diizinkan Untuk Mengubah Perintah Stiker Ini ❎')
            global.db.data.sticker[hash] = {
                text,
                mentionedJid: m.mentionedJid,
                creator: m.sender,
                at: +new Date,
                locked: false,
            }
            newReply(mess.done)
         }
        break

        case 'delcmd': {
            let hash = m.quoted.fileSha256.toString('base64')
            if (!hash) return newReply(`Tidak Ada Hash`)
            if (global.db.data.sticker[hash] && global.db.data.sticker[hash].locked) return newReply('Anda Tidak Diizinkan Untuk Mengubah Perintah Stiker Ini ❎')
            delete global.db.data.sticker[hash]
            newReply(mess.done)
            }
        break

        case 'listcmd': {
            let teks = `*List Hash 🚀*
            Info: *bold* hash is Locked 🔒

            *Hash ☕ :*
            ${Object.entries(global.db.data.sticker).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} : ${value.text}`).join('\n')}
            `.trim()
            conn.sendText(m.chat, teks, m, {
                mentions: Object.values(global.db.data.sticker).map(x => x.mentionedJid).reduce((a, b) => [...a, ...b], [])
            })
            }
        break

        case 'lockcmd': {
            if (!isCreator) return newReply(mess.owner)
            if (!m.quoted) return newReply('Reply Pesan!')
            if (!m.quoted.fileSha256) return newReply('SHA256 Hash Missing')
            let hash = m.quoted.fileSha256.toString('base64')
            if (!(hash in global.db.data.sticker)) return newReply('Hash Not Found In Database')
            global.db.data.sticker[hash].locked = !/^un/i.test(command)
            newReply('Done!')
            }
        break
            case 'addmsg': {
                if (!m.quoted) return newReply('Reply Message Yang Ingin Disave Di Database')
                if (!text) return newReply(`Contoh : ${prefix + command} Nama File`)
                let msgs = global.db.data.database
                if (text.toLowerCase() in msgs) return newReply(`'${text}' Telah Terdaftar Di List Pesan`)
                msgs[text.toLowerCase()] = quoted.fakeObj
                newReply(`Berhasil Menambahkan Pesan Di List Pesan Sebagai '${text}'
    
Akses dengan ${prefix}getmsg ${text}

Lihat list Pesan Dengan ${prefix}listmsg`)
            }
            break
            case 'getmsg': {
                if (!text) return newReply(`Contoh : ${prefix + command} File Name\n\nLihat List Pesan Dengan ${prefix}listmsg`)
                let msgs = global.db.data.database
                if (!(text.toLowerCase() in msgs)) return newReply(`'${text}' Tidak Terdaftar Di List Pesan`)
                conn.copyNForward(m.chat, msgs[text.toLowerCase()], true)
            }
            break

case 'menu':
case 'help': {
    let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.

  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}
   
${readmore}
乂 *S U B -- M E N U*
    ☍ ${prefix}allmenu
    ☍ ${prefix}server
    ☍ ${prefix}mainmenu
    ☍ ${prefix}downmenu
    ☍ ${prefix}convertmenu`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break
case 'allmenu': {
    let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.

  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}
   
乂 *S U B -- M E N U*
    ☍ ${prefix}allmenu
    ☍ ${prefix}mainmenu
    ☍ ${prefix}downmenu
    ☍ ${prefix}convertmenu
    ☍ ${prefix}mememenu
${readmore}

乂 *M A I N  M E N U*
◇ ‣ ${prefix}owner
◇ ‣ ${prefix}ping
◇ ‣ ${prefix}menu
◇ ‣ ${prefix}speedtest
◇ ‣ ${prefix}script
◇ ‣ ${prefix}tqto
◇ ‣ ${prefix}runtime
◇ ‣ ${prefix}ceklimit

乂 *C R E A T O R  I M A G E*
◇ ‣ ${prefix}qcimg
◇ ‣ ${prefix}qc

乂 *D O W N  M E N U*
◇ ‣ ${prefix}ytplay
◇ ‣ ${prefix}ytmp3
◇ ‣ ${prefix}ytmp4
◇ ‣ ${prefix}tiktok
◇ ‣ ${prefix}tiktokaudio
◇ ‣ ${prefix}igdl
◇ ‣ ${prefix}twtdl
◇ ‣ ${prefix}fbdl

乂 *C O N V E R T  M E N U*
◇ ‣ ${prefix}stiker
◇ ‣ ${prefix}swm
◇ ‣ ${prefix}smeme
◇ ‣ ${prefix}emojimix
◇ ‣ ${prefix}emojimix2
◇ ‣ ${prefix}toimage
◇ ‣ ${prefix}tomp4
◇ ‣ ${prefix}toaudio
◇ ‣ ${prefix}tomp3
◇ ‣ ${prefix}tovn
◇ ‣ ${prefix}togif
◇ ‣ ${prefix}tourl

乂 *M E M E  M E N U*
◇ ‣ ${prefix}darkjoke
◇ ‣ ${prefix}ramdommeme
◇ ‣ ${prefix}memeindo`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break

case 'server': {
    let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.
      ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
      ☍ *Runtime:* ${runtime(process.uptime())}
      ☍ *Total Banned:* ${ban.length}
      
    乂 *I N F O  U S E R*
    
       ☍ *Name:* ${pushname}
       ☍ *Number:* ${m.sender.split('@')[0]}
       ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
       ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
       ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}
       
    
    乂 *S E R V E R  M E N U*
    ◇ ‣ ${prefix}ip
    ◇ ‣ ${prefix}player
    ◇ ‣ ${prefix}vote`
    conn.sendMessage(m.chat, {
        text: anu,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true, 
            title: `${ucapanWaktu} ${pushname}`,
            body: "Bimatio",
            thumbnailUrl: "media/bbot.jpg",
            sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
       })
    }
    break

case 'mainmenu': {
let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.
  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}
   

乂 *M A I N  M E N U*
◇ ‣ ${prefix}owner
◇ ‣ ${prefix}ping
◇ ‣ ${prefix}menu
◇ ‣ ${prefix}speedtest
◇ ‣ ${prefix}script
◇ ‣ ${prefix}tqto
◇ ‣ ${prefix}runtime
◇ ‣ ${prefix}ceklimit`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break

case 'groupmenu': {
let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.
  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}
   

乂 *G R O U P  M E N U*
◇ ‣ ${prefix}kick
◇ ‣ ${prefix}add
◇ ‣ ${prefix}culik
◇ ‣ ${prefix}promote
◇ ‣ ${prefix}demote
◇ ‣ ${prefix}setname
◇ ‣ ${prefix}setdesc
◇ ‣ ${prefix}setppgc
◇ ‣ ${prefix}tagall
◇ ‣ ${prefix}hidetag
◇ ‣ ${prefix}totag
◇ ‣ ${prefix}antilink
◇ ‣ ${prefix}antilinkyt
◇ ‣ ${prefix}antilinktt
◇ ‣ ${prefix}mutegc
◇ ‣ ${prefix}ephemeral
◇ ‣ ${prefix}group
◇ ‣ ${prefix}editinfo
◇ ‣ ${prefix}linkgc
◇ ‣ ${prefix}revoke
◇ ‣ ${prefix}liston`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break

case 'toolsmenu': {
let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.
  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}

乂 *T O O L S  M E N U*
◇ ‣ ${prefix}style
◇ ‣ ${prefix}delete
◇ ‣ ${prefix}quoted
◇ ‣ ${prefix}ebinary
◇ ‣ ${prefix}dbinary
◇ ‣ ${prefix}wikimedia`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break
case 'creatormenu': {
let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.
  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}
   

乂 *C R E A T O R  I M A G E*
◇ ‣ ${prefix}qcimg
◇ ‣ ${prefix}qc`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break

case 'downmenu': {
let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.
  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}
   

乂 *D O W N  M E N U*
◇ ‣ ${prefix}ytplay
◇ ‣ ${prefix}ytmp3
◇ ‣ ${prefix}ytmp4
◇ ‣ ${prefix}tiktok
◇ ‣ ${prefix}tiktokaudio
◇ ‣ ${prefix}igdl
◇ ‣ ${prefix}twtdl
◇ ‣ ${prefix}fbdl
◇ ‣ ${prefix}gitclone`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break

case 'textpro1': {
let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.
  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}

乂 *T E X T  P R O _1_*
◇ ‣ ${prefix}blackpink
◇ ‣ ${prefix}neon
◇ ‣ ${prefix}greenneon
◇ ‣ ${prefix}advanceglow
◇ ‣ ${prefix}futureneon
◇ ‣ ${prefix}sandwriting
◇ ‣ ${prefix}sandsummer
◇ ‣ ${prefix}sandengraved
◇ ‣ ${prefix}metaldark
◇ ‣ ${prefix}neonlight
◇ ‣ ${prefix}holographic
◇ ‣ ${prefix}text1917
◇ ‣ ${prefix}minion
◇ ‣ ${prefix}deluxesilver
◇ ‣ ${prefix}newyearcard
◇ ‣ ${prefix}bloodfrosted
◇ ‣ ${prefix}halloween
◇ ‣ ${prefix}jokerlogo
◇ ‣ ${prefix}fireworksparkle
◇ ‣ ${prefix}natureleaves
◇ ‣ ${prefix}bokeh
◇ ‣ ${prefix}toxic
◇ ‣ ${prefix}strawberry
◇ ‣ ${prefix}box3d
◇ ‣ ${prefix}roadwarning
◇ ‣ ${prefix}breakwall
◇ ‣ ${prefix}icecold
◇ ‣ ${prefix}luxury
◇ ‣ ${prefix}cloud
◇ ‣ ${prefix}summersand
◇ ‣ ${prefix}horrorblood
◇ ‣ ${prefix}thunder`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break
case 'textpro2': {
let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.
  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}
   

乂 *T E X T  P R O _2_*
◇ ‣ ${prefix}pornhub
◇ ‣ ${prefix}glitch
◇ ‣ ${prefix}avenger
◇ ‣ ${prefix}space
◇ ‣ ${prefix}ninjalogo
◇ ‣ ${prefix}marvelstudio
◇ ‣ ${prefix}lionlogo
◇ ‣ ${prefix}wolflogo
◇ ‣ ${prefix}steel3d
◇ ‣ ${prefix}wallgravity`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break

case 'convertmenu': {
let anu =`Halo ${pushname}\nSaya ${namabot} Sebuah BOT untuk mempermudah aktivitas anda disini.
  ☍ *Mode:* ${conn.public ? 'Public-Mode 👥' : 'Self-Mode 👤'}
  ☍ *Runtime:* ${runtime(process.uptime())}
  ☍ *Total Banned:* ${ban.length}
  
乂 *I N F O  U S E R*

   ☍ *Name:* ${pushname}
   ☍ *Number:* ${m.sender.split('@')[0]}
   ☍ *Status:* ${isCreator ? "Owner 🥶" : "User ⭐"}
   ☍ *User:* ${isPremium ? 'Premium 🥶' : 'Gratisan ⭐'}
   ☍ *Limit:* ${isCreator ? 'Unlimited 🥶' : `${db.data.users[m.sender].limit}⭐`}
   

乂 *C O N V E R T  M E N U*
◇ ‣ ${prefix}stiker
◇ ‣ ${prefix}swm
◇ ‣ ${prefix}smeme
◇ ‣ ${prefix}emojimix
◇ ‣ ${prefix}emojimix2
◇ ‣ ${prefix}toimage
◇ ‣ ${prefix}tomp4
◇ ‣ ${prefix}toaudio
◇ ‣ ${prefix}tomp3
◇ ‣ ${prefix}tovn
◇ ‣ ${prefix}togif
◇ ‣ ${prefix}tourl`
conn.sendMessage(m.chat, {
    text: anu,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `${ucapanWaktu} ${pushname}`,
        body: "Bimatio",
        thumbnailUrl: "media/bbot.jpg",
        sourceUrl: "https://chat.whatsapp.com/Gqcx4DduCXqDNjOlconUQT",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
   })
}
break
// Nanti bisa ditambah cmd sendiri
    default:
        if (!isCmd) {
            if (command)
            newReply("DiMohon Jangan Spam!!!!")
        sleep(5000)
        }
        
        if (budy.startsWith('=>')) {
            if (!isCreator) return newReply(mess.owner)

            function Return(sul) {
                sat = JSON.stringify(sul, null, 2)
                bang = util.format(sat)
                if (sat == undefined) {
                    bang = util.format(sul)
                }
                return newReply(bang)
            }
            try {
                newReply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
            } catch (e) {
                newReply(String(e))
            }
        }

        if (budy.startsWith('>')) {
            if (!isCreator) return newReply(mess.owner)
            try {
                let evaled = await eval(budy.slice(2))
                if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                await newReply(evaled)
            } catch (err) {
                await newReply(String(err))
            }
        }

        if (budy.startsWith('$')) {
            if (!isCreator) return newReply(mess.owner)
            exec(budy.slice(2), (err, stdout) => {
                if (err) return newReply(err)
                if (stdout) return newReply(stdout)
            })
        }
        
        if (isCmd && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith('broadcast')) return
            if (m.isBaileys) return
            let msgs = global.db.data.database
            if (!(budy.toLowerCase() in msgs)) return
            conn.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
        }
}


} catch (err) {
    console.log("Eror Di Bagian bbot.js "+util.format(err))
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})