import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "~/src/uploadthing/uploadthing-router"

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;