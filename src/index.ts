import { Telegraf } from "telegraf";
import logger from "./logger";

const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => {
  logger.info("got start, replying welcome");
  ctx.reply("Welcome");
});

bot.help((ctx) => {
  logger.info("got help, replying send me");
  ctx.reply("Send me a sticker");
});

bot.on("sticker", (ctx) => {
  logger.info("got sticker, replying thumbs");
  ctx.reply("👍");
});

bot.hears("hi", (ctx) => {
  logger.info("got hi, replying hey there");
  ctx.reply("Hey there");
});

logger.info("starting bot...");
bot
  .launch()
  .then(() => {
    logger.info("bot is online");
  })
  .catch((err) => {
    logger.error(err, "could not start bot");
    throw err;
  });
