import { Telegraf } from "telegraf";
import * as admin from "firebase-admin";
import logger from "./logger";
import lolHandler from "./lolHandler";

admin.initializeApp({
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string)
  ),
});
logger.info("firebase app initialized", process.env.FIREBASE_PROJECT_ID);

const bot = new Telegraf(process.env.BOT_TOKEN as string);
lolHandler(bot);

logger.info("starting bot...");
bot
  .launch()
  .then(() => {
    logger.info("bot is online");
  })
  .catch((err) => {
    logger.error(err, "could not start bot");
    throw err;
  });
