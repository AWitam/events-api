const Koa = require("koa");
require("dotenv").config();
const bodyParser = require("koa-bodyparser");
const userManagementController = require("./controllers/user-management.controller");

const PORT = process.env.PORT | 3000;
const app = new Koa();

app.use(bodyParser());

registerRoutes(app);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

function registerRoutes(app) {
  app
    .use(userManagementController.routes())
    .use(userManagementController.allowedMethods());
  console.log(
    "Register routes:",
    userManagementController.stack.map((route) => route.path)
  );
}
