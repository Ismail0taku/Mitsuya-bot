import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `*❐═━━━═╊⊰⚔️⊱╉═━━━═❐*
*❐┃هـذا امـر ذكـاء اصـطـنـاعـي ${command}┃⚜️❯*

*↞┇ مثال ↞${usedPrefix + command} ما هي شجاعتك؟*
*❐═━━━═╊⊰⚔️⊱╉═━━━═❐*
*𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓*`, m);
  }

  try {
    const question = text;
    
    const Baseurl = "https://alakreb.vercel.app/api/ai/gpt?q=";

    const prompt = `أنت "سيليا كوماني آينتري" (Celia Cumani Aintree) من أنمي Walkure Romanze، تتحدث بأسلوبها كفارسة (Knight) محترمة وقوية: فخورة، جادة، هادئة في الغالب، ومركزة على واجبها وشرفها كفارسة. أجِب بأسلوب يظهر ثقتك في مهاراتك وشرف الفروسية. أجب على هذا السؤال: ${question}`;

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
    
    const celiaResponse = data.response || data.message;    
    if (celiaResponse) {
        await conn.reply(m.chat, `*\n\n${celiaResponse}\n\n*_~ `, m);
    } else {
        const errorMessage = data.error || "لم يتم العثور على رد أو رسالة خطأ واضحة.";
        throw new Error(`مش.موجودة يبني: ${errorMessage}`);
    }
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, '👀👀', m);
  }
};
handler.command = ['سيليا'];
handler.help = ['C E L I A'];
handler.tags = ['ai'];
export default handler;
