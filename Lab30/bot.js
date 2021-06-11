const TelegramBot = require("node-telegram-bot-api")

const token = ''
const bot = new TelegramBot(token, { polling: true })

bot.on("message", (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, `echo: ${msg.text}`)
})

//как работает long poll
//бот работает  с сервером телеги
//параметр polling говорит, что бот постоянно опрашивает сервер
//о новых событиях, например о наших письмах
//когда бот отключен, на письма нет ответа, а при включении бот спрашивает сервер
//есть ли для него сообщения, получает наши новые и обрабатывает их

//long polling как средство поддержания постоянной связи с сервером
//альтернатива веб-сокетам, но хреновенькая