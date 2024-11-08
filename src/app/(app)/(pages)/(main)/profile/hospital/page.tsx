
import HospitalInfo from "@/app/(app)/components/profile/hospital-info/hospital-info";
import { getHospital } from "@/modules/hospital/presentation/actions/get-hospital";
import { getCurrentUser } from "@/modules/user/presentation/actions/get-current-user";

const Page = async () => {
  const user = await getCurrentUser()
  const hospital = await getHospital(user.id)
  return (
    <div className="space-y-6 w-full">
      <HospitalInfo hospital={hospital} />
    </div>
  );
}

export default Page;