import { Telegraf } from "telegraf/typings/telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import parentLogger from "../logger";
import textToSpeech from "../utils/textToSpeech";

export default function ttsMiddleware(bot: Telegraf<TelegrafContext>): void {
  bot.command("tts", async (ctx, next) => {
    let logger = parentLogger.child({ messageText: ctx.update.message?.text });
    logger.info("processing /tts command...");

    const text = ctx.update.message?.text?.replace(/\/\S*\s*/, "");

    if (!text) {
      logger.info("no text to synthesize");
      return next();
    }

    logger = logger.child({ ttsText: text });

    try {
      const buffer = await textToSpeech(text);
      await ctx.replyWithAudio(
        { source: buffer as Buffer },
        {
          title: text,
          performer: "@MikeLitorisOmgBot",
          caption: "@MikeLitorisOmgBot",
        }
      );
    } catch (err) {
      logger.error(err, "could not synthesize speech");
    }

    logger.info("/tts command completed");

    return next();
  });
}
