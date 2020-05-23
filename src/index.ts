import logger from "./logger";
import bot from "./bot";

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
