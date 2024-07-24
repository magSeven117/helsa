import { useStepper } from '@/libs/ducen-ui/components/stepper';
import { Button } from '@/libs/shadcn-ui/button';

export const Footer = ({ form }: { form?: boolean }) => {
  const { prevStep, resetSteps, hasCompletedAllSteps, isLastStep, isDisabledStep, nextStep } = useStepper();
  return (
    <>
      <div className="w-full flex justify-end gap-2 mb-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button disabled={isDisabledStep} onClick={prevStep} size="sm" variant="secondary">
              Prev
            </Button>
            {!form ? (
              <Button onClick={nextStep} size="sm">
                Next
              </Button>
            ) : (
              <Button size="sm" type="submit">
                {isLastStep ? 'Finish' : 'Next'}
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};
