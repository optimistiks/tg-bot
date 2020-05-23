import { Telegraf } from "telegraf";
// import lolMiddleware from "./middleware/lolMiddleware";
// import historyMiddleware from "./middleware/historyMiddleware";
import ttsMiddleware from "./middleware/ttsMiddleware";

const bot = new Telegraf(process.env.BOT_TOKEN as string);

const middlewares = [ttsMiddleware];
middlewares.forEach((middleware) => middleware(bot));

export default bot;
