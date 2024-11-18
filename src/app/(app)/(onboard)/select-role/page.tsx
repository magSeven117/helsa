import SelectRoleForm from '../components/select-role-form';

const Page = ({ searchParams }) => {
  const userId = searchParams.userId;
  return <SelectRoleForm userId={userId} />;
};

export default Page;
