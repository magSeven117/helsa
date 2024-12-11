import { VideoCall } from '@/app/(client)/components/call';
import { generateUserToken } from '@/app/(server)/actions/appointment/generate-user-token';
import { getAppointment } from '@/app/(server)/actions/appointment/get-appointment';
import { getCurrentUser } from '@/app/(server)/actions/user/get-current-user';
import Link from 'next/link';

const Page = async ({ params }: { params: { id: string } }) => {
  const response = await getAppointment({ appointmentId: params.id });
  const tokenResponse = await generateUserToken();
  const user = await getCurrentUser();
  const appointment = response?.data!;
  return (
    <div className="w-full px-5 py-7 box-border h-full grid grid-cols-6 gap-4">
      <div className="flex flex-col col-span-3 h-full box-border">
        <div className="border h-full flex-1 flex-col flex gap-2">
          <VideoCall id={params.id} token={tokenResponse?.data ?? ''} user={user?.data!} />
        </div>
      </div>
      <div className="flex flex-col col-span-3 box-border">
        <div className="flex  gap-5 py-2 justify-start items-center max-sm:max-w-full max-sm:overflow-x-scroll no-scroll">
          <Link href={'/'}>Chat</Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
