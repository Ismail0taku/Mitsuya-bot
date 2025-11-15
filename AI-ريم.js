import fetch from "node-fetch";
let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("*اكتب شيئًا لريم. مثال: .ريم كيف نشرب عصير ؟*");
  }
  await m.reply("*سأرد عليك بعد قليل... انتظر 100 وتلقائي رديت عليك😏*");
  try {
    let result = await AskRem(text);
    await m.reply(`*🌸 ريم تقول:*\n${result}`);
  } catch (e) {
    console.error("خطأ في استدعاء ريم:", e.message);
    await m.reply(`👀👀 حدث خطأ. برجاء المحاولة لاحقًا.`);
  }
};

handler.help = ["ريم"];
handler.tags = ["ai"];
handler.command = /^(ريم)$/i;

export default handler;
async function AskRem(question) {
  const Baseurl = "https://alakreb.vercel.app/api/ai/gpt?q=";
  const prompt = `أنت ريم من أنمي Re:Zero، تتحدث بأسلوبها: وقح، حاد أحيانًا، صريح، وتضيف لمسة من التدليل أحيانًا. لا تستخدم المجاملات الزائدة. أجب على هذا السؤال: ${question}`;
  const response = await fetch(Baseurl + encodeURIComponent(prompt));
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`مشكلة في الوصول للخادم. حالة HTTP: ${response.status}.`);
  }
  let data;
  try {
      data = await response.json();
  } catch (jsonError) {
      throw new Error("الخادم لم يُرجع استجابة بتنسيق JSON صالح.");
  }
  const remResponse = data.response || data.message;  
  if (!remResponse) {
    const errorMessage = data.error || "لم يتم العثور على رد أو رسالة خطأ واضحة.";
    throw new Error(`معليش ريم نايمة 🗿🚬 | ${errorMessage}`);
  }
  return remResponse;
}
