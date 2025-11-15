/*
*السكراب  اسهل سكراب في حياتك ممكن تسوية🗿
*صناع هايسن
*/

import { unlinkSync, readFileSync, promises as fsPromises } from 'fs'

import { join } from 'path'

import { exec } from 'child_process'

const getRandom = (ext) => {

    return `${Math.floor(Math.random() * 100000)}${ext}`

}

let handler = async (m, { conn, __dirname, usedPrefix, command }) => {

    try {

        let q = m.quoted ? m.quoted : m

        let mime = ((m.quoted ? m.quoted : m.msg).mimetype || '')

        let set = ''

        if (/عميق/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30'

        if (/منفوخ/.test(command)) set = '-af acrusher=.1:1:64:0:log'

        if (/تخين/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'

        if (/صاخب/.test(command)) set = '-af volume=12'

        if (/سريع/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'

        if (/تخينن/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'

        if (/رفيع/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'

        if (/تقطيع/.test(command)) set = '-filter_complex "areverse"'

        if (/روبوت/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'

        if (/بطيء/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'

        if (/ناعم/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'

        if (/سنجاب/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'

        if (/audio/.test(mime) && set !== '') {   

            let mediaBuffer = await q.download()

            let tmpDir = join(__dirname, '../tmp/') 

            let inputFile = join(tmpDir, getRandom('.mp3')) 

            let outputFile = join(tmpDir, getRandom('.mp3'))     
      
            await fsPromises.writeFile(inputFile, mediaBuffer) 

            const ffmpegCommand = `ffmpeg -i ${inputFile} ${set} -c:a libmp3lame ${outputFile}`;            

            exec(ffmpegCommand, async (err, stderr, stdout) => {     

                try { await unlinkSync(inputFile) } catch {}             

                if (err) {

                    try { await unlinkSync(outputFile) } catch {}

                    console.error("FFmpeg Error Details:", stderr);

                    throw `حدث خطأ أثناء معالجة الصوت: ${err.message}` 

                }

                let buff = await readFileSync(outputFile)      
          
                conn.sendFile(m.chat, buff, outputFile, 'تم تعديل الصوت بنجاح!', m, false, {

                    type: 'audioMessage', 

                    mimetype: 'audio/mp4' 

                })

                try { await unlinkSync(outputFile) } catch {}

            })       
    
        } else {

            throw `*رد على الصوت الذي تريد تحويله، استخدم الامر التالي ${usedPrefix + command}*`

        }

    } catch (e) {

        throw e

    }

}

handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai'].map(v => v + ' [vn]')

handler.tags = ['audio']

handler.command = /^(عميق|منفوخ|تخين|صاخب|سريع|تخينن|رفيع|تقطيع|روبوت|بطيء|ناعم|سنجاب)$/i

export default handler
