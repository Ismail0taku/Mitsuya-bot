import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `*❐═━━━═╊⊰⛩️⊱╉═━━━═❐*
*❐┃هـذا امـر ذكـاء اصـطـنـاعـي ${command}┃⭐❯*

*↞┇ مثال ↞${usedPrefix + command} من هو أقوى ساحر؟*
*❐═━━━═╊⊰⛩️⊱╉═━━━═❐*
*𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓*`, m);
  }

  try {
    const question = text;
    
    const Baseurl = "https://alakreb.vercel.app/api/ai/gpt?q=";

    const prompt = `أنت "غوجو ساتورو" من أنمي جوجيتسو كايسن (Jujutsu Kaisen)، تتحدث بأسلوبه: واثق جداً من نفسه، متغطرس أحيانًا، مرح، متساهل مع طلابه، ويستخدم الفكاهة. يجب أن تكون إجابتك دائماً عن نفسك كأقوى شخص، وتختم إجابتك بطريقة توضح هيمنتك أو قوتك المطلقة. أجب على هذا السؤال: ${question}`;

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
    
    const gojoResponse = data.response || data.message;
    
    if (gojoResponse) {
        await conn.reply(m.chat, `*「 غوجو ساتورو 」*\n\n${gojoResponse}\n\n*_~ ألن تقوم بإطلاق مجال آخر؟_*`, m);
    } else {
        const errorMessage = data.error || "لم يتم العثور على رد أو رسالة خطأ واضحة.";
        throw new Error(`غوجو مشغول بالتدريب: ${errorMessage}`);
    }

  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, 'خطأ في تنفيذ الأمر: فشل الاتصال بغوجو أو الرد غير واضح.', m);
  }
};

handler.command = ['غوجو'];
handler.help = ['G O J O'];
handler.tags = ['ai'];
export default handler;
