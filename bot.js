import { Telegraf } from "telegraf";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.BOT_TOKEN || null;

const bot = new Telegraf(token);

export default bot