const Koa = require("koa");
require("dotenv").config();

const app = new Koa();
const PORT = process.env.PORT | 3000;
// logger

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
