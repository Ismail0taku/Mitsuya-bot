import pkg from '@itsukichan/baileys';
const { prepareWAMessageMedia } = pkg;

const handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🔊', key: m.key } });

    const harley = 'https://files.catbox.moe/ls0y4g.jpg';

    // تعريف المتغيرات المفقودة (أنت عدل القيم حسب نظامك)
    const taguser = m.sender.split('@')[0];
    const exp = 100;
    const role = 'مبتدئ';
    const limit = 10;

    const media = await prepareWAMessageMedia({ image: { url: harley } }, { upload: conn.waUploadToServer });

    await conn.sendMessage(m.chat, {
        image: { url: harley },
        caption: `*◡̈⃝🚩 ╎${taguser} 」*
~*⊹‏⊱≼━━━⌬〔🏮〕⌬━━━≽⊰⊹*
> *الــــصـــوتـــيـــات ˼🎙˹↶*
~*⊹‏⊱≼━━━⌬〔🏮〕⌬━━━≽⊰⊹*
*˼🗞˹╎نـــاعــم 」*
*˼🐙˹╎تـخـــيـــن 」*
*˼🕷˹╎صــاخــب 」*
*˼🐞˹╎عــمــيـق 」*
*˼🎋˹╎ســريــع 」*
*˼🐿˹╎ســـنــجـــاب 」*
*˼🤖˹╎روبــوت 」*
*˼🦀˹╎رفــيــع 」*
*˼🦩˹╎بـطــيء 」*
*˼🪳˹╎نــــاعـــم 」*
*⊹‏⊱≼━━━⌬〔🏮〕⌬━━━≽⊰⊹*`,
        mentions: [m.sender],
        footer: '𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓',
        
        headerType: 4 // نوع الرسالة مع صورة
    }, { quoted: m });
};

handler.help = ['اوامر'];
handler.tags = ['main'];
handler.command = ['م8'];

export default handler;