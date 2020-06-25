export const handler = function (): string {
  console.log("inside function process.env.BOT_TOKEN=", process.env.BOT_TOKEN);
  return "hello from lambda";
};
