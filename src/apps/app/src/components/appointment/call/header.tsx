import { getAppointment } from '@/src/actions/appointment/get-appointment';
import { getCurrentUser } from '@/src/actions/user/get-current-user';
import Buttons from './buttons';
import Title from './title';

const Header = async ({ id }: { id: string }) => {
  const [response, userResponse] = await Promise.all([getAppointment({ appointmentId: id }), getCurrentUser()]);
  const appointment = response?.data!;
  const user = userResponse?.data!;
  return (
    <div className="w-full grid grid-cols-2 gap-3 max-md:grid-cols-1">
      <Title appointment={appointment} user={user} />
      <Buttons appointment={appointment} user={user} />
    </div>
  );
};

export default Header;
