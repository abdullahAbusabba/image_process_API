import express from "express";
const sharp = require("sharp");
const images = express.Router();
const glob = require("glob");

images.get("/", (req: express.Request, res: express.Response) => {
  res.status(200);

  const dir: string = __dirname.split("/").slice(0, -2).join("/") + "/assets";

  const filename: string = (req.query.filename ?? undefined) as string;
  const width: string = (req.query.width ?? undefined) as string;
  const height: string = (req.query.height ?? undefined) as string;
  const img = new Image(
    filename,
    width,
    height,
    `${dir}/full/${filename}`,
    `${dir}/thump/process_${filename}`
  );
  const queries: [string, string, string] = [
    img.filename,
    img.width,
    img.height
  ];
  const isUndefined = queries.every(
    (element) => typeof element === "undefined"
  );

  glob(
    `${dir}/full/*.*`,
    async function (err: Error, files: string[]): Promise<void> {
      if (err) {
        console.log({
          error:
            err instanceof Error
              ? err.message
              : "Failed to do something exceptional"
        });
      }

      if (!isUndefined && files.includes(img.dirname)) {
        try {
          await sharp(img.dirname)
            .resize({
              width: parseInt(img.width),
              height: parseInt(img.height)
            })
            .png()
            .toFile(img.outPutPath);
          res.sendFile(img.outPutPath);
        } catch (err) {
          console.log({
            error:
              err instanceof Error
                ? err.message
                : "Failed to do something exceptional"
          });
        }
      } else if (!isUndefined && !files.includes(img.dirname)) {
        res.send(`${img.filename} is not available`);
      }
    }
  );
});

class Image {
  filename: string;
  width: string;
  height: string;
  dirname: string;
  outPutPath: string;

  constructor(
    filename: string,
    width: string,
    height: string,
    dirname: string,
    outPutPath: string
  ) {
    this.filename = filename;
    this.width = width;
    this.height = height;
    this.dirname = dirname;
    this.outPutPath = outPutPath;
  }
}

export default images;
