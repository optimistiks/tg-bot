import { Telegraf } from "telegraf/typings/telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import logger from "../logger";
// import saveScore from "../utils/saveScore";
// import { Score } from "../types";

const lolRegex = [/^лол$/i];

export default function lolMiddleware(bot: Telegraf<TelegrafContext>): void {
  bot.hears(lolRegex, async (ctx, next) => {
    const message = ctx.update.message;
    const replyToMessage = message?.reply_to_message;

    if (!message || !replyToMessage || !message.from || !replyToMessage.from) {
      logger.info("bad data");
      return next();
    }

    // const score: Score = {
    //   messageId: replyToMessage.message_id,
    //   authorId: replyToMessage.from?.id,
    //   scorerId: message.from?.id,
    //   chatId: message.chat.id,
    // };

    // if (score.authorId === score.scorerId) {
    //   logger.info("same author");
    //   return;
    // }

    try {
      // await saveScore(score);
      logger.info("score saved");
      ctx.reply(
        `${replyToMessage.from?.first_name} +1 лол от ${message.from?.first_name}`,
        // eslint-disable-next-line
        { reply_to_message_id: replyToMessage.message_id }
      );
    } catch (err) {
      logger.error(err, "could not score");
    }

    return next();
  });
}
