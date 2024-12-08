import { getAppointmentTypes } from '@/app/(server)/actions/appointment/get-appointment-types';
import { getDoctorPrices } from '@/app/(server)/actions/doctor/get-doctor-prices';
import { DataTable } from './table';

export async function TypesTable({ doctorId }: { doctorId: string }) {
  const types = await getAppointmentTypes();
  const prices = await getDoctorPrices({ doctorId });

  return <DataTable data={prices?.data ?? []} doctorId={doctorId} types={types?.data ?? []} />;
}
