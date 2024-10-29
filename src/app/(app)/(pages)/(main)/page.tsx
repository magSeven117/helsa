import { getCurrentUser } from "@/modules/user/presentation/actions/get-current-user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = auth();
  if (userId) {
    const user = await getCurrentUser();
    if (!user) {
      return redirect("/sign-in");
    } else if (user.role === 'UNDEFINED') {
      return redirect("/select-role");
    }
    return redirect("/dashboard");
  }
  return redirect(`/sign-in`);
}

export default Page;
