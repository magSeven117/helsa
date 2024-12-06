import AppointmentSearchInput from '@/app/(client)/components/appointment/filter/appointment-search-input';
import { NoResults } from '@/app/(client)/components/appointment/table/empty-state';
import { getAppointments } from '@/app/(server)/actions/appointment/get-appointments';
import { getAppointmentTypes } from '@/app/(server)/actions/doctor/get-appointment-types';
import { getSpecialties } from '@/app/(server)/actions/doctor/get-specialties';
import { AppointmentStatusEnum } from '@/modules/appointment/domain/status';
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server';

const searchParamsCache = createSearchParamsCache({
  start: parseAsString,
  end: parseAsString,
  specialties: parseAsArrayOf(parseAsString),
  states: parseAsArrayOf(parseAsString),
  types: parseAsArrayOf(parseAsString),
  page: parseAsInteger.withDefault(0),
});

const Page = async ({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) => {
  const {
    page,
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
  const appointments = await getAppointments({});
  const specialties = responseSpecialties?.data ?? [];
  const data = await getAppointmentTypes({ doctorId: '1' });
  const types = data?.data ?? [];

  const sort = (searchParams?.sort as string)?.split(':');

  const loadingKey = JSON.stringify({
    page,
    filter,
    sort,
  });

  const isEmpty = !appointments?.data?.data?.length;
  return (
    <div className="grid grid-cols-1 w-full">
      <div className="flex px-5 py-7 w-full">
        <AppointmentSearchInput
          specialties={specialties}
          states={[...Object.values(AppointmentStatusEnum)]}
          types={types}
        />
      </div>
      {!isEmpty ? (
        <div className="relative h-[calc(100vh-200px)] overflow-hidden">
          <NoResults />
        </div>
      ) : (
        <div>{JSON.stringify(appointments?.data ?? [])}</div>
      )}
    </div>
  );
};

export default Page;
