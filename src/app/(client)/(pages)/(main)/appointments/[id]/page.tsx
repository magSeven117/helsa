import { VideoCall } from '@/app/(client)/components/call';
import CallCHat from '@/app/(client)/components/call-chat';
import { generateUserToken } from '@/app/(server)/actions/appointment/generate-user-token';
import { getAppointment } from '@/app/(server)/actions/appointment/get-appointment';
import { getCurrentUser } from '@/app/(server)/actions/user/get-current-user';

const Page = async ({ params }: { params: { id: string } }) => {
  const response = await getAppointment({ appointmentId: params.id });
  const tokenResponse = await generateUserToken();
  const user = await getCurrentUser();
  const appointment = response?.data!;
  return (
    <div className="w-full h-full flex flex-col justify-between px-5">
      <div className="w-full">
        <h1 className="text-3xl font-bold">Consulta</h1>
        <p className="text-lg">{appointment?.doctor?.user?.name!}</p>
      </div>
      <div className="w-full h-full box-border grid grid-cols-8 py-5  gap-4">
        <div className="flex flex-col gap-2 col-span-6 h-full box-border ">
          <div className=" h-full flex-col flex gap-2 border">
            <VideoCall id={params.id} token={tokenResponse?.data ?? ''} user={user?.data!} />
          </div>
        </div>
        <div className="col-span-2 h-full border box-border flex-col justify-end flex gap-2">
          <CallCHat id={params.id} user={user?.data!} />
        </div>
      </div>
    </div>
  );
};

export default Page;
