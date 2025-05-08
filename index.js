const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
require('dotenv').config();
const groupName = process.env.GROUP_NAME?.toLowerCase() || 'mensajes';
const client = new Client({
    authStrategy: new LocalAuth(), // Guarda la sesión
});

let targetGroupId = null; // Aquí se guardará el ID del grupo "mensajes"

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea este código QR con tu WhatsApp');
});

client.on('ready', async () => {
    console.log('Cliente de WhatsApp listo');


    // Buscar el grupo llamado "mensajes"
    const chats = await client.getChats();
    const group = chats.find(chat => chat.isGroup && chat.name.toLowerCase() === groupName);

    if (group) {
        targetGroupId = group.id._serialized;
        console.log(`Grupo "mensajes" encontrado con ID: ${targetGroupId}`);
        client.sendMessage(targetGroupId, '🤖 El bot está activado y listo para funcionar. 🤖');
    } else {
        console.error('Grupo "mensajes" no encontrado. Asegúrate de estar en ese grupo.');
    }
});

client.on('message', async (msg) => {
    if (!targetGroupId) return; // Si aún no se ha encontrado el grupo, no hacer nada

    const chat = await msg.getChat();
    const contact = await msg.getContact();

    // No reenvíes mensajes que provienen del mismo grupo destino
    if (chat.id._serialized === targetGroupId) return;

    if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        if (media) {
            let caption = msg.body
                ? `Mensaje de ${contact.pushname}: ${msg.body}`
                : `Mensaje de ${contact.pushname}`;
            client.sendMessage(targetGroupId, new MessageMedia(media.mimetype, media.data, media.filename), { caption });
        }
    } else {

        if (chat.isGroup && msg.mentionedIds.includes(client.info.wid._serialized)) {
            const mention = `Te mencionaron en el grupo *${chat.name}* por ${contact.pushname}:\n\n${msg.body}`;
            client.sendMessage(targetGroupId, mention);
        }

        if (!chat.isGroup && msg.type === 'chat') {
            client.sendMessage(targetGroupId, `Usuario: *${contact.pushname}* | Mensaje: \n${msg.body}`);
        }
    }
});

client.on('error', (error) => {
    console.error('Error en el cliente de WhatsApp:', error);
    client.destroy();
    client = new Client({ authStrategy: new LocalAuth() });
});

client.initialize();
