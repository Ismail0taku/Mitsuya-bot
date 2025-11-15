import fs from "fs";
const DURATION = 60000;
const PRIZE = 500;
const GAME_DATA_FILE = "./src/game/كت.json"; 
function getData(file) {
    if (!fs.existsSync(file)) return [];
    try { 
        return JSON.parse(fs.readFileSync(file, "utf8")); 
    } catch { 
        return []; 
    }
}
let handler = async (m, { conn }) => {
    conn.tekateki = conn.tekateki || {};
    const chatId = m.chat; 
    
    if (chatId in conn.tekateki) 
        return conn.reply(chatId, "⚠️ هناك لعبة جارية حالياً. يرجى الانتظار.", conn.tekateki[chatId][0]);
        
    const gameData = getData(GAME_DATA_FILE);
    
    if (gameData.length === 0) 
        return conn.reply(chatId, "حدث خطأ ", m);
        
    const { question: wordDisplay, response: correctAnswer } = gameData[Math.floor(Math.random() * gameData.length)]; 
    
    const startMsg = `*❖━═━═━═『🧊』═━═━═━❖*
*「⚡」⇇ ↶ اكتب الكلمة كما هي للفوز*
*「📝」⇇ الكلمة ↜* 『${wordDisplay}』
*「🧸」⇇ الجائزة ↜* ${PRIZE} نقطة
*「🕐」⇇ الوقت ↜* ${DURATION / 1000} ثانية
*「🚪」⇇ استخدم "انسحب" للانسحاب*
*❖━═━═━═『🧊』═━═━═━❖*
*「🌹」⇇ المطور: 𝑯𝑨𝑰𝑺𝑬𝑵*
*「❄️」⇇   البوت : 𝑲𝑨𝫫𝑨𝑺𝑯𝑰 𝐵𝫩𝑇 ⌬*
*❖━═━═━═『🧊』═━═━═━❖*`;
    
    const gameMsg = await conn.reply(chatId, startMsg, m);
    conn.tekateki[chatId] = [
        gameMsg, 
        { response: correctAnswer }, 
        PRIZE, 
        setTimeout(() => {
            if (conn.tekateki[chatId]) {
                conn.reply(chatId, `*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋๋︩︪︩︪─═͜⊐❪🔮❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐*
｢❌｣⇇ انتهى الوقت! 
｢✅｣⇇ الإجابة الصحيحة كانت: ${correctAnswer}
*⊏─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋๋︩︪︩︪─═͜⊐❪🔮❫⊏═─๋︩︪─๋︩︪─๋︩︪─๋︩︪─๋︩︪─⊐* `, conn.tekateki[chatId][0]);
                delete conn.tekateki[chatId];
            }
        }, DURATION)
    ];
};
handler.command = /^كت$/i;
export default handler;
