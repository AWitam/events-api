import winston from "winston";

const format = winston.format;

const loggerFormat = format.combine(
  format.colorize({ all: true }),
  format.label({ label: "[LOGGER]" }),
  format.timestamp({ format: "YY-MM-DD HH:MM:SS" }),
  format.printf(
    (info) =>
      ` ${info.label} ${info.timestamp} ${info.requestId ? info.requestId : ""} ${info.level} : ${info.message} `
  )
);

const logger = winston.createLogger({
  defaultMeta: {
    service: "events-app",
  },
  transports: [new winston.transports.Console({ format: loggerFormat })],
});

export { logger };
