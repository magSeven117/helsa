import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import Details from './details';
import Diagnosis from './diagnosis';
import Orders from './orders';
import Treatment from './treatment';
import Vitals from './vitals';

type Props = {
  appointment: Primitives<Appointment>;
  user: any;
};

const Buttons = ({ appointment, user }: Props) => {
  return (
    <div className="p-0 bg-transparent items-center justify-end  hover:bg-transparent flex h-full gap-3">
      <Details data={appointment} user={user} />
      {user.role === UserRoleValue.DOCTOR && (
        <>
          <Orders data={appointment} />
          <Vitals appointment={appointment} />
          <Diagnosis data={appointment} />
          <Treatment data={appointment} />
        </>
      )}
    </div>
  );
};

export default Buttons;
