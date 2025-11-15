import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@itsukichan/baileys'
import yts from 'yt-search'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

let handler = async (m, { conn, usedPrefix, text, command }) => {
  
  if (!text) return conn.sendMessage(m.chat, {
    text: `📌 يجب كتابة شيء للبحث في YouTube.\n\n> مثال:\n${usedPrefix + command} lofi anime`,
    ...global.rcanal 
  }, { quoted: m })

  await m.react('🔍')
  const maxResults = 5; 
  const botJid = conn.user?.jid?.split('@')[0].replace(/\D/g, '')
  const configPath = path.join('./JadiBots', botJid, 'config.json') 
  let nombreBot = global.namebot || '❀ Mai-Bot ❀'
  
  if (fs.existsSync && fs.existsSync(configPath)) { 
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      if (config.name) nombreBot = config.name
    } catch (err) {
      console.log('❌ خطأ أثناء قراءة إعدادات البوت الفرعي:', err)
    }
  }

  try {
    const results = await yts(text)
    const videos = results.videos.slice(0, maxResults)

    if (!videos.length) {
      await conn.sendMessage(m.chat, {
        text: `❌ لم يتم العثور على نتائج لكلمة: *${text}*.\n> حاول استخدام كلمات مختلفة.`,
        ...global.rcanal
      }, { quoted: m })
      await m.react('❌')
      return
    }

    const firstVideo = videos[0]
    const thumbnailURL = firstVideo.thumbnail
    const device = await getDevice(m.key.id);
    if (device !== 'desktop' && device !== 'web') {
      await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
      var messa = await prepareWAMessageMedia({ image: {url: thumbnailURL}}, { upload: conn.waUploadToServer });

      const caption = `
📥 *نتائج البحث عن:* *${text}*

🎬 *${firstVideo.title}*
👤 القناة: *${firstVideo.author.name}*
⏱️ المدة: *${firstVideo.timestamp}*
🔗 الرابط: ${firstVideo.url}

> 💡 اختر من القائمة بالأسفل لتحميل صوت أو فيديو.
      `.trim();

      const interactiveMessage = {
        header: {
            title: `*⋄┄┄┄┄┄┄┄⟡ بـحـث اليـوتـيوب ⟡┄┄┄┄┄┄┄⋄*`,
            hasMediaAttachment: true,
            imageMessage: messa.imageMessage,
        },
        body: { text: caption },
        // ✅ FIX: ضمان أن التذييل هو سلسلة نصية دائماً
        footer: { text: String(global.wm || `「 ${nombreBot} 」`) },  
        contextInfo: {
          mentionedJid: conn.parseMention(caption), 
          isForwarded: true, 
          forwardingScore: 1, 
          externalAdReply: {
            showAdAttribution: true,
            title: "⟡ نتائج يوتيوب ⟡",
            body: `نتائج البحث لـ: ${text}`,
            thumbnailUrl: thumbnailURL,
            mediaUrl: firstVideo.url,
            mediaType: 2, // فيديو
            sourceUrl: firstVideo.url,
            renderLargerThumbnail: false
          }
        },
        nativeFlowMessage: {
          buttons: [
            {
              name: 'single_select',
              buttonParamsJson: JSON.stringify({
                title: '⋄┄┄⟡ قائمة النتائج ⟡┄┄⋄',
                sections: videos.map((video) => ({
                  title: video.title.slice(0, 30) + '...', 
                  rows: [
                    {
                      header: '',
                      title: 'تحميل صوتي',
                      description: '〘 🎧 صــوتي 〙',
                      id: `.ytmp3 ${video.url}` 
                    },
                    {
                      header: '',
                      title: 'تحميل فيديو',
                      description: '〘 🎥 فيــديو 〙',
                      id: `.ytmp4 ${video.url}`
                    },
                  ]
                }))
              })
            }
          ],
          messageParamsJson: ''
        }
      };        
      
      let msg = generateWAMessageFromContent(m.chat, {
          viewOnceMessage: {
              message: {
                  interactiveMessage,
              },
          },
      }, { userJid: conn.user.jid, quoted: m });
      
      await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });
      conn.relayMessage(m.message.key.remoteJid, msg.message, { messageId: msg.key.id });

    } else {
      
      let caption = `📥 *نتائج البحث عن:* *${text}*\n\n`
      let downloadInstructions = '\n\n> 💡 *لتحميل فيديو:* أرسل #ytmp4 [الرابط]\n> 🎶 *لتحميل صوت:* أرسل #ytmp3 [الرابط]\n\n'

      for (let i = 0; i < videos.length; i++) {
        const video = videos[i]
        caption += `*${i + 1}.* 🎬 *${video.title}*\n\n`
        caption += `📝 الوصف: *${video.description?.slice(0, 100) || 'لا يوجد وصف'}*\n`
        caption += `👤 القناة: *${video.author.name}*\n`
        caption += `⏱️ المدة: *${video.timestamp}*\n`
        caption += `🔗 الرابط: ${video.url}\n\n`
      }

      caption += downloadInstructions
      caption += `╰─「 ${nombreBot} 」`
      
      await conn.sendMessage(m.chat, {
        image: { url: thumbnailURL }, 
        caption: caption.trim(),
        mentions: conn.parseMention(caption),
        ...global.rcanal
      }, { quoted: m })
      
      await m.react('✅')
    }

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, {
      text: `⚠️ حدث خطأ أثناء البحث، حاول لاحقًا.`,
      ...global.rcanal
    }, { quoted: m })
    await m.react('💥')
  }
}

handler.tags = ['search']
handler.help = ['يوت']
handler.command = ['يوت'] 

export default handler
