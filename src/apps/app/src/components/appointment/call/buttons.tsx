import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import Details from './details';
import DetailsDoctor from './details-doctor';
import Diagnosis from './diagnosis';

type Props = {
  appointment: Primitives<Appointment>;
  user: any;
};

const Buttons = ({ appointment, user }: Props) => {
  return (
    <div className="p-0 bg-transparent items-center justify-end  hover:bg-transparent flex h-full gap-3">
      {user?.role === UserRoleValue.PATIENT && <DetailsDoctor data={appointment} />}
      {user?.role === UserRoleValue.DOCTOR && <Details data={appointment} />}
      {user.role === UserRoleValue.DOCTOR && <Diagnosis data={appointment} />}
    </div>
  );
};

export default Buttons;
