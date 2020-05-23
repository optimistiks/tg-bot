import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import bot from "./bot";
import logger from "./logger";

export const handler: APIGatewayProxyHandler = async (event) => {
  const child = logger.child({ event });
  child.info("lambda started...");

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({}),
  };

  if (!event.body) {
    child.info("missing body");
    return response;
  }

  child.info("handing bot update...");
  await bot.handleUpdate(JSON.parse(event.body));
  child.info("bot update handled");

  child.info("lambda completed");
  return response;
};
