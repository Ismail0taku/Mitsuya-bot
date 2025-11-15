import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const muteFile = path.join(__dirname, "muted-temp.json");
function loadMuted() {
  if (!fs.existsSync(muteFile)) return [];
  return JSON.parse(fs.readFileSync(muteFile));
}
function saveMuted(data) {
  fs.writeFileSync(muteFile, JSON.stringify(data, null, 2));
}
function extractPureNumber(jid) {
  return jid?.split("@")[0] || "";
}
const handler = async (m, { conn, text, groupMetadata }) => {
  if (!m.isGroup) {
    return conn.reply(m.chat, "الامر فقط في المجموعات.", m);
  }  
  let muted = loadMuted();
  const args = (text || "").trim().split(/\s+/);
  const command = args[0] || "";
  if (command === "تحرير") {
    saveMuted([]);
    return conn.reply(m.chat, "✅ تم تحرير جميع المكتومين.", m);
  }
  if (command === "حالة") {
    if (muted.length === 0) return conn.reply(m.chat, "ℹ️ لا يوجد أي عضو مكتوم حالياً في القروب 😠", m);
    const list = muted.map(jid => `- @${extractPureNumber(jid)}`).join("\n");
    return conn.sendMessage(
      m.chat,
      { text: `🔇 قائمة المكتومين:\n\n${list}`, mentions: muted },
      { quoted: m }
    );
  }
  const target = m.mentionedJid?.[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) {
    return conn.reply(m.chat, "❌ استخدم: .ميوت @منشن أو .ميوت الغاء @منشن أو .ميوت حالة أو .ميوت تحرير", m);
  }
  if (command === "الغاء") {
    if (!muted.includes(target)) return conn.reply(m.chat, "ℹ️ العضو غير مكتوم", m);
    muted = muted.filter(j => j !== target);
    saveMuted(muted);
    return conn.reply(m.chat, `✅ تم إلغاء ميوت من @${extractPureNumber(target)}.`, m, { mentions: [target] });
  }
  if (muted.includes(target)) return conn.reply(m.chat, "ℹ️ العضو مكتوم بالفعل.", m);
  muted.push(target);
  saveMuted(muted);
  return conn.reply(m.chat, `🔇 تم ميوت @${extractPureNumber(target)}.`, m, { mentions: [target] });
};
handler.before = async (m, { conn }) => {
  const muted = loadMuted();
  if (muted.includes(m.sender) && m.isGroup) { 
    try {
      await conn.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.key.participant || m.sender
        }
      });
    } catch (err) {
      console.error("فشل حذف رسالة المكتوم:", err.message);
    }
    return true; 
  }
  return false;
};
handler.help = ["ميوت"];
handler.tags = ["group"];
handler.command = /^ميوت$/i;
handler.group = true;
handler.admin = true; 
export default handler;
