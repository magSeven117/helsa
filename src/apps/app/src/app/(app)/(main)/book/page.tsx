import DoctorListWrapper from '@/src/app/(app)/(main)/book/_components/doctor-list-wrapper';
import SearchDoctorInput from '@/src/app/(app)/(main)/book/_components/search-doctor-input';
import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

const searchParamsCache = createSearchParamsCache({
  q: parseAsString,
  availability: parseAsString,
  minRate: parseAsInteger,
  experience: parseAsInteger,
});

const Page = async (props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) => {
  const searchParams = await props.searchParams;
  const { q, experience, availability, minRate } = searchParamsCache.parse(searchParams);
  const filter = {
    experience,
    availability,
    minRate,
  };

  const loadingKey = JSON.stringify({
    query: q,
    filter,
  });
  return (
    <div className="grid grid-cols-1 w-full">
      <div className="flex px-5 py-7 w-full">
        <SearchDoctorInput />
      </div>
      <DoctorListWrapper
        filters={{
          q: q || undefined,
          availability: availability || undefined,
          minRate: minRate || undefined,
          experience: experience || undefined,
        }}
      />
    </div>
  );
};

export default Page;
