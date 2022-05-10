import express from "express";
import routers from "./api/routers";
import {logger} from "./helpers/logger";
const app = express();
const port = process.env.PORT || 3001;

app.get("/",(req: express.Request, res: express.Response) => {
  res.send("main index");
  console.log("main index.ts");
});

app.use("/api",logger,routers);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
