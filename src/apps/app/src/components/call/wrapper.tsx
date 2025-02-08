import { generateUserToken } from '@/src/actions/appointment/generate-user-token';
import { VideoCall } from '.';

const WrapperCall = async ({ id }: { id: string }) => {
  const tokenResponse = await generateUserToken();
  return (
    <div className="flex flex-col gap-2 col-span-6 h-full box-border max-md:col-span-1">
      <div className=" h-full flex-col flex gap-2 border">
        <VideoCall id={id} token={tokenResponse?.data ?? ''} />
      </div>
    </div>
  );
};

export default WrapperCall;
