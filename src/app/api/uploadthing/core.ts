import { createUploadthing, type FileRouter } from "uploadthing/next";

import * as z from "zod";
import sharp from "sharp";
import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;
      //get height and width of image

      const res = await fetch(file.ufsUrl);

      const buffer = await res.arrayBuffer();

      const imgMetadata = await sharp(buffer).metadata();

      const { width, height } = imgMetadata;

      if (!configId) {
        const configuration = await db.configuration.create({
          data: {
            width: width || 500,
            height: height || 500,
            imageUrl: file.ufsUrl,
          },
        });
        return { configId: configuration.id };
      } else {
        const updatedConfiguration = await db.configuration.update({
          where: {
            id: configId,
          },
          data: {
            croppedImageUrl: file.ufsUrl,
          },
        });

        return { configId: updatedConfiguration.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
