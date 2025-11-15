import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { spawn } from 'child_process'
import fluent_ffmpeg from 'fluent-ffmpeg'
import fetch from 'node-fetch'
import { fileTypeFromBuffer } from 'file-type'
import webp from 'node-webpmux'

const tmp = path.join(process.cwd(), 'tmp')
if (!fs.existsSync(tmp)) fs.mkdirSync(tmp)

async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
  const img = new webp.Image()
  const stickerPackId = crypto.randomBytes(32).toString('hex')
  const json = {
    'sticker-pack-id': stickerPackId,
    'sticker-pack-name': packname,
    'sticker-pack-publisher': author,
    'emojis': categories,
    ...extra
  }
  const exifAttr = Buffer.from([
    0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00,
    0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x16, 0x00, 0x00, 0x00
  ])
  const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8')
  const exif = Buffer.concat([exifAttr, jsonBuffer])
  exif.writeUIntLE(jsonBuffer.length, 14, 4)
  await img.load(webpSticker)
  img.exif = exif
  return await img.save(null)
}

async function sticker(img, url, packname, author) {
  if (url) {
    let res = await fetch(url)
    if (res.status !== 200) throw await res.text()
    img = await res.buffer()
  }
  const type = await fileTypeFromBuffer(img) || { mime: 'application/octet-stream', ext: 'bin' }
  if (type.ext === 'bin') throw new Error('نوع الملف غير صالح')

  const tmpFile = path.join(tmp, `${Date.now()}.${type.ext}`)
  const outFile = `${tmpFile}.webp`
  await fs.promises.writeFile(tmpFile, img)

  await new Promise((resolve, reject) => {
    const ff = /video/i.test(type.mime)
      ? fluent_ffmpeg(tmpFile).inputFormat(type.ext)
      : fluent_ffmpeg(tmpFile).input(tmpFile)

    ff.addOutputOptions([
      `-vcodec`, `libwebp`, `-vf`,
      `scale='min(512,iw)':min'(512,ih)':force_original_aspect_ratio=decrease,fps=15, pad=512:512:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`
    ])
      .toFormat('webp')
      .save(outFile)
      .on('error', reject)
      .on('end', resolve)
  })

  const buffer = await fs.promises.readFile(outFile)
  fs.promises.unlink(tmpFile).catch(() => {})
  fs.promises.unlink(outFile).catch(() => {})

  return await addExif(buffer, packname, author)
}

const MAX_MEDIA_COUNT = 5 

const handler = async (m, { conn }) => {
    const q = m.quoted ? m.quoted : m
    let mediaMsgs = Array.isArray(q.messages) ? q.messages : [q]
    const allMediaToProcess = mediaMsgs.filter(msg => {
        const mime = (msg.msg || msg).mimetype || ''
        return /image|video/.test(mime) && typeof msg.download === 'function'
    })
    if (allMediaToProcess.length === 0) {
        return conn.sendMessage(
            m.chat,
            { text: `✿ *من فضلك قم بالرد على صورة/فيديو واحدة أو مجموعة منهم لتحويلهم إلى ملصقات.*`, ...global.rcanal },
            { quoted: m }
        )
    }

    if (allMediaToProcess.length > MAX_MEDIA_COUNT) {
        return conn.sendMessage(
            m.chat,
            { text: `⚠️ **عذراً، عدد الوسائط (${allMediaToProcess.length}) كثير!**\nالحد الأقصى المسموح به هو ${MAX_MEDIA_COUNT} صور/فيديوهات فقط.`, ...global.rcanal },
            { quoted: m }
        )
    }

    const mediaToProcess = allMediaToProcess; 
    await m.react('🕒')
    const packname = global.botname || '𝑯𝑨𝑰𝑺𝑬𝑵'
    const author = global.namebot || '「♟️」⇇ 𝑲𝑨𝛫𝑨𝑺𝑯𝑰 𝐵𝛩𝑇 ⌬*'
    let successCount = 0
    for (const msg of mediaToProcess) {
        try {
            const media = await msg.download() 
            
            if (!media) throw new Error('فشل في تحميل الوسائط')

            const stiker = await sticker(media, false, packname, author)

            if (!Buffer.isBuffer(stiker)) throw new Error('فشل في إنشاء الملصق')
            await conn.sendMessage(m.chat, { sticker: stiker, ...global.rcanal }, { quoted: m })
            successCount++
            await new Promise(resolve => setTimeout(resolve, 500)) 

        } catch (e) {
            console.error('✘ فشل في معالجة وسيط:', e)
        }
    }

    if (successCount > 0) {
        await m.react('✅')
    } else {
        await m.react('❌')
        await conn.sendMessage(
            m.chat,
            { text: '✘ حدث خطأ أثناء تحويل الوسائط إلى ملصق\n╰─ لم نتمكن من تحويل أي وسيط. ربما لم يتم تحميل الوسائط بشكل صحيح.', ...global.rcanal },
            { quoted: m }
        )
    }
}

handler.help = ['ملصق']
handler.tags = ['sticker']
handler.command = ['ملصق'] 

export default handler
