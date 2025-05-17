'use client';
import { useAppointmentList } from '@/src/hooks/appointment/use-appointment';
import { columns } from './columns';
import { NoResults } from './empty-state';
import { Loading } from './loading';
import { DataTable } from './table';

type Props = {
  filter: any;
  page: number;
  pageSize: number;
  sort: any;
  specialties: any[];
  types: any[];
};

export function AppointmentTable({ filter, pageSize, page, sort, specialties, types }: Props) {
  const hasFilters = Object.values(filter).some((value) => value !== null);
  const initialColumnVisibility = JSON.parse('[]');
  const {
    data: { data, meta },
    isLoading,
    error,
  } = useAppointmentList({
    filter: {
      start: filter.start ?? undefined,
      end: filter.end ?? undefined,
      states: filter.states ?? undefined,
      types: filter.types ?? undefined,
    },
    pagination: {
      page: !page ? 0 : (page - 1) * (pageSize ?? 10),
      pageSize: !pageSize ? 10 : pageSize,
    },
    sort: {
      sortBy: sort ? sort[0] : undefined,
      order: sort ? sort[1] : undefined,
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (data.length <= 0 && !isLoading) {
    return <NoResults hasFilters={hasFilters} />;
  }

  if (error) {
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
