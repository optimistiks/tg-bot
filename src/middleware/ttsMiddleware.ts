import { Telegraf } from "telegraf/typings/telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import AWS from "aws-sdk";
import logger from "../logger";

// AWS credentials are picked up automatically
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html

const polly = new AWS.Polly();

export default function ttsMiddleware(bot: Telegraf<TelegrafContext>): void {
  bot.command("voice", (ctx, next) => {
    const text = ctx.update.message?.text?.replace("/voice ", "").slice(0, 300);

    if (!text) {
      logger.info("no text to synthesize");
      return next();
    }

    polly.synthesizeSpeech(
      { Text: text, VoiceId: "Maxim", OutputFormat: "mp3" },
      (err, data) => {
        if (err) {
          logger.error(err, "could not synthesize speech");
          return;
        }
        logger.info("speech synthesized");
        ctx.replyWithAudio(
          { source: data.AudioStream as Buffer },
          { title: text }
        );
      }
    );

    logger.info("text", ctx.update.message?.text);
    return next();
  });
}