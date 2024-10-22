import { getCurrentUser } from "@/modules/user/presentation/actions/get-current-user";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/auth/sign-in");
  }
  return redirect(`/dashboard`);
}

export default Page;
