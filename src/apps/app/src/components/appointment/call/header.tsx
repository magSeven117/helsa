import { getAppointment } from '@/src/actions/appointment/get-appointment';
import { getCurrentUser } from '@/src/actions/user/get-current-user';
import Buttons from './buttons';
import Title from './title';

const Header = async ({ id }: { id: string }) => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data!;
  const includeDoctor = {
    telemetry: true,
    symptoms: true,
    patient: {
      include: {
        user: true,
      },
    },
  };
  const includePatient = {
    symptoms: true,
    specialty: true,
    doctor: {
      include: {
        user: true,
      },
    },
  };
  const response = await getAppointment({
    appointmentId: id,
    include: user.role === 'DOCTOR' ? includeDoctor : includePatient,
  });
  const appointment = response?.data!;

  return (
    <div className="w-full grid grid-cols-2 gap-3 max-md:grid-cols-1">
      <Title appointment={appointment} user={user} />
      <Buttons appointment={appointment} user={user} />
    </div>
  );
};

export default Header;
