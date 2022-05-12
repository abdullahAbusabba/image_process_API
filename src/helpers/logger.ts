import express from "express";

/**

* middleware for all routes
* @param req - Request object.
* @params res - Response object.
* @params next - Passes control to the next matching route.
* @returns void.

*/

function logger(
  req: express.Request,
  res: express.Response,
  next: Function
): void {
  const url = req.url;
  console.log(`${url} was visited`);
  next();
}

export { logger };
