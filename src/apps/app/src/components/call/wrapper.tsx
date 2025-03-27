import { generateUserToken } from '@/src/actions/appointment/generate-user-token';
import { getAppointment } from '@/src/actions/appointment/get-appointment';
import { getPathologies } from '@/src/actions/diagnostic/get-pathologies';
import { getAppointmentOrders } from '@/src/actions/order/get-appointment-orders';
import { AppointmentStatusEnum } from '@helsa/engine/appointment/domain/status';
import FinishDetails from '../appointment/call/finish-details';
import { VideoCallOld } from './stream';

const WrapperCall = async ({ id }: { id: string }) => {
  const tokenResponse = await generateUserToken();
  const pathologiesResponse = await getPathologies();
  const pathologies = pathologiesResponse?.data ?? null;
  const appointmentResponse = await getAppointment({
    appointmentId: id,
    include: {
      diagnostics: true,
      telemetry: true,
      treatments: {
        include: {
          medication: true,
        },
      },
    },
  });
  const ordersResponse = await getAppointmentOrders({ appointmentId: id });
  const orders = ordersResponse?.data ?? null;
  const appointment = appointmentResponse?.data ?? null;

  if (!appointment) {
    return null;
  }

  if (appointment.status === AppointmentStatusEnum.FINISHED) {
    return (
      <div className="flex flex-col gap-2 col-span-8 h-full box-border max-md:col-span-1">
        <div className=" h-full flex-col flex gap-2">
          <FinishDetails appointment={appointment} pathologies={pathologies ?? []} orders={orders ?? []} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 col-span-8 h-full box-border max-md:col-span-1">
      <div className=" h-full flex-col flex gap-2 border rounded-xl">
        <VideoCallOld id={id} token={tokenResponse?.data ?? ''} />
      </div>
    </div>
  );
};

export default WrapperCall;
