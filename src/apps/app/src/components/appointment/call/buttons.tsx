'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Pathology } from '@helsa/engine/diagnostic/domain/pathology';
import { UserRoleValue } from '@helsa/engine/user/domain/user-role';
import { useLocalStorage } from 'usehooks-ts';
import Actions from './actions';
import Details from './details';
import DetailsDoctor from './details-doctor';

type Props = {
  appointment: Primitives<Appointment>;
  pathologies: Primitives<Pathology>[];
};

const Buttons = ({ appointment, pathologies }: Props) => {
  const [user] = useLocalStorage<any | null>('user', null);
  if (!user) return null;
  return (
    <div className="p-0 bg-transparent items-center justify-end  hover:bg-transparent flex h-full gap-3">
      {user?.role === UserRoleValue.PATIENT && <DetailsDoctor data={appointment} />}
      {user?.role === UserRoleValue.DOCTOR && <Details data={appointment} />}
      {user.role === UserRoleValue.DOCTOR && <Actions data={appointment} pathologies={pathologies} />}
    </div>
  );
};

export default Buttons;
