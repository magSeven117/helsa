import { getAppointment } from '@/src/actions/appointment/get-appointment';
import { getPathologies } from '@/src/actions/diagnostic/get-pathologies';
import dynamic from 'next/dynamic';
const Buttons = dynamic(() => import('./buttons'), { ssr: false });
const Title = dynamic(() => import('./title'), { ssr: false });

const Header = async ({ id }: { id: string }) => {
  const [response, responsePathologies] = await Promise.all([getAppointment({ appointmentId: id }), getPathologies()]);
  const appointment = response?.data!;
  return (
    <div className="w-full grid grid-cols-2 gap-3 max-md:grid-cols-1">
      <Title appointment={appointment} />
      <Buttons appointment={appointment} pathologies={responsePathologies?.data ?? []} />
    </div>
  );
};

export default Header;
