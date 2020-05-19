import Telegraf from "telegraf";
import * as admin from "firebase-admin";
import { TelegrafContext } from "telegraf/typings/context";
import logger from "./logger";

const lolRegex = [/^лол$/i];

interface Score {
  messageId: number;
  authorId: number;
  scorerId: number;
  chatId: number;
}

function saveScore(score: Score): Promise<void> {
  const scoreId = `${score.scorerId}${score.messageId}${score.chatId}`;
  return admin.firestore().runTransaction(async (transaction) => {
    const scoreRef = admin.firestore().collection("score").doc(scoreId);
    const scoreDoc = await transaction.get(scoreRef);
    if (scoreDoc.exists) {
      throw new Error("could not score, already scored");
    }
    transaction.create(scoreRef, score);
  });
}

export default function lolHandler(bot: Telegraf<TelegrafContext>): void {
  bot.hears(lolRegex, async (ctx) => {
    const message = ctx.update.message;
    const replyToMessage = message?.reply_to_message;

    if (!message || !replyToMessage || !message.from || !replyToMessage.from) {
      logger.info("bad data");
      return;
    }

    const score: Score = {
      messageId: replyToMessage.message_id,
      authorId: replyToMessage.from?.id,
      scorerId: message.from?.id,
      chatId: message.chat.id,
    };

    if (score.authorId === score.scorerId) {
      logger.info("same author");
      return;
    }

    try {
      await saveScore(score);
      logger.info("score saved");
      ctx.reply(
        `${replyToMessage.from?.first_name} +1 лол от ${message.from?.first_name}`,
        // eslint-disable-next-line
        { reply_to_message_id: replyToMessage.message_id }
      );
    } catch (err) {
      logger.error(err, "could not score");
    }
  });
}
