import Jimp from 'jimp';

const handler = async (m, { conn }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";

    if (!mime.startsWith("image")) return conn.reply(m.chat, '🖼️ الرجاء إرسال صورة أو الرد عليها.', m);

    const img = await q.download?.();
    if (!img) return conn.reply(m.chat, '⚠️ لم يتمكن البوت من تحميل الصورة.', m);

    const image = await Jimp.read(img);

    conn.reply(m.chat, '`♻️ جاري تحويل الصورة إلى كرتون...`', m);
    image.convolute([
      [-1, -1, -1],
      [-1, 9, -1],
      [-1, -1, -1]
    ]);

    image.contrast(0.3).brightness(0.1);

    const maxHeight = 1080;
    if (image.bitmap.height < maxHeight) {
      const ratio = maxHeight / image.bitmap.height;
      image.resize(image.bitmap.width * ratio, maxHeight);
    }

    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    await conn.sendFile(m.chat, buffer, 'cartoon_hd.jpg', '✅ تم تحويل الصورة إلى كرتون HD بنجاح!', m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `⚠️ حدث خطأ أثناء تحويل الصورة: ${error.message}`, m);
  }
};

handler.help = ["لكرتون"];
handler.tags = ["ai"];
handler.command = /^لكرتون$/i;
export default handler;