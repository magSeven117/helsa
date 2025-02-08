export const ActionSkeleton = () => {
  return <div className="h-10 bg-gray-300  w-[100px]"></div>;
};

export const HeaderSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-3 max-md:grid-cols-1">
      <div>
        <div className="h-8 bg-gray-300  w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-300  w-3/4"></div>
      </div>
      <div className="p-0 bg-transparent items-center justify-end hover:bg-transparent flex h-full gap-3">
        <div className="h-10 bg-gray-300  w-1/3"></div>
        <div className="h-10 bg-gray-300  w-1/3"></div>
        <div className="h-10 bg-gray-300  w-1/3"></div>
      </div>
    </div>
  );
};

export const CallSkeleton = () => {
  return <div className="h-full bg-gray-300  col-span-6"></div>;
};
