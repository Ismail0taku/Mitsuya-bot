import { downloadMediaMessage } from '@itsukichan/baileys'

let handler = async (m, { conn }) => {
  try {
    if (!m.quoted) return m.reply('*〘 👁️‍🗨️ 〙 رد على رسالة View Once لكشفها*')

    let q = m.quoted
    let msg =
      q.msg ||
      q.message?.viewOnceMessage?.message ||
      q.message?.viewOnceMessageV2?.message ||
      q.message?.viewOnceMessageV2Extension?.message ||
      q.mediaMessage ||
      q.message

    if (!msg) return m.reply('❌ *تعذر الوصول إلى محتوى الوسائط.*')

    let type = Object.keys(msg)[0]
    if (!['imageMessage', 'videoMessage'].includes(type))
      return m.reply('⚠️ *الوسائط ليست صورة أو فيديو عرض مرة واحدة.*')

    const buffer = await downloadMediaMessage(
      { message: { [type]: msg[type] } },
      'buffer',
      {},
      {
        logger: console,
        reuploadRequest: conn.updateMediaMessage,
      }
    )

    await conn.sendMessage(
      m.chat,
      {
        [type.replace('Message', '')]: buffer,
        caption: msg[type]?.caption || '',
      },
      { quoted: m }
    )

    m.reply('✅ *تم كشف الوسائط بنجاح!*')
  } catch (err) {
    console.error(err)
    m.reply('⚠️ *حدث خطأ أثناء استخراج الوسائط:* ' + err.message)
  }
}

handler.help = ['كشف']
handler.tags = ['tools']
handler.command = ['كشف']

export default handler