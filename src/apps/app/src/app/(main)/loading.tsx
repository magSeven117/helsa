import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
};

export default Loading;
