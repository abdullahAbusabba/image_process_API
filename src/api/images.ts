import express from "express";
const sharp = require("sharp");

const images = express.Router();

images.get("/", (req: express.Request, res: express.Response) => {
  res.send("images api");
  
  console.log(req.query.filename);
  console.log(req.query.width);
  console.log(req.query.hight);

  const queries = [req.query.filename,req.query.width,req.query.hight]
  const isUndefined = queries.every( (element) => typeof element == 'undefined');
  console.log(isUndefined)
});

export default images;
