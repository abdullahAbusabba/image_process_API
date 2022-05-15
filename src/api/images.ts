import express from "express";
const sharp = require("sharp");
const images: express.Router = express.Router();
const glob = require("glob");
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTl: 60000 });

images.get("/", (req: express.Request, res: express.Response): void => {
  const dir: string = __dirname.split("/").slice(0, -2).join("/") + "/assets";

  const filename: string = (req.query.filename ?? undefined) as string;
  const width: string = (req.query.width ?? undefined) as string;
  const height: string = (req.query.height ?? undefined) as string;

  const queries: [string, string, string] = [filename, width, height];
  const isUndefined = queries.every(
    (element) => typeof element === "undefined"
  );

  const img = new Image(
    filename,
    width,
    height,
    `${dir}/full/${filename}`,
    `${dir}/thump/${width}_${height}_${filename}`,
    req.url
  );

  glob(`${dir}/full/*.*`, function (err: Error, files: string[]): void {
    if (err) {
      img.errorLog(err as Error, res);
    }

    if (!isUndefined && files.includes(img.dirname)) {
      img.processImage(res);
    } else if (!isUndefined && !files.includes(img.dirname)) {
      res.send(`${img.filename} is not available`);
    } else {
      const names: string[] = [];
      let name: unknown = "" as string;
      files.forEach(function (el) {
        name = el.split("/").slice(-1);
        names.push(name as string);
      });

      res.send(
        `Please enter an image name in the url, example:<br/>http://localhost:3001/api/images<em>?filename=palmtunnel.jpg&width=300&height=200</em>.<br/><br/>available images:<hr/>${names}`
      );
    }
  });
});

class Image {
  filename: string;
  width: string;
  height: string;
  dirname: string;
  outPutPath: string;
  url: string;

  constructor(
    filename: string,
    width: string,
    height: string,
    dirname: string,
    outPutPath: string,
    url: string
  ) {
    this.filename = filename;
    this.width = width;
    this.height = height;
    this.dirname = dirname;
    this.outPutPath = outPutPath;
    this.url = url;
  }
  errorLog(err: Error, res: express.Response): void {
    console.log({
      error:
        err instanceof Error
          ? err.message
          : "Failed to do something exceptional"
    });
    res.send(
      err instanceof Error ? err.message : "Failed to do something exceptional"
    );
  }

  async processImage(res: express.Response): Promise<void> {
    console.log(`is Image in cache? ${myCache.has(this.url)}`);
    if (myCache.has(this.url)) {
      res.sendFile(myCache.get(this.url));
    } else {
      try {
        await this.resizeImage();
        myCache.set(this.url, this.outPutPath);
        res.sendFile(this.outPutPath);
      } catch (err) {
        this.errorLog(err as Error, res);
      }
    }
  }

  resizeImage(): void {
    sharp(this.dirname)
      .resize({
        width: parseInt(this.width),
        height: parseInt(this.height)
      })
      .png()
      .toFile(this.outPutPath);
  }
}

export { images, Image };
