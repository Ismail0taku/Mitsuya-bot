/*
*
* 🗿🚬
*/
import { toAudio } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''  
    if (!/video|audio/.test(mime)) throw `*✳️ قم بالرد علي فيديو أو ملف صوتي لتحويله لصوت*`    
    let media = await q.download?.()
    if (!media) throw '❎ فشل تحميل الوسائط'    
    let audio = await toAudio(media, 'mp3') // *✅ نستخدم mp3 لضمان التوافق مع الإرسال*    
    if (!audio.data) throw '❎ حدث خطأ أثناء التحويل'    
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, false, { 
        mimetype: 'audio/mpeg' 
    })
}
handler.help = ['tomp3']
handler.tags = ['fun']
handler.command = /^(لصوتي|لفويس|tomp3)$/i
export default handler
