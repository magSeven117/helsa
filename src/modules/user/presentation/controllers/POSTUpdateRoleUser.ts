import { db } from "@/modules/shared/infrastructure/persistence/prisma/PrismaConnection";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UpdateRoleUser } from "../../application/UpdateRoleUser";
import { PrismaUserRepository } from "../../infrastructure/PrismaUserRepository";
import { verifyWebhook } from "../guards/svix-guard";

export const POSTUpdateRoleUser = async (req: NextRequest) => {
  const updateRoleUserUseCase = new UpdateRoleUser(new PrismaUserRepository(db));
  const headerPayload = headers();
  const bodyPayload = await req.text();
  let evt;
  try {
    evt = await verifyWebhook(headerPayload, bodyPayload, process.env.CLERK_WEBHOOK_SECRET_2);
  } catch (error) {
    return new NextResponse("Error occurred verifying", { status: 500 });
  }
  if (evt.type !== "user.updated") {
    return new NextResponse("Error occurred, event not supported", {
      status: 500,
    });
  }
  const { id, public_metadata } = evt.data;
  try {
    await updateRoleUserUseCase.run(id, public_metadata?.role);
  } catch (error) {
    return new NextResponse("Error occurred in use case", { status: 500 });
  }

  return NextResponse.json({ message: "User updated" }, { status: 200 });
};
