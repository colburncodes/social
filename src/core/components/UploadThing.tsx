import { generateComponents } from "@uploadthing/react";
import { OurFileRouter } from "~/src/uploadthing/uploadthing-router"

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();