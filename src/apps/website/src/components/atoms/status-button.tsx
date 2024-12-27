'use client';
import { Badge } from '@helsa/ui/components/badge';
import { ArrowRight } from 'lucide-react';
import { useAnimate } from 'motion/react';

const StatusButton = () => {
  const [scope, animate] = useAnimate();
  const onHover = () => {
    animate([
      ['.badge-green', { width: '375px' }, { duration: 0.3 }],
      ['.arrow', { display: 'block' }, { duration: 0.3 }],
    ]);
  };
  const onLeave = () => {
    animate([
      ['.arrow', { display: 'none' }],
      ['.badge-green', { width: '350px' }, { duration: 0.3 }],
    ]);
  };
  return (
    <div ref={scope} className="flex">
      <div
        className="badge-green cursor-pointer flex items-center gap-2 bg-emerald-50 rounded-full px-3 py-1 justify-start w-[350px]"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <Badge
          variant="outline"
          className="text-emerald-700 bg-white border-emerald-300 flex justify-center items-center gap-2"
        >
          <div className="size-3 bg-emerald-600 animate-pulse rounded-full"></div>
          Available
        </Badge>
        <p className="text-emerald-500 text-sm font-semibold">New project available in November</p>
        <ArrowRight className="arrow size-4 text-emerald-500 hidden" />
      </div>
    </div>
  );
};

export default StatusButton;
