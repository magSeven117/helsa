import { getCurrentUser } from "@/modules/user/presentation/actions/get-current-user";

const Page = async () => {
  const user = await getCurrentUser()
  return (
    <div className="space-y-6 w-full">
    </div>
  );
}

export default Page;