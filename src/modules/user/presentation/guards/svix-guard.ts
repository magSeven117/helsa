import { WebhookEvent } from "@clerk/nextjs/server";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { Webhook } from "svix";

export const verifyWebhook = async (headerPayload: ReadonlyHeaders, payload: any, secret: string) => {
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new Error("Error -- no svix headers");
  }

  const wh = new Webhook(secret);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    throw new Error("Error occurred");
  }
  return evt;
};
