'use client';
import { Step, type StepItem, Stepper } from '@/libs/ducen-ui/components/stepper';
import { CompleteProvider } from './context';
import PrincipalInfo from './principal-info';
import SelectType from './select-type';

const steps = [
  { label: 'Tipo de usuario', component: <SelectType></SelectType> },
  { label: 'Datos básicos', component: <PrincipalInfo></PrincipalInfo> },
  { label: 'Complementar' },
] satisfies StepItem[];

export default function CompleteForm() {
  return (
    <CompleteProvider>
      <div className="flex w-full flex-col gap-2">
        <Stepper
          initialStep={0}
          steps={steps}
        >
          {steps.map((stepProps, index) => {
            return (
              <Step key={stepProps.label} {...stepProps}>
                {stepProps.component ? stepProps.component : <div>Step {index + 1}</div>}
              </Step>
            );
          })}
        </Stepper>
      </div>
    </CompleteProvider>
  );
}
