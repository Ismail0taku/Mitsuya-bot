import fetch from 'node-fetch'; 

function isArabic(text) {
    const arabicMatch = text.match(/[\u0600-\u06FF]/g);
    return arabicMatch && arabicMatch.length >= 3;
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
    
    if (!text) {
        return m.reply(`*⚠️ يرجى إدخال اسم المسلسل الذي تريد البحث عنه.*\n*مثال:*\n${usedPrefix + command} صراع العروش`);
    }

    try {
        let langPrefix, searchLang, apiUrl;

        if (isArabic(text)) {
            langPrefix = 'ar';
            searchLang = 'العربية';
            apiUrl = `https://ar.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(text)}&limit=1&namespace=0&format=json`;
        } else {
            langPrefix = 'en';
            searchLang = 'الإنجليزية/عام';
            apiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(text)}&limit=1&namespace=0&format=json`;
        }
        
        const searchRes = await fetch(apiUrl);
        const searchJson = await searchRes.json();
        
        const titles = searchJson[1];
        if (!titles || titles.length === 0) {
             return m.reply(`❌ عذراً، لم أجد مقالة مسلسل ذات صلة بموضوع "*${text}*" في ويكيبيديا (${searchLang}).`);
        }
        
        const title = titles[0];
        const url = searchJson[3][0];
       
        const contentUrl = `https://${langPrefix}.wikipedia.org/w/api.php?action=query&prop=extracts|info&exintro&explaintext&inprop=url&titles=${encodeURIComponent(title)}&format=json`;
        const contentRes = await fetch(contentUrl);
        const contentJson = await contentRes.json();
        
        const pages = contentJson.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract;

        if (!extract) {
            return m.reply(`❌ عذراً، لم يتم العثور على ملخص لمقالة المسلسل "*${title}*" في ويكيبيديا.`);
        }

        const responseText = `
*🎬 تفاصيل المسلسل: ${title}*
*━━━━━━━━━━━━*
*مصدر الشرح:* 📚 ويكيبيديا (${searchLang})
*الخلاصة:*
${extract.substring(0, 1500)}...

*رابط المقالة كاملاً:* 🔗
${url}
*━━━━━━━━━━━━*
        `;

        m.reply(responseText);

    } catch (e) {
        console.error(e);
        m.reply('⚠️ حدث خطأ أثناء معالجة طلب البحث عن المسلسل. يرجى التأكد من أن النص المدخل صحيح.');
    }
}

handler.help = ['مسلسل'];
handler.tags = ['search'];
handler.command = ['مسلسل', 'series', 'tvshow'];
handler.group = false; 
handler.limit = true; 

export default handler;
