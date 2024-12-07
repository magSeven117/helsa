import { getAppointments } from '@/app/(server)/actions/appointment/get-appointments';
import { Meta } from '@/modules/shared/domain/core/collection.';
import { cookies } from 'next/headers';
import { columns } from './columns';
import { NoResults } from './empty-state';
import { DataTable } from './table';

type Props = {
  filter: any;
  page: number;
  pageSize: number;
  sort: any;
};

export async function AppointmentTable({ filter, pageSize, page, sort }: Props) {
  const hasFilters = Object.values(filter).some((value) => value !== null);
  const initialColumnVisibility = JSON.parse(cookies().get('appointment-column-visibility')?.value || '[]');
  const response = await getAppointments({});
  const { data, meta } = response?.data ?? { data: [], meta: {} as Meta };

  if (!data.length) {
    return <NoResults hasFilters={hasFilters} />;
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      initialColumnVisibility={initialColumnVisibility}
      hasFilters={hasFilters}
      meta={meta}
    />
  );
}
