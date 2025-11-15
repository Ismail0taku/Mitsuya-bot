import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type'
export default async function uploadImage(buffer) {
    try {
        const fileInfo = await fileTypeFromBuffer(buffer);
        if (!fileInfo || !fileInfo.mime.startsWith('image/')) {
            throw '❌ الملف ليس صورة صالحة للرفع.';
        }          
        const { ext, mime } = fileInfo;        
        let form = new FormData();
        form.append('reqtype', 'fileupload'); 
        const blob = new Blob([buffer], { type: mime }); 
        form.append('fileToUpload', blob, `temp.${ext}`); // Catbox يستخدم 'fileToUpload'
        const res = await fetch('https://catbox.moe/user/api.php', {
            method: 'POST',
            body: form,
        });
        const link = await res.text();
        if (!link.startsWith('http')) {
            console.error('Catbox Upload Error Response:', link);
            throw `فشل رفع الصورة على Catbox.moe: ${link.trim()}`;
        }
        return link.trim(); // إرجاع الرابط النظيف
    } catch (e) {
        console.error('Catbox Upload Function Error:', e);
        throw `فشل رفع الصورة: ${e.message || e}`;
    }
}
