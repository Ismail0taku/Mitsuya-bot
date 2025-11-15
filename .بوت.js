import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  let audio = 'https://files.catbox.moe/mw0iiy.opus';
  const المطور = 'إسم المطور';
  const البوت = 'إسم البوت';
  const القناه = 'https://link.to.channel';
  const nomorown = global.nomorown || '201068866380'; 
  let thumbnail;
  try {
    thumbnail = await (await fetch('https://files.catbox.moe/dw1pht.jpg')).buffer();
  } catch (e) {
    console.error('فشل في جلب الصورة :', e);
    thumbnail = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  }

  await conn.sendMessage(m.chat, {
    audio: { url: audio },
    mimetype: 'audio/mp4',
    ptt: true,
    fileName: 'RADIO-DEMON.mp3',
    contextInfo: {
      externalAdReply: {
        title: المطور,
        body: البوت,
        thumbnail: thumbnail,
        mediaType: 1,
        renderLargerThumbnail: true,
        mediaUrl: القناه,
        sourceUrl: `https://wa.me/${nomorown}` 
      }
    }
  }, {
    quoted: m,
    buttons: [
      { buttonId: '.الاوامر', buttonText: { displayText: '🧾 عرض الأوامر' }, type: 1 }
    ],
    headerType: 1
  });
};

handler.customPrefix = /^(بوت|يا بوت)$/i;
handler.command = new RegExp;
export default handler;
