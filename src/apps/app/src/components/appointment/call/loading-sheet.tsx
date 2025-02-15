import { Loader2 } from 'lucide-react';

const LoadingSheet = () => {
  return (
    <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin" />
      <p className="text-muted-foreground text-xs mt-4">Loading...</p>
    </div>
  );
};

export default LoadingSheet;
