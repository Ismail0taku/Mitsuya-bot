import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import * as fs from 'fs'       // ✅ تصحيح: تم استيراد fs بالكامل
import * as cheerio from 'cheerio' // ✅ تصحيح: حل مشكلة 'default' export لـ cheerio
import fetch from 'node-fetch'
import * as axios from 'axios'    // ✅ تصحيح: تم استيراد axios بالكامل
import moment from 'moment-timezone' 

global.owner = [
    ['9647767283928', 'مالك البوت', true], 
    ['201153573240', '𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓', true]
] 
global.mods = ['9647742589546'] // مشرفو البوت
global.prems = []  // مستخدمون مميزون

//BETA: Si quiere evitar escribir el número que será bot en la consola...
global.botNumberCode = "" 
global.confirmCode = "" 
global.gataJadibts = true // تفعيل البوتات الفرعية
global.isBaileysFail = false // لا تستخدم البوت من نفس الرقم

//---------[  إعدادات البوت الأساسية ]---------
global.emoji = '🔮'
global.emoji2 = '🍥'
global.namebot = ' ｢*𝑲𝒂𝒌𝒂𝒔𝒉𝒊 𝑩𝒐𝒕 *｣'
global.namebot = ' ｢*𝑲𝒂𝒌𝒂𝒔𝒉𝒊 𝑩𝒐𝒕 *｣'
global.botname = '𝐆𝐑𝐈𝐌𝐌𝐉𝐎𝐖' //بمختصر ذول  حقوق في الاستيكر او صانع ملصق ينحط ذا الاسم هناك وبس
global.packname = '𝑺𝑯𝜣𝑫𝜣𝑾 𝑩𝜣𝑻 𝑯𝑨𝒀𝑺𝑰 𝑪𝑯𝑨𝑵𝑵𝑬𝑳' //** اسم الشيء الي راح تسويلة اعادة توجية
global.author = ' 𝑺𝑯𝜣𝑫𝜣𝑾 𝑩𝜣𝑻 𝑯𝑨𝒀𝑺𝑰 𝑪𝑯𝑨𝑵𝑵𝑬𝑳' // اسم الشيء الي راح تسويلة اعادة توجية
global.user2 = '18'
global.sessions = 'MayBot' 
global.jadi = 'MayBots' 
global.yukiJadibts = true // تفعيل البوتات الفرعية
global.usedPrefix = '#'
global.moneda = 'MayCoins'
global.libreria = 'Baileys'
global.baileys = 'V 6.7.16'
global.multiplier = 850 
global.maxwarn = '4' 

global.openai_key = 'sk-...OzYy' 
global.openai_org_id = 'HITjoN7H8pCwoncEB9e3fSyW' 
global.Key360 = ['964f-0c75-7afc']
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']
global.keysxxx = global.keysZens[Math.floor(global.keysZens.length * Math.random())] 
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = global.keysxteammm[Math.floor(global.keysxteammm.length * Math.random())] 
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = global.keysneoxrrr[Math.floor(global.keysneoxrrr.length * Math.random())] 
global.lolkeysapi = "GataDiosV2"
global.fgkeysapi = "elrebelde21"
global.itsrose = ['4b146102c4d500809da9d1ff']
global.baileys = '@whiskeysockets/baileys'
global.apis = 'https://delirius-apiofc.vercel.app'

global.APIs = {
nrtm: 'https://fg-nrtm.ddns.net',
fgmods: 'https://api.fgmods.xyz',
xteam: 'https://api.xteam.xyz', 
dzx: 'https://api.dhamzxploit.my.id',
lol: 'https://api.lolhuman.xyz',
violetics: 'https://violetics.pw',
neoxr: 'https://api.neoxr.my.id',
zenzapis: 'https://api.zahwazein.xyz',
akuari: 'https://api.akuari.my.id',
akuari2: 'https://apimu.my.id',	
botcahx: 'https://api.botcahx.biz.id',
ibeng: 'https://api.ibeng.tech/docs',	
rose: 'https://api.itsrose.site',
popcat : 'https://api.popcat.xyz',
xcoders : 'https://api-xcoders.site' }

global.APIKeys = {
'https://api.fgmods.xyz': `${global.fgkeysapi}`,
'https://api.xteam.xyz': `${global.keysxteam}`,
'https://api.lolhuman.xyz': `${global.lolkeysapi}`,
'https://api.neoxr.my.id': `${global.keysneoxr}`,	
'https://violetics.pw': 'beta',
'https://api.zahwazein.xyz': `${global.keysxxx}`,
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://api.botcahx.biz.id': 'Admin',
'https://api.ibeng.tech/docs': 'tamvan',
'https://api.itsrose.site': 'Rs-Zeltoria',
'https://api-xcoders.site': 'Frieren' }


global.packname = '𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓'
global.author = 'kakashi'
global.wm = '𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓' 
global.botname = '𝐊𝐀𝐊𝐀𝐒𝐇𝐈 𝐁𝐎𝐓'
global.vs = '2.2.0' 

