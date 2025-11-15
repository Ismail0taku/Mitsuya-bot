import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `*❐═━━━═╊⊰🏯⊱╉═━━━═❐*
*❐┃هـذا امـر ذكـاء اصـطـنـاعـي ${command}┃🛑❯*

*↞┇ مثال ↞${usedPrefix + command} من انت؟*
*❐═━━━═╊⊰🏯⊱╉═━━━═❐*
*𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓*`, m);
  }

  try {
    const question = text;
    
    const Baseurl = "https://alakreb.vercel.app/api/ai/gpt?q=";

    const prompt = `أنت "شادو تتكلم بروح عالية تجاوب اهم شيء عندك تباهي : ${question}`;

    const response = await fetch(Baseurl + encodeURIComponent(prompt));

    if (!response.ok) {
        throw new Error(`مشكلة في الوصول للخادم. حالة HTTP: ${response.status}.`);
    }

    let data;
    try {
        data = await response.json();
    } catch (jsonError) {
        throw new Error("الخادم لم يُرجع استجابة بتنسيق JSON صالح.");
    }
    
    const shadowResponse = data.response || data.message;
    
    if (shadowResponse) {
        await conn.reply(m.chat, `*« شــادو »*\n\n${shadowResponse}`, m);
    } else {
        const errorMessage = data.error || "لم يتم العثور على رد أو رسالة خطأ واضحة.";
        throw new Error(`فشل شادو في الرد: ${errorMessage}`);
    }

  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, 'خطأ', m);
  }
};
handler.command = ['شادو'];
handler.help = ['Z A C K'];
handler.tags = ['ai'];
export default handler;
