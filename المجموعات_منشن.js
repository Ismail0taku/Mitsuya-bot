let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
let image = 'https://files.catbox.moe/nyunu3.jpg'
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}
let pesan = args.join` `
let oi = `*┇*\n*┇⌬الرسـاله📨:* 
 ${pesan}\n*┇الجــروب🌐:*\n> ${await conn.getName(m.chat)}`
let teks = `*┓━『  المنشــن الجمــاعي 』━┏*\n${oi}\n*┇*\n*——————————*\n*منشـن┊🐥┊كاكاشي :⇣*\n*——————————*\n`
for (let mem of participants) {
teks += `> *♦* @${mem.id.split('@')[0]}\n`}
teks += `*┓━━━————————————*\n> *𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓* \n*————————————‌*\n*‌                                  ━━━┗*`
conn.sendMessage(m.chat, { image: { url: image }, caption: teks, mentions: participants.map(a => a.id) });

}
handler.help = ['tagall <mesaje>','invocar <mesaje>']
handler.tags = ['المجموعات']
handler.command = /^(منشن)$/i
handler.admin = true
handler.group = true
export default handler