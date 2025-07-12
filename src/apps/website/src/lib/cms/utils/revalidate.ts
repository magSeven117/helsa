import type { Payload } from "payload";

export const revalidate = async (args: {
  collection: string;
  slug: string;
  payload: Payload;
}): Promise<void> => {
  const { collection, slug, payload } = args;

  try {
    const res = await fetch(
      `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/revalidate?&collection=${collection}&slug=${slug}`
    );

    if (res.ok) {
      payload.logger.info(
        `Revalidated page '${slug}' in collection '${collection}'`
      );
    } else {
      payload.logger.error(
        `Error revalidating page '${slug}' in collection '${collection}': ${res}`
      );
    }
  } catch (err: unknown) {
    console.log(err);
    payload.logger.error(
      `Error hitting revalidate route for page '${slug}' in collection '${collection}': ${err}`
    );
  }
};

