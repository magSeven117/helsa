import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';

type Props = {
  appointment: Primitives<Appointment>;
  user: any;
};
const Title = async ({ appointment, user }: Props) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Consulta con</h1>
      <p className="text-lg capitalize">
        {user?.role === UserRoleValue.PATIENT
          ? `Dr. ${appointment.doctor?.user?.name}`
          : appointment.patient?.user?.name!}
      </p>
    </div>
  );
};

export default Title;
