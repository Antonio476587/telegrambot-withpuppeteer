import bot from "./commands.js";

process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))

const port = process.env.PORT || 4444;
const domain = process.env.DOMAIN || null;

bot.launch({
    webhook: {
      domain,
      port,
    }
  });