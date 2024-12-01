import SelectRoleForm from '../../../components/onboard/select-role-form';

const Page = ({ searchParams }: { searchParams: { userId: string } }) => {
  const userId = searchParams.userId;
  return <SelectRoleForm userId={userId} />;
};

export default Page;
