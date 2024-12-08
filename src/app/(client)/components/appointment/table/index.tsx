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
  specialties: any[];
  types: any[];
};

export async function AppointmentTable({ filter, pageSize, page, sort, specialties, types }: Props) {
  const hasFilters = Object.values(filter).some((value) => value !== null);
  const initialColumnVisibility = JSON.parse(cookies().get('appointment-column-visibility')?.value || '[]');
  const response = await getAppointments({
    start: filter.start ?? undefined,
    end: filter.end ?? undefined,
    states: filter.states ?? undefined,
    specialties: filter.specialties
      ? specialties.filter((s) => filter.specialties.includes(s.name)).map((s) => s.id)
      : undefined,
    types: filter.types ? types.filter((t) => filter.types.includes(t.name)).map((t) => t.id) : undefined,
    page: !page ? 0 : (page - 1) * (pageSize ?? 10),
    pageSize: !pageSize ? 10 : pageSize,
    sortBy: sort ? sort[0] : undefined,
    order: sort ? sort[1] : undefined,
  });
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
