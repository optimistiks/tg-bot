import { Telegraf } from "telegraf/typings/telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import textToSpeech from "../utils/textToSpeech";
import logger from "../logger";

export default function command1Middleware(
  bot: Telegraf<TelegrafContext>
): void {
  bot.command("command1", async (ctx, next) => {
    logger.info("starting /command1...");

    const rand = Math.random();

    if (rand > 0.01) {
      logger.info(`rand=${rand}`, { rand });
      return next();
    }

    const buffer = await textToSpeech("как же вы заебали со своим комманд1");
    await ctx.replyWithAudio(
      { source: buffer as Buffer },
      {
        title: "command1",
      }
    );

    logger.info("/command1 completed");

    return next();
  });
}
