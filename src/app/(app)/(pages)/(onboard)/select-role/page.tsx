import SelectRoleForm from "@/app/(app)/components/onboarding/select-role-form";

const Page = ({ searchParams }) => {
  const userId = searchParams.userId;
  return (
    <SelectRoleForm userId={userId} />
  );
}

export default Page;
