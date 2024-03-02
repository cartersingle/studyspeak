import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { getSession } from "./auth";

const f = createUploadthing();

export const uploadRouter = {
  audioUploader: f({ "video/webm": { maxFileSize: "16MB" } })
    .middleware(async () => {
      const { isLoggedIn, userId } = await getSession();

      if (!isLoggedIn) throw new UploadThingError("Unauthorized");

      return { userId };
    })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type TUploadRouter = typeof uploadRouter;
