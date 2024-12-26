import { Button } from '@helsa/ui/components/button';
import Link from 'next/link';

const ComingSoon = () => {
  return (
    <div className="flex-1 flex flex-col gap-3 justify-center items-center">
      <p>
        <span className="text-2xl font-bold">Coming Soon</span>
      </p>
      <Button className="rounded-none">
        <Link href="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  );
};

export default ComingSoon;
