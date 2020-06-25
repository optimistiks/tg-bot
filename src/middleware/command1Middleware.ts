import { Telegraf } from "telegraf/typings/telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import logger from "../logger";

export default function command1Middleware(
  bot: Telegraf<TelegrafContext>
): void {
  bot.command("command1", async (ctx, next) => {
    logger.info("starting /command1...");
    await ctx.reply("message");
    logger.info("/command1 completed");
    return next();
  });
}
