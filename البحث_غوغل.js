import axios from 'axios'
import fetch from 'node-fetch'
let handler = async (m, { conn, command, args }) => {
    
    let text = args.join` `
    if (!text) return conn.reply(m.chat, ' *˼🍒˹ هــــات الــنــص الــي هــتـبـحـــث عـلــيـه ↶* ', m)
    
    await m.react('🔍') // إضافة تفاعل

    try {
        const searchResults = await google.search({ queries: [text] }); 
        if (!searchResults || !searchResults.result) {
            return m.reply('❌ لم يتم العثور على نتائج للبحث.');
        }
        let msg = searchResults.result;
        let searchUrlForScreenshot = 'https://www.google.com/search?q=' + encodeURIComponent(text)
        const API_KEY = 'YOUR_API_KEY_HERE'; 
        const screenshotApiUrl = `https://api.screenshotmachine.com?key=${API_KEY}&url=${encodeURIComponent(searchUrlForScreenshot)}&dimension=1280x800&format=jpg`;
        try {
            const response = await fetch(screenshotApiUrl);            
            if (response.ok) {
                const ss = await response.buffer();
                await conn.sendFile(m.chat, ss, 'result.png', `*نتائج البحث عن: ${text}*\n\n` + msg, m)
            } else {
                m.reply(` تم البحث بنجاحولكن فشلت محاولة إنشاء لقطة شاشة.\n\n` + msg)
            }            
        } catch (screenshotError) {
            console.error('Screenshot attempt failed:', screenshotError);
            m.reply(` تم البحث .\n\n` + msg)
        }
    } catch (apiError) {
        console.error(apiError)
        m.reply('❌ حدث خطأ أثناء إجراء عملية البحث. يرجى المحاولة لاحقاً.')
    }
}
handler.help = ['google', 'googlef'].map(v => v + ' <pencarian> ')
handler.tags = ['internet']
handler.command = /^غوغل?$/i
export default handler
