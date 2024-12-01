import { getHospital } from '@/modules/hospital/presentation/actions/get-hospital';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import { AddressSection } from '../../../../components/profile/hospital-sections/address-section';
import { NameSection } from '../../../../components/profile/hospital-sections/name-section';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const hospital = await getHospital(user.id);
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
