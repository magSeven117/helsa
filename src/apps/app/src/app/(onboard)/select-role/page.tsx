import { getCurrentUser } from '@/src/actions/user/get-current-user';
import SelectRoleForm from '@/src/components/onboard/select-role-form';

const Page = async () => {
  const data = await getCurrentUser();
  const userId = data?.data?.id!;
  return <SelectRoleForm userId={userId} />;
};

export default Page;
