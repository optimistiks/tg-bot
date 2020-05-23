import { Telegraf } from "telegraf";
// import lolMiddleware from "./middleware/lolMiddleware";
// import historyMiddleware from "./middleware/historyMiddleware";
import ttsMiddleware from "./middleware/ttsMiddleware";
import command1Middleware from "./middleware/command1Middleware";

const bot = new Telegraf(process.env.BOT_TOKEN as string);

const middlewares = [ttsMiddleware, command1Middleware];

middlewares.forEach((middleware) => middleware(bot));

export default bot;
