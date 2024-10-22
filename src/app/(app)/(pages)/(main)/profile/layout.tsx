import { getCurrentUser } from "@/modules/user/presentation/actions/get-current-user";

const Layout = async ({
  doctor,
  patient,
}) => {
  const user = await getCurrentUser();
  return (
    <div>
      {user && user.role === 'DOCTOR' ? doctor : patient}
    </div>
  );
}

export default Layout;