global.yt = 'https://www.youtube.com/@elrebelde.21'
global.tiktok = 'https://www.tiktok.com/@elrebelde.21'
global.md = 'https://github.com/elrebelde21/LoliBot-MD'
global.fb = 'https://www.facebook.com/elrebelde21'
global.face = 'https://www.facebook.com/groups/872989990425789/'
global.nna = 'https://whatsapp.com/channel/0029Va4QjH7DeON0ePwzjS1A' 
global.nna2 = 'https://whatsapp.com/channel/0029Vau57ykEwEk5CgosvU3v' 
global.nnaa = 'https://whatsapp.com/channel/0029Vae6j714Y9loutP3Au29' 
global.nn = 'https://chat.whatsapp.com/HNDVUxHphPzG3cJHIwCaX5' 
global.nnn = 'https://chat.whatsapp.com/KDBt6S54riRCIpSZspkxhg' 
global.nnnt = 'https://chat.whatsapp.com/GXNXKWSEckU1j1c7sItTxK' 
global.nnntt = 'https://chat.whatsapp.com/Em4Byf4w5VgHObPvZQlfnM' 
global.nnnttt = 'https://chat.whatsapp.com/JqcMEpuH7OW9gZNWbtZMnx' 
global.nnntttt = 'https://chat.whatsapp.com/ILAHJeZsHh973tQ96i2aqS' 
global.bot = 'wa.me/201153573240'

global.redes = [global.nna, global.nna2, global.yt, global.nn, global.nnn, global.nnnt, global.nnntt, global.nnnttt, global.nnntttt, global.md, global.tiktok, global.fb, global.face]

//------------------------[ Info | Datos - النصوص والانتظار ]---------------------------
global.wait = 'Calmao pa estoy procesando😎\n\n> *❗Por favor no hacer spam👏❗*'
global.waitt = '*⌛ _Cargando..._ ▬▬▭▭▭*'
global.waittt = '*⌛ _Cargando..._ ▬▬▬▬▭▭*'
global.waitttt = '*⌛ _Cargando..._ ▬▬▬▬▬▬▭*'
global.waittttt = '*⌛ _Cargando..._ ▬▬▬▬▬▬▬*'
global.rg = '『✅ 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎 ✅』\n\n'
global.resultado = global.rg
global.ag = '『⚠️ 𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 ⚠️』\n\n'
global.advertencia = global.ag
global.iig = '『❕ 𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊𝙉 』\n\n'
global.informacion = global.iig
global.fg = '『❌ 𝙀𝙍𝙍𝙊𝙍 ❌』\n\n'
global.fallo = global.fg
global.mg = '『❗️ 𝙇𝙊 𝙐𝙎𝙊 𝙈𝘼𝙇❗』\n\n'
global.mal = global.mg
global.eeg = '『📩 𝙍𝙀𝙋𝙊𝙍𝙏𝙀 📩』\n\n'
global.envio = global.eeg
global.eg = '『💚 𝙀𝙓𝙄𝙏𝙊𝙎 💚』\n\n'
global.exito = global.eg

try {
  global.imagen = fs.readFileSync('./Menu2.jpg')
  global.imagen1 = fs.readFileSync('./media/Menu1.jpg')
  global.imagen2 = fs.readFileSync('./media/Menu2.jpg')
  global.imagen3 = fs.readFileSync('./media/Menu3.jpg')
  global.imagen4 = fs.readFileSync('./media/Menu4.jpg')
} catch (e) {
  console.log(chalk.red('⚠️ تنبيه: تعذر قراءة بعض ملفات الصور المحلية. سيتم استخدام روابط URL.'))
  global.imagen = 'https://files.catbox.moe/c8ao8e.jpg' 
  global.imagen1 = 'https://files.catbox.moe/c8ao8e.jpg'
  global.imagen2 = 'https://files.catbox.moe/c8ao8e.jpg'
  global.imagen3 = 'https://files.catbox.moe/c8ao8e.jpg'
  global.imagen4 = 'https://files.catbox.moe/c8ao8e.jpg'
}

global.img1 = 'https://files.catbox.moe/md5i1v.jpg'
global.img2 = 'https://files.catbox.moe/md5i1v.jpg'
global.imagen5 = 'https://files.catbox.moe/c8ao8e.jpg'
global.imagen6 = 'https://files.catbox.moe/c8ao8e.jpg'
global.menu18 = 'https://files.catbox.moe/c8ao8e.jpg'
global.vid1 = 'https://files.catbox.moe/c8ao8e.jpg'
global.img = [global.imagen, global.imagen1, global.imagen2, global.imagen3, global.imagen4]
global.imageUrl = ["https://files.catbox.moe/md5i1v.jpg", "https://files.catbox.moe/md5i1v.jpg", "https://files.catbox.moe/md5i1v.jpg"]

global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

if (!Array.prototype.getRandom) {
    Array.prototype.getRandom = function () {
        return this[Math.floor(Math.random() * this.length)];
    };
}

global.ch = {
ch1: '120363340261499294@newsletter', 
ch2: '120363340261499294@newsletter', 
ch3: '120363340261499294@newsletter',
ch4: '120363340261499294@newsletter',
global.idcanal = '120363402491372133@newsletter' //خاصية اعادة توجية 
global.idcanal2 = '120363402491372133@newsletter' //خاصية دعم اعادة توجية ...
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("تم تحديث 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
