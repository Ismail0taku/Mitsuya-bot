import { generateWAMessageContent, generateWAMessageFromContent, proto } from '@itsukichan/baileys'
import axios from 'axios'

const searchCache = new Map()
const CACHE_DURATION = 24 * 60 * 60 * 1000
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const API_KEYS = [
    'Fwl7IjYKT5S8h3Ue8I9mHgRIXJE3',
    'mCqeBuuwtHSZy7O8JbBL0HKup172',
    'DjYdBGTICoep8iLDNwJ0BxNKQDs2' 
]

let currentKeyIndex = 0
function getNextApiKey() {
    const key = API_KEYS[currentKeyIndex]
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length
    return key
}

async function createImageMessage(url, conn) {
    const res = await axios.get(url, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(res.data, 'binary')

    const { imageMessage } = await generateWAMessageContent(
        { image: buffer },
        { upload: conn.waUploadToServer }
    )
    return imageMessage
}

async function fetchPinterestImages(query) {
    const now = Date.now()
    if (searchCache.has(query)) {
        const cached = searchCache.get(query)
        if (now - cached.timestamp < CACHE_DURATION) {
            return cached.urls
        }
    }

    const API_KEY = getNextApiKey()

    const response = await axios.get(
        `https://api.scrapecreators.com/v1/pinterest/search?query=${encodeURIComponent(query)}`,
        { headers: { 'x-api-key': API_KEY } }
    )

    const pins = response.data.pins || []
    const urls = []

    for (const pin of pins.slice(0, 10)) {
        const images = pin.images
        if (!images) continue
        const imageUrl = images.original?.url || images['736x']?.url || images['564x']?.url
        if (!imageUrl) continue
        urls.push({ url: imageUrl, sourceUrl: pin.url })
    }

    if (urls.length) searchCache.set(query, { urls, timestamp: now })

    return urls
}

const userRequests = new Map();
const COOLDOWN_PERIOD = 10 * 60 * 1000; 

let handler = async (m, { conn, text }) => {
    const userId = m.sender;
    const now = Date.now();

    if (userRequests.has(userId)) {
        const userData = userRequests.get(userId);
        const requestCount = userData.count;
        const lastRequestTime = userData.timestamp;

        if (now - lastRequestTime > COOLDOWN_PERIOD) {
            userRequests.set(userId, { count: 1, timestamp: now });
        } else if (requestCount >= 2) {
            const timeLeft = Math.ceil((COOLDOWN_PERIOD - (now - lastRequestTime)) / (60 * 1000));
            return conn.reply(m.chat, `معليش طلبت مرتين على توالي حاول بعد ${timeLeft} دقيقة.`, m);
        } else {
            userRequests.set(userId, { count: requestCount + 1, timestamp: now });
        }
    } else {
        userRequests.set(userId, { count: 1, timestamp: now });
    }

    if (!text) return conn.reply(m.chat, ' اكتب وصف  الصوره للبحث عنها\nمثال: `.بين naruto wallpaper`', m)

    await m.react('🕐')
    await conn.reply(m.chat, '🔎 جاري البحث عن صور في بينترست  انتظر شوي بندور', m)

    try {
        const pins = await fetchPinterestImages(text)

        if (!pins.length) return conn.reply(m.chat, 'معليش ما لقية صور اجيبها حاول بسم مختلف', m)

        const cards = []
        let count = 1

        for (const pin of pins) {
            const imageMsg = await createImageMessage(pin.url, conn)

            cards.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `📷 نتيجة البحث عن: ${text}\nالصورة رقم ${count++}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: '「♟️」⇇ 𝑲𝑨𝛫𝑨𝑺𝑯𝑰 𝐵𝛩𝑇 ⌬*'
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '',
                    hasMediaAttachment: true,
                    imageMessage: imageMsg
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [{
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "⌈📲╎قـنـاة الـمـطـور╎📲⌋",
                            url: "https://whatsapp.com/channel/0029Vb6S5R9DJ6H01zcTAh0j"
                        })
                    }]
                })
            })

            await sleep(300)
        }

        const finalMessage = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `🎨  تم إيجاد ${cards.length} صورة بدقة عالية\n🔎 بحث: ${text}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: '「♟️」⇇ 𝑲𝑨𝛫𝑨𝑺𝑯𝑰 𝐵𝛩𝑇 ⌬*' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
                    })
                }
            }
        }, { quoted: m })

        await m.react('🧊')
        await conn.relayMessage(m.chat, finalMessage.message, { messageId: finalMessage.key.id })

    } catch (err) {
        console.error('Pinterest API failed:', err)
        await m.react('🛃')
        await conn.reply(m.chat, 'معليش صار خطأ  حاول تاني بعدين 🧸🚬.', m)
    }
}

handler.help = ['بين']
handler.tags = ['search']
handler.command = /^(بين)$/i

export default handler

