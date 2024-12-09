import AppointmentSearchInput from '@/app/(client)/components/appointment/filter/appointment-search-input';
import { AppointmentTable } from '@/app/(client)/components/appointment/table';
import AppointmentActions from '@/app/(client)/components/appointment/table/actions';
import { Loading } from '@/app/(client)/components/appointment/table/loading';
import { ColumnVisibility } from '@/app/(client)/components/appointment/table/visibility';
import { ErrorFallback } from '@/app/(client)/components/error-fallback';
import { getAppointmentTypes } from '@/app/(server)/actions/appointment/get-appointment-types';
import { getSpecialties } from '@/app/(server)/actions/doctor/get-specialties';
import { AppointmentStatusEnum } from '@/modules/appointment/domain/status';
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

const Page = async ({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) => {
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
  const responseSpecialties = await getSpecialties();
  const specialties = responseSpecialties?.data ?? [];
  const data = await getAppointmentTypes();
  const types = data?.data ?? [];

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
        <AppointmentSearchInput
          specialties={specialties}
          states={[...Object.values(AppointmentStatusEnum)]}
          types={types}
        />
        <AppointmentActions />
      </div>
      <div className="flex px-5 w-full">
        <ErrorBoundary errorComponent={ErrorFallback}>
          <Suspense fallback={<Loading />} key={loadingKey}>
            <AppointmentTable
              filter={filter}
              page={page}
              pageSize={pageSize}
              sort={sort}
              specialties={specialties}
              types={types}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Page;
