import { Telegraf } from "telegraf/typings/telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import AWS from "aws-sdk";
import parentLogger from "../logger";

const polly = new AWS.Polly();

export default function ttsMiddleware(bot: Telegraf<TelegrafContext>): void {
  bot.command("tts", async (ctx, next) => {
    let logger = parentLogger.child({ messageText: ctx.update.message?.text });
    logger.info("processing /tts command...");

    const text = ctx.update.message?.text
      ?.replace(/\/\S*\s*/, "")
      .slice(0, 1000);

    if (!text) {
      logger.info("no text to synthesize");
      return next();
    }
    logger = logger.child({ ttsText: text });

    await new Promise((resolve) => {
      polly.synthesizeSpeech(
        { Text: text, VoiceId: "Maxim", OutputFormat: "mp3" },
        (err, data) => {
          if (err) {
            logger.error(err, "could not synthesize speech");
            return resolve();
          }
          ctx.replyWithAudio(
            { source: data.AudioStream as Buffer },
            { title: text }
          );
          resolve();
          logger.info("/tts command completed");
        }
      );
    });

    return next();
  });
}
