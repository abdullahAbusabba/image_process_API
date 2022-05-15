import supertest from "supertest";
import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { app } from "../index";
import { Image } from "../api/images";
const request: supertest.SuperTest<supertest.Test> = supertest(app);

const img = new Image(
  "fjord.jpg",
  "300",
  "200",
  path.join(__dirname, "..", "..", "assets", "full", "fjord.jpg"),
  path.join(__dirname, "..", "..", "assets", "thump", "300_200_fjord.jpg"),
  "/api/images?filename=fjord.jpg&width=300&height=200"
);
describe("Test image processing via sharp", (): void => {
  it(" process and resize the image", async (): Promise<void> => {
    let result;
    try {
      await img.resizeImage();
      result = "success";
    } catch (e) {
      result = "failed";
    }

    expect(result).toEqual("success");
  });
});

// request
// .get('/api/images?filename=fjord.jpg&width=300&height=200')
// .expect(expect(img.processImage(res)).not.toBeNull())
// .expect(200, done)
// await sharp(this.dirname)
//   .resize({
//     width: parseInt(this.width),
//     height: parseInt(this.height)
//   })
//   .png()
//   .toFile(this.outPutPath)
