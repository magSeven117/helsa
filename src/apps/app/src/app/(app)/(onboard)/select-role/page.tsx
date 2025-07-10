import SelectRoleForm from '@/src/components/onboard/select-role-form';
import { getSession } from '@helsa/auth/server';

const Page = async () => {
  const data = await getSession();
  const userId = data?.user?.id ?? '';
  return <SelectRoleForm userId={userId} />;
};

export default Page;
