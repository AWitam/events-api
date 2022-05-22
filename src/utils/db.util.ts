import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.util";

const db = new PrismaClient({
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

db.$on("warn", (e) => {
  logger.warn(e);
});

db.$on("info", (e) => {
  logger.info(e);
});

db.$on("error", (e) => {
  logger.error(e);
});

export { db };
