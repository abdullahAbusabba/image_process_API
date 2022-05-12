import express from "express";
import images from "./images";
const routers = express.Router();

routers.get("/", (req: express.Request, res: express.Response) => {
  res.send("routers api");
  console.log("routers api");
});

routers.use("/images", images);

export default routers;
