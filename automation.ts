const schedule = require('node-schedule');
const TelegramBot = require("node-telegram-bot-api");
const { getChores } = require('./utils');
const { Message } = require('node-telegram-bot-api')


const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 1;
rule.hour = 11
rule.minute = 34

const rule2 = new schedule.RecurrenceRule();
rule2.hour = 9
rule2.minute = 32

export function runAutomation(msg: typeof Message, bot: typeof TelegramBot) {
  const job = schedule.scheduleJob(rule, async function () {
    await bot.sendMessage(msg.chat.id, 'Bueno, llegó el momento papijas:')
    const chores = await getChores()
    const text = Object.entries(chores).map(([user, chore])=>`@${user}: ${chore}`).join('\n')
    await bot.sendMessage(msg.chat.id, text)
  });

  const job2 = schedule.scheduleJob(rule2, async function() {
    await bot.sendMessage(msg.chat.id, 'Buen dia pavergas \nEspero que hayan descansado \nY que este dia se acuerden de cerrar las puertas de los baños \nSino les hackeo el home banking \nGracias. ')
  })
}