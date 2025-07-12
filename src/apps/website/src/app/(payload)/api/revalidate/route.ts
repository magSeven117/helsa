import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const collection = request.nextUrl.searchParams.get("collection");
  const slug = request.nextUrl.searchParams.get("slug");

  if (typeof collection === "string" && typeof slug === "string") {
    revalidateTag(`${collection}`);
    revalidateTag(`${collection}_${slug}`);
    revalidatePath(`/${collection}/draft`);
    revalidatePath(`/${collection}/${slug}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ revalidated: false, now: Date.now() });
}

