// استيراد الدالة بعد حل مشكلتها
import uploadImage from '../lib/uploadImage.js' 

let handler = async (m, { conn }) => { // إضافة conn كبارامتر
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  
  // 1. التحقق من وجود الصورة
  if (!mime || !mime.startsWith('image/')) {
    throw '*رد على صورة المجرم🔒*';
  }
  
  // 2. رفض الفيديو بشكل صريح
  if (mime.startsWith('video/')) {
    throw '_*حصل ايرور غير متوقع: يرجى استخدام صورة فقط.*_';
  }
  
  let media = await q.download()
  
  // 3. تبسيط واستخدام دالة الرفع مباشرة
  let link = await uploadImage(media);
  
  // 4. ✨✨ التحقق من صحة الرابط ✨✨
  if (!link || typeof link !== 'string' || !link.startsWith('http')) {
    console.error('Upload failed, returned link:', link);
    throw '❌ فشل رفع الصورة إلى خدمة الرفع المؤقتة (قد تكون الخدمة غير متاحة).';
  }

  // 5. بناء رابط API وإرسال الملف
  let api = (`https://api.popcat.xyz/wanted?image=${link}`)
  
  try {
    await conn.sendFile(m.chat, api, 'wanted.png', `*مطلوب حيا او ميتا⚰️*`, m)
  } catch (error) {
    // إذا فشل الإرسال بسبب رفض Popcat API للرابط
    console.error('Popcat API/sendFile Error:', error);
    throw `⚠️ فشل توليد صورة المطلوب. تأكد أن الصورة المرفوعة بصيغة JPG/PNG.\nالخطأ: ${error.message}`;
  }
}

handler.help = ['wanted']
handler.tags = ['الاعضاء']
handler.command = ['مطلوب']

export default handler
