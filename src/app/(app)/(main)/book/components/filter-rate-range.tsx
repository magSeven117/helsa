import { Button } from '@/libs/shadcn-ui/components/button';
import { Slider } from '@/libs/shadcn-ui/components/slider';
import { Star } from 'lucide-react';
import { useState } from 'react';

type Props = {
  onSelect: (min: number) => void;
};

const RateRange = ({ onSelect }: Props) => {
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <div className="flex h-[150px] w-full items-center justify-around px-3 flex-col gap-3 " aria-hidden="true">
      <Slider
        value={[sliderValue]}
        onValueChange={(value) => setSliderValue(value[0] || 0)}
        min={0}
        max={5}
        aria-label="Range"
      />
      <Button
        className="w-full text-xs"
        variant="outline"
        disabled={sliderValue === 0}
        onClick={() => {
          if (sliderValue !== undefined) {
            onSelect(sliderValue);
          }
        }}
      >
        {sliderValue === 0 ? (
          'No mínimo'
        ) : (
          <div className="flex justify-center items-center gap-2">
            {sliderValue} <Star className="size-4" />
          </div>
        )}
      </Button>
    </div>
  );
};

export default RateRange;
