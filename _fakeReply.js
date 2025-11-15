import fetch from 'node-fetch'
import fs from 'fs' // تم إضافة استيراد مكتبة fs
import moment from 'moment-timezone' // تم إضافة استيراد مكتبة moment-timezone

// يجب تعريف الدالة getRandom كجزء من Array.prototype أو استيرادها إذا كانت في ملف آخر.
// للإصلاح المؤقت، سأضيف دالة بسيطة لـ getRandom:
if (!Array.prototype.getRandom) {
    Array.prototype.getRandom = function () {
        return this[Math.floor(Math.random() * this.length)];
    };
}
 
//let handler = m => m
//handler.all = async function (m) {
export async function before(m, { conn, text }) {	
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
let pp = await this.profilePictureUrl(who, 'image').catch(_ => "https://qu.ax/wlpTo.jpg")
		
global.canalIdGB = ["120363340261499294@newsletter", "120363340261499294@newsletter"]
global.canalNombreGB = ["ᏚᎻᎪᎠᎾᎳ ᏴᎾᎢ", "ᏚᎻᎪᎠᎾᎳ ᏴᎾᎢ"]
// التأكد من أن getRandomChannel تستخدم المتغيرات المعرفة عالميًا (global)
global.channelRD = await getRandomChannel(global.canalIdGB, global.canalNombreGB)
	
global.fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
	
global.rpl = { contextInfo: { externalAdReply: { mediaUrl: global.nna, mediaType: 'VIDEO', description: 'Actualización/novedades', title: global.packname, body: 'Canal update', thumbnailUrl: pp, sourceUrl: [global.nna, global.nna2, global.nnaa].getRandom() }}} 
   	
global.fake = { contextInfo: { mentionedJid: await this.parseMention(text), forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: global.channelRD.id, serverMessageId: '', newsletterName: global.channelRD.name }}}
   
global.fake2 = { contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: global.channelRD.id, serverMessageId: '', newsletterName: global.channelRD.name }, externalAdReply: { title: global.wm, body: global.vs, mediaType: 1, renderLargerThumbnail: false, previewType: `PHOTO`, thumbnailUrl: pp, sourceUrl: global.redes.getRandom() }}}
   
global.rpyp = { contextInfo: { externalAdReply: { mediaUrl: global.md, mediaType: 'VIDEO', description: 'GitHub', title: 'GitHub', body: 'ˢᶦ ᵗᵉ ᵃᵍʳᵃᵈᵃ ᵉˡ ᴮᵒᵗ ᵃᵖᵒʸᵃʳᵐᵉ ᶜᵒⁿ ᵘⁿᵃ 🌟', thumbnailUrl: pp, sourceUrl: global.md }}}
	
//⊱ ━━━━━.⋅ RPG ⋅.━━━━ ⊰

global.flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=']

global.cmenut = '❖––––––『'
global.cmenub = '┊✦ '
global.cmenuf = '╰━═┅═━––––––๑\n'
global.cmenua = '\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     '
global.dmenut = '*❖─┅──┅〈*'
global.dmenub = '*┊»*'
global.dmenub2 = '*┊*'
global.dmenuf = '*╰┅────────┅✦*'
global.htjava = '⫹⫺'
global.htki = '*⭑•̩̩͙⊱•••• ☪*'
global.htka = '*☪ ••••̩̩͙⊰•⭑*'
global.comienzo = '• • ◕◕════'
global.fin = '════◕◕ • •'
global.botdate = `⫹⫺ Date :  ${moment.tz('America/Los_Angeles').format('DD/MM/YY')}` //Asia/Jakarta
global.bottime = `𝗧 𝗜 𝗠 𝗘 : ${moment.tz('America/Los_Angeles').format('HH:mm:ss')}`//America/Los_Angeles
global.fgif = {
key: {
participant : '0@s.whatsapp.net'},
message: { 
"videoMessage": { 
"title": global.wm, // تم استخدام global.wm
"h": `Hmm`,
'seconds': '999999999', 
'gifPlayback': 'true', 
'caption': global.bottime, // تم استخدام global.bottime
'jpegThumbnail': fs.readFileSync('./media/Menu3.jpg')
}}}

/*----------------------[ SALIDA DEL GRUPO ]-----------------------*/
if (!m.isGroup) return
let chats = global.db.data.chats[m.chat]
if (!chats.expired) return !0
if (+new Date() > chats.expired) {
await this.reply(m.chat, [`*${this.user.name}* ᴹᵉ ᵛᵒʸ ᵈᵉˡ ᵉˡ ᵍʳᵘᵖᵒ ᶠᵘᵉ ᵘⁿ ᵍᵘˢᵗᵒ ᵉˢᵗᵃ ᵃᵠᵘᶦ́ ˢᶦ ᵠᵘᶦᵉʳᵉˢ ᵠᵘᵉ ᵛᵘᵉˡᵛᵃ ᵁˢᵉʳ ᵈᵉ ⁿᵘᵉᵛᵒ ᵉˡ ᶜᵒᵐᵃⁿᵈᵒ`, `Bueno me voy de este grupo de mrd, no me agregue a grupo ptm`, `*${this.user.name}* me voy de este grupito culiado nada interesante yo queria ver teta y son puro gays aca 🤣`].getRandom()) 
await this.groupLeave(m.chat)
chats.expired = null
}

/*----------------------[ FIN DE PREMIUM ]-----------------------*/
for (const user of Object.values(global.db.data.users)) {
if (user.premiumTime != 0 && user.premium) {
if (new Date() * 1 >= user.premiumTime) {
user.premiumTime = 0;
user.premium = false;
const JID = Object.keys(global.db.data.users).find((key) => global.db.data.users[key] === user);
const usuarioJid = JID.split`@`[0];
const textoo = `*⚠️ @${usuarioJid} 𝚃𝚄 𝚃𝙸𝙴𝙼𝙿𝙾 𝙲𝙾𝙼𝙾 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙿𝚁𝙴𝙼𝙸𝚄𝙼 𝙷𝙰 𝙴𝚇𝙿𝙸𝚁𝙰𝙳𝙾, 𝚈𝙰 𝙽𝙾 𝙴𝚁𝙴𝚂 𝚄𝙽 𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝙿𝚁𝙴𝙼𝙸𝚄𝙼*`;
await this.sendMessage(JID, {text: textoo, mentions: [JID]}, {quoted: ''});
}}}}
 
//export default handler

// تم تعديل الدالة لتقبل المصفوفات كوسائط بدلاً من الاعتماد على المتغيرات العالمية غير المضمونة
async function getRandomChannel(canalIds, canalNames) {
    let randomIndex = Math.floor(Math.random() * canalIds.length)
    let id = canalIds[randomIndex]
    let nombre = canalNames[randomIndex]
    return { id, nombre }
}
