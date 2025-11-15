import axios from 'axios'
const { proto, generateWAMessageFromContent, generateWAMessageContent } = (await import("@itsukichan/baileys")).default

const dev = '「🧊」⇇ 𝑲𝒂𝒌𝒂𝒔𝒉𝒊 𝐵𝛩𝑇'
const avatar = 'https://telegra.ph/file/bfffd8b4a5c3f2c6d3dbb.jpg'
const redes = 'https://t.me/kakashibot_channel'

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '🎬 اكتب الكلمة اللي تبي تبحث عنها في تيك توك 🔍', m)

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })
    const queries = [
      `${text} edit`,
      `${text} tiktok`,
      `${text} short`,
      `${text} highlights`,
      text
    ]

    let foundVideo = null

    for (let query of queries) {
      const url = `https://www.tikwm.com/api/feed/search?keywords=${encodeURIComponent(query)}&count=10`
      const { data } = await axios.get(url, { timeout: 10000 })

      if (data?.data && Array.isArray(data.data.videos)) {
        const videos = data.data.videos.filter(v => {
          const dur = Number(v.duration) || 0
          return dur > 5 && dur <= 50 
        })

        if (videos.length > 0) {
          videos.sort((a, b) => (b.play_count || 0) - (a.play_count || 0))
          foundVideo = videos[0]
          break
        }
      }
    }

    if (!foundVideo) {
      return conn.reply(m.chat, `🚫 ما لقيت أي نتيجة مناسبة لمصطلح: *${text}*`, m)
    }

    const caption = `*🎬 ــايــديــت ــجــاهــز*\n>  ｢${dev}｣`

    await conn.sendMessage(m.chat, {
      video: { url: foundVideo.play || foundVideo.nowm },
      caption,
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        externalAdReply: {
          title: foundVideo.title || 'TikTok Video',
          body: '🔎 نتيجة بحث تيك توك',
          thumbnailUrl: foundVideo.cover,
          sourceUrl: foundVideo.share_url,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (error) {
    console.error(error)
    conn.reply(m.chat, `⚠︎ حدث خطأ أثناء البحث:\n${error.message}`, m)
  }
}

handler.help = ['tiktoksearch <text>']
handler.tags = ['search']
handler.command = ['tiktok', 'تيك']

export default handler