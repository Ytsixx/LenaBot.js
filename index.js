/* index.js — CommonJS */
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@itsukichan/baileys')
const { Boom } = require('@hapi/boom')
const fs = require('fs');
const pino = require('pino');
const path = require('path');
const Pino = require('pino');

// iss 
var _db_ = require("./config/settings.json")
var w5w = require("./lib/dataUtils.js");
var { formatarDataCompleta } = w5w

const resultado = formatarDataCompleta();

const { dono, bot, config, servidor } = _db_



async function connectToWhatsApp () {
  const { state, saveCreds } = await useMultiFileAuthState('./auth')
  const { version } = await fetchLatestBaileysVersion()
      /* coracao de tudo */
  const client = sock = lena = makeWASocket({
    printQRInTerminal: true,
    browser: ["Linux", "Safari", "20.0.04"],
    logger: Pino({ level: 'silent' }),
    auth: state,
    shouldSyncAppState: true,
    markOnlineOnConnect: true,
    timeoutMs: 60000,
      patchMessageBeforeSending: (message) => {
      if (message?.interactiveMessage) {
message = {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadataVersion: 2,
deviceListMetadata: {},
},
...message,
},
},
};
}
        return message;
        }
          });

  /* ------------------------- Eventos -------------------------- */
  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'close') {
      const statusCode = new Boom(lastDisconnect?.error).output?.statusCode
      const shouldReconnect = statusCode !== DisconnectReason.loggedOut
      console.log('Conexão encerrada:', lastDisconnect?.error)

      if (shouldReconnect) connectToWhatsApp()
    }
    if (connection === 'open') {
      console.log('📶Conectado!')
    lena.updateProfileStatus(`Última Atualização: ${resultado}`)
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    try {
      const info = messages[0]
      if (!info.message) return // só mensagens novas
      if (info.key && info.key.remoteJid === 'status@broadcast') return;
      const from = info.key.remoteJid;
      const isGroup = from.endsWith('@g.us');
      const isStatus = from.endsWith('@broadcast');
      const isNewsLettet = isChannel = from.endsWith('@newsletter')
      const mych = meuCanal = canal = config.canalUrl
      const m = info
      const key = { remoteJid: info.key.remoteJid,
          id: info.key.id, participant: info.key.participant
      }
      
     // tetequitor de Mensagem
     async function getMessageType(info) {
         if (!info || !info.message) return null;
         const keys = Object.keys(info.message);
  
         // Remove chaves auxiliares
         const filtered = keys.filter(key =>
            key !== 'senderKeyDistributionMessage' &&
            key !== 'messageContextInfo'
          );
          
          // Retorna o tipo principal da mensagem
          return filtered[0] || null;
        }
        
        
        const getGroupAdmins = (participants) => {
         const admins = participants
        .filter(participant => participant.admin === "superadmin" || participant.admin === "admin")
        .map(participant => participant.id);

            return admins;
        };
        const getMembros = (participants) => {
        admins = []
        for (let i of participants) {
        if(i.admin == null) admins.push(i.id)
        }
        return admins
        }
      
      // config de grupo...
      const groupMetadata = isGroup ? await lena.groupMetadata(from) : ''
      const groupMembers = isGroup ? groupMetadata.participants : ''
      const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
      const groupDesc = isGroup ? groupMetadata.desc : ''
      const groupName = isGroup ? groupMetadata.subject : ''
      
        const mentions = (teks, memberr, id) => {
        (id == null || id == undefined || id == false) ? lena.sendMessage(from, {text: teks.trim(), mentions: memberr}) : lena.sendMessage(from, {text: teks.trim(), mentions: memberr})
          }

      
      // eu voce nos
      const criador = `${dono.numero}`+config.idy
      const sender = isGroup ? info.key.participant : info.key.remoteJid
      const pushname = info.pushName ? info.pushName : ""
      const numeroBot = lena.user.id.split(":")[0]+config.idy
      
      
      
      
      
      
      
      /// is is is 
      const isGroupAdmins = groupAdmins.includes(sender) || false || dono.numero
      const isBotAdmins = groupAdmins.includes(numeroBot) || false
      
      var body = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || info?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || info.message?.editedMessage?.message?.protocolMessage?.editedMessage?.imageMessage?.caption || info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || info.message?.buttonsResponseMessage?.selectedButtonId || info.message?.listResponseMessage?.singleSelectReply?.selectedRowId || info.message?.templateButtonReplyMessage?.selectedId || JSON.parse(info.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || '{}')?.id ||
           info?.text || '';

        var Procurar_String = info.message?.conversation || info.message?.viewOnceMessageV2?.message?.imageMessage?.caption || info.message?.viewOnceMessageV2?.message?.videoMessage?.caption || info.message?.imageMessage?.caption || info.message?.videoMessage?.caption || info.message?.extendedTextMessage?.text || info.message?.viewOnceMessage?.message?.videoMessage?.caption || info.message?.viewOnceMessage?.message?.imageMessage?.caption || info.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || info.message?.buttonsMessage?.imageMessage?.caption || ""
        
        
        
        const isCmd = body.startsWith(config.prefixo)
        const prefixo = p = px = config.prefixo
        const comando = command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null;
        const args = body.trim().split(/ +/).slice(1)
        const q = args.join(' ')
        const x = args.join(' ')
        const nome = pushName = info.pushName ? info.pushName: 'nomeBot'
      
    
    
    
    
    
    
    
      const isGroupMessage = from.includes('@g.us');
const dispositivo = '' + (info.key.id.length > 21 ? 'Android' : info.key.id.substring(0, 2) == '3A' ? 'iOS' : 'WhatsApp Web');


//const linha = '♡･｡♡･｡･'.repeat(7);
if (isGroupMessage) {
  console.log(`
┃ 🤖 $ {nomeBot} - 📡 Mensagem de Grupo
┃ 
┃ 🌐 Grupo       : ${groupName}
┃ 🧑 Usuário     : ${pushname}
┃ 🆔 ID Grupo    : ${from}
┃ 💬 Conteúdo    : ${body.length > 300 ? '(mensagem longa)' : body}
┃ 📱 Dispositivo : ${dispositivo}
  `.trim());
} else if (isChannel) {
  console.log(`
┃ 🤖 $ {nomeBot} - 📢 Mensagem de Canal
┃ 
┃ 🆔 ID Canal    : ${from}
┃ 💬 Conteúdo    : ${body.length > 300 ? '(mensagem longa)' : body}
┃ 📱 Dispositivo : ${dispositivo}
  `.trim());
} else {
  console.log(`
┃ 🤖 $ {nomeBot} - 💬 Mensagem Privada
┃
┃ 🧑 Usuário     : ${pushname}
┃ 🆔 ID Usuário  : ${from}
┃ 💬 Conteúdo    : ${body.length > 300 ? '(mensagem longa)' : body}
┃ 📱 Dispositivo : ${dispositivo}
  `.trim());
}



switch (comando || command) {

case 'oi': {
  await lena.sendMessage(from, {text: "ola"})
  break;
}



default:
// if aquiiiii
}



      
      
    } catch (err) {
      console.error('Error:', err);
      
    }
    /* ainda nao sei uqui colocar aquo */
    
  })
  // Salva a sessão sempre que mudar
  sock.ev.on('creds.update', saveCreds)
}

/* ------------- Inicialização com log ----------- */
connectToWhatsApp().catch(err => console.error('Erro fatal:', err))