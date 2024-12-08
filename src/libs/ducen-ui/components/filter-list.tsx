import { Button } from '@/libs/shadcn-ui/components/button';
import { Skeleton } from '@/libs/shadcn-ui/components/skeleton';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
const listVariant = {
  hidden: { y: 10, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.05,
      staggerChildren: 0.06,
    },
  },
};

const itemVariant = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export type FilterListProps = {
  filters: { [key: string]: string | number | boolean | string[] | number[] | null };
  loading: boolean;
  onRemove: (key: any) => void;
  renderFilter: ({ key, value }: { key: string; value: any }) => JSX.Element;
};

const FilterList = ({ filters, loading, onRemove, renderFilter }: FilterListProps) => {
  const handleOnRemove = (key: string) => {
    if (key === 'start') {
      onRemove({ end: null });
    }
    onRemove({ [key]: null });
  };

  return (
    <motion.ul variants={listVariant} initial="hidden" animate="show" className="flex gap-2">
      {loading && (
        <div className="flex space-x-2">
          <motion.li key="1" variants={itemVariant}>
            <Skeleton className="rounded-full h-8 w-[100px]" />
          </motion.li>
          <motion.li key="2" variants={itemVariant}>
            <Skeleton className="rounded-full h-8 w-[100px]" />
          </motion.li>
        </div>
      )}

      {!loading &&
        Object.entries(filters)
          .filter(([key, value]) => value !== null && key !== 'end')
          .map(([key, value]) => {
            return (
              <motion.li key={key} variants={itemVariant}>
                <Button
                  className="rounded-full h-8 px-3 bg-secondary hover:bg-secondary font-normal text-[#878787] flex items-center group"
                  onClick={() => handleOnRemove(key)}
                >
                  <X className="scale-0 group-hover:scale-100 transition-all w-0 group-hover:w-4" />
                  <span>
                    {renderFilter({
                      key,
                      value,
                    })}
                  </span>
                </Button>
              </motion.li>
            );
          })}
    </motion.ul>
  );
};

export default FilterList;
