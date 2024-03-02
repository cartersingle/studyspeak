import path from "path";
import express from "express";
import next from "next";
import dotenv from "dotenv";

import nextBuild from "next/dist/build";
import { router } from "./server/routes";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});
const app = express();
const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  if (process.env.NEXT_BUILD === "true") {
    app.listen(PORT, async () => {
      console.log(`Next.js is now building...`);
      // @ts-expect-error
      await nextBuild(path.join(__dirname, ".."));
      process.exit();
    });

    return;
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
  });

  const nextHandler = nextApp.getRequestHandler();

  app.use("/api", router);

  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    console.log("Next.js started");

    app.listen(PORT, async () => {
      console.log(`Next.js App URL: ${process.env.SERVER_URL}`);
    });
  });
};

start();
