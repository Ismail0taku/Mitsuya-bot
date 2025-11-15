import fs from 'fs';
let timeout = 60000;
let poin = 500;
let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;    
    if (id in conn.tekateki) {
        conn.reply(m.chat, '*❍━━━══━━❪🌸❫━━══━━━❍*\n*｢❤️｣⇇مزال هناك سؤال هنا*\n*❍━━━══━━❪🌸❫━━══━━━❍*', conn.tekateki[id][0]);
        throw false;
    }
    let tekateki;
    try {
        tekateki = JSON.parse(fs.readFileSync(`./src/game/تاريخ.json`));
    } catch (e) {
        console.error('Error reading تاريخ.json:', e);
        return conn.reply(m.chat, '❌ فشل قراءة ملف الأسئلة. تأكد من وجود الملف في ./src/game/تاريخ.json', m);
    }    
    let json = tekateki[Math.floor(Math.random() * tekateki.length)];
    let _clue = json.response;
    let caption = `*｢🍭｣⇇ السؤال↶*
> ❀ ${json.question} ❀
*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*
*｢🍥｣⇇الاعـب↜❪@${m.sender.split('@')[0]}❫*
*｢🍭｣⇇ الوقت↜❪${(timeout / 1000).toFixed(2)} ثانية❫*
*｢🍡｣⇇ الجائزة↜❪ ${poin} نقطة❫*
*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*

*❍━━━══━━❪🌸❫━━══━━━❍*`.trim();
    conn.tekateki[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*\n*｢🍬｣⇇انتهى الوقت💔*\n*｢🍡｣⇇الاجابة↜❪${json.response}❫*\n*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─═͜⊐❪🍬❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*`, conn.tekateki[id][0]);
            delete conn.tekateki[id];
        }, timeout)
    ];
};
handler.help = ['تاريخ'];
handler.tags = ['game'];
handler.command = /^(تاريخ)$/i;
export default handler;