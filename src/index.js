const Koa = require("koa");
require("dotenv").config();
const bodyParser = require("koa-bodyparser");
const userManagementController = require("./controllers/user-management.controller");
const exceptionHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const loggerMiddleware = require("./middlewares/logger.middleware");
const logger = require("./utils/logger.util");

const PORT = process.env.PORT | 3000;
const app = new Koa();

app.use(loggerMiddleware());
app.use(exceptionHandlerMiddleware());
app.use(bodyParser());

registerRoutes(app);

app.listen(PORT, () => logger.info(`Server listening on http://localhost:${PORT}`));

function registerRoutes(app) {
  app.use(userManagementController.routes()).use(userManagementController.allowedMethods());
  logger.info(`Registered routes:  ${userManagementController.stack.map((route) => route.path)}`);
}
