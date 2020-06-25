import { Telegraf } from "telegraf";
import axios from "axios";
import env from "../.env.json";
import logger from "../src/logger";

logger.info("starting dev bot proxy...");

const bot = new Telegraf(env.tgBotFunction.BOT_TOKEN, {
  username: env.tgBotFunction.BOT_USERNAME,
});

bot.use((ctx) => {
  return axios.post("http://127.0.0.1:3000/1136204101", ctx.update);
});

bot
  .launch()
  .then(() => {
    logger.info("dev bot proxy is online");
  })
  .catch((err) => {
    logger.error(err, "could not start dev bot proxy");
    throw err;
  });
