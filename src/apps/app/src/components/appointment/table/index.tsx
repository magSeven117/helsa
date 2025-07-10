'use client';
import { listAppointments } from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { useQuery } from '@tanstack/react-query';
import { columns } from './columns';
import { NoResults } from './empty-state';
import { Loading } from './loading';
import { DataTable } from './table';

type Props = {
  filter: any;
  page: number;
  pageSize: number;
  sort: any;
};

export function AppointmentTable({ filter, pageSize, page, sort }: Props) {
  const hasFilters = Object.values(filter).some((value) => value !== null);
  const initialColumnVisibility = JSON.parse('[]');
  const {
    data: { data, meta },
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointments', filter, page, pageSize, sort],
    initialData: {
      data: [],
      meta: {
        total: 0,
        page: 0,
        size: 10,
        pages: 0,
      },
    },
    queryFn: async () =>
      listAppointments({
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
      }),
    refetchOnWindowFocus: false,
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
