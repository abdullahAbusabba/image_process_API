import express from "express";
import routers from "./api/routers";
import { logger } from "./helpers/logger";
const app: express.Application = express();
const port: number = (process.env.PORT || 3001) as number;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("main index");
  console.log("main index.ts");
});

app.use("/api", logger, routers);

app.listen(port, (): void => {
  console.log(`listening on port ${port}`);
});

export { app };
