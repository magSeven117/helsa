
import HospitalInfo from "@/app/(app)/components/profile/hospital-info/hospital-info";
import { getCurrentUser } from "@/modules/user/presentation/actions/get-current-user";

const Page = async () => {
  const user = await getCurrentUser()
  return (
    <div className="space-y-6 w-full">
      <HospitalInfo hospital={{}} />
    </div>
  );
}

export default Page;