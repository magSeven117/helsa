import AppointmentSearchInput from '@/src/modules/appointment/components/filter/appointment-search-input';
import { AppointmentTable } from '@/src/modules/appointment/components/table';
import AppointmentActions from '@/src/modules/appointment/components/table/actions';
import { Loading } from '@/src/modules/appointment/components/table/loading';
import { ColumnVisibility } from '@/src/modules/appointment/components/table/visibility';
import { ErrorFallback } from '@/src/modules/shared/components/error-fallback';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server';
import { Suspense } from 'react';

const searchParamsCache = createSearchParamsCache({
  start: parseAsString,
  end: parseAsString,
  specialties: parseAsArrayOf(parseAsString),
  states: parseAsArrayOf(parseAsString),
  types: parseAsArrayOf(parseAsString),
  page: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
});

const Page = async (props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const searchParams = await props.searchParams;
  const {
    page,
    pageSize,
    start,
    end,
    specialties: selectedSpecialties,
    states: selectedStates,
    types: selectedTypes,
  } = searchParamsCache.parse(searchParams);
  const filter = {
    start,
    end,
    specialties: selectedSpecialties,
    states: selectedStates,
    types: selectedTypes,
  };

  const sort = (searchParams?.sort as string)?.split(':');

  const loadingKey = JSON.stringify({
    page,
    filter,
    sort,
  });

  return (
    <div className="grid grid-cols-1 w-full">
      <div className="flex px-5 py-7 w-full gap-3">
        <ColumnVisibility />
        <AppointmentSearchInput />
        <AppointmentActions />
      </div>
      <div className="flex px-5 w-full">
        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense fallback={<Loading />} key={loadingKey}>
            <AppointmentTable filter={filter} page={page} pageSize={pageSize} sort={sort} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
