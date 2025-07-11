import { useSession } from '@/src/components/auth/session-provider';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import Finalize from '../actions/finalize';
import Details from '../details';
import { Notes } from '../details/notes';
import Indications from '../indications';

type Props = {
  appointment: Primitives<Appointment>;
};

const Buttons = ({ appointment }: Props) => {
  const { user } = useSession();
  return (
    <div className="p-0 col-span-2 bg-transparent items-center justify-end  hover:bg-transparent flex h-full gap-3">
      <Details data={appointment} user={user} />
      {user.role.is(UserRoleValue.DOCTOR) && (
        <>
          <Notes id={appointment.id} headless={false} />
          <Indications appointment={appointment} />
          {appointment.status !== 'FINISHED' && <Finalize id={appointment.id} />}
        </>
      )}
    </div>
  );
};

export default Buttons;
