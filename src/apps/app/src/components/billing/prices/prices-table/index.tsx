import { getAppointmentTypes } from '@/src/actions/appointment/get-appointment-types';
import { getDoctorPrices } from '@/src/actions/doctor/get-doctor-prices';
import { Prices } from './columns';
import { DataTable } from './table';

export async function TypesTable({ doctorId }: { doctorId: string }) {
  const types = await getAppointmentTypes();
  const prices = await getDoctorPrices({ doctorId });

  return <DataTable data={(prices?.data as unknown as Prices[]) ?? []} doctorId={doctorId} types={types?.data ?? []} />;
}
