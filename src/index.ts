import Koa from "koa";
require("dotenv").config();
import bodyParser from "koa-bodyparser";
import authController from "./controllers/auth.controller";
import userController from "./controllers/users.controller";
import { dbConnectionMiddleware } from "./middlewares/dbConnection.middleware";
import exceptionHandlerMiddleware from "./middlewares/exceptionHandler.middleware";
import loggerMiddleware from "./middlewares/logger.middleware";
import { logger } from "./utils/logger.util";

const PORT = process.env.PORT ? process.env.PORT : 3000;
const app = new Koa();

app.use(loggerMiddleware());
app.use(dbConnectionMiddleware)
app.use(exceptionHandlerMiddleware());
app.use(bodyParser());

registerRoutes(app);

app.listen(PORT, () => logger.info(`Server listening on http://localhost:${PORT}`));

function registerRoutes(app: Koa) {
  app
    .use(authController.routes())
    .use(authController.allowedMethods())
    .use(userController.routes())
    .use(userController.allowedMethods());
  logger.info(
    `Registered routes:
    User management routes: ${authController.stack.map((route) => route.path)}
    User routes: ${userController.stack.map((route) => route.path)}`
  );
}
