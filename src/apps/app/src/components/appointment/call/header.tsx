import { getAppointment } from '@/src/actions/appointment/get-appointment';
import Buttons from './buttons';
import Title from './title';

const Header = async ({ id }: { id: string }) => {
  const response = await getAppointment({ appointmentId: id });
  const appointment = response?.data!;
  return (
    <div className="w-full grid grid-cols-2 gap-3 max-md:grid-cols-1">
      <Title appointment={appointment} />
      <Buttons appointment={appointment} />
    </div>
  );
};

export default Header;
