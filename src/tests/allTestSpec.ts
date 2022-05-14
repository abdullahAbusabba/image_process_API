import supertest from "supertest";
import { promises as fs } from "fs";
import path from "path";
import { app } from "../index";
const glob = require("glob");

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe("Test first endpoint response ", (): void => {
  it("gets / response with status 200", async (): Promise<void> => {
    const response: supertest.Response = await request.get("/");

    expect(response.status).toBe(200);
  });
});


describe("Test invalid endpoint ", (): void => {
  it("should return 404 status", async (): Promise<void> => {
    const response: supertest.Response = await request.get("/test");

    expect(response.status).toBe(404);
  });
});

describe("Testing a valid endpoint /api", (): void => {
  it("should return 200 status", async (): Promise<void> => {
    const response: supertest.Response = await request.get("/api");

    expect(response.status).toBe(200);
  });
});

describe("Testing a valid endpoint /api/images", (): void => {
  it("should return 200 status", async (): Promise<void> => {
    const response: supertest.Response = await request.get("/api/images");

    expect(response.status).toBe(200);
  });
});

describe("Testing an endpoint with queries set and image processing", (): void => {
  it("should return 200 status", async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      "/api/images?filename=fjord.jpg&width=300&height=200"
    );
      expect(response.status).toBe(200);

})

  it("should return true for finding the new image in the folder", async (): Promise<void> => {
     glob(path.join(__dirname, "..", "..", "assets", "thump","*.*"), function (err: Error, files: string[]): void {
    
      expect(files.includes(path.join(__dirname, "..", "..", "assets", "thump", "300_200_fjord.jpg"))).toBe(true);

     })
})

})

