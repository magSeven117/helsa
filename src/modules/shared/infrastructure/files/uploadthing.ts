import { createUploadthing, type FileRouter } from 'uploadthing/next';
const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => ({}))
    .onUploadComplete(async ({ metadata, file }) => console.log(metadata)),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
