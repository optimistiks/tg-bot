import { Telegraf } from "telegraf/typings/telegraf";
import { TelegrafContext } from "telegraf/typings/context";

export default function historyMiddleware(
  bot: Telegraf<TelegrafContext>
): void {
  bot.on("message", (ctx, next) => {
    next();
  });
}
