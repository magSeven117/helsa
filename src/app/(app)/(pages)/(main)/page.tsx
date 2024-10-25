import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/auth/sign-in");
  }
  return redirect(`/dashboard`);
}

export default Page;
