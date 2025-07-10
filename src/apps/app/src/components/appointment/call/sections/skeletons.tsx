import { Skeleton } from '@helsa/ui/components/skeleton';
export const ActionSkeleton = () => {
  return <Skeleton className="h-10   w-[100px] rounded-lg"></Skeleton>;
};

export const HeaderSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-3 max-md:grid-cols-1">
      <div>
        <Skeleton className="h-8   w-1/2 mb-2 rounded-lg" />
        <Skeleton className="h-6   w-3/4 rounded-lg" />
      </div>
      <div className="p-0 bg-transparent items-center justify-end hover:bg-transparent flex h-full gap-3">
        <Skeleton className="h-10   w-[100px] rounded-lg"></Skeleton>
        <Skeleton className="h-10   w-[100px] rounded-lg"></Skeleton>
        <Skeleton className="h-10   w-[100px] rounded-lg"></Skeleton>
      </div>
    </div>
  );
};

export const CallSkeleton = () => {
  return <Skeleton className="h-full   col-span-8 rounded-lg"></Skeleton>;
};
