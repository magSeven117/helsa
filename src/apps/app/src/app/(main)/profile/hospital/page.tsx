import { getHospital } from '@/src/actions/hospital/get-hospital';
import { getCurrentUser } from '@/src/actions/user/get-current-user';
import { AddressSection } from '@/src/components/profile/hospital-sections/address-section';
import { NameSection } from '@/src/components/profile/hospital-sections/name-section';

const Page = async () => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data ?? null;
  if (!user) {
    return null;
  }
  const hospitalResponse = await getHospital({ userId: user.id });
  const hospital = hospitalResponse?.data ?? null;
  if (!hospital) {
    return null;
  }
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <NameSection name={hospital.name} id={hospital.id} />
        <AddressSection address={hospital.address} id={hospital.id} />
      </div>
    </div>
  );
};

export default Page;
