'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { useLocalStorage } from 'usehooks-ts';

type Props = {
  appointment: Primitives<Appointment>;
};
const Title = ({ appointment }: Props) => {
  const [user] = useLocalStorage<any | null>('user', null);
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
