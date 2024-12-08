import { getAppointmentTypes } from '@/app/(server)/actions/appointment/get-appointment-types';
import { DataTable } from './table';

export async function TypesTable({ doctorId }: { doctorId: string }) {
  const types = await getAppointmentTypes({ doctorId });

  return <DataTable data={types?.data ?? []} />;
}
