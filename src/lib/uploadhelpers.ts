import { generateReactHelpers } from "@uploadthing/react";
import { TUploadRouter } from "./uploadthing";

export const { uploadFiles } = generateReactHelpers<TUploadRouter>();
