'use client'
import { Step, type StepItem, Stepper, useStepper } from "@/libs/ducen-ui/components/stepper";
import { Button } from "@/libs/shadcn-ui/button";
import SelectType from "./select-type";

const steps = [
	{ label: "Tipo de usuario", component: <SelectType></SelectType> },
	{ label: "Datos básicos" },
	{ label: "Complementar" },
] satisfies StepItem[];

export default function CompleteForm() {
	return (
		<div className="flex w-full flex-col gap-2">
			<Stepper initialStep={0} steps={steps}>
				{steps.map((stepProps, index) => {
					return (
						<Step key={stepProps.label} {...stepProps}>
							{ stepProps.component ? stepProps.component : <div>Step {index + 1}</div> }
						</Step>
					);
				})}
				<Footer />
			</Stepper>
		</div>
	);
}

const Footer = () => {
	const {
		nextStep,
		prevStep,
		resetSteps,
		hasCompletedAllSteps,
		isLastStep,
		isOptionalStep,
		isDisabledStep,
	} = useStepper();
	return (
		<>
			{hasCompletedAllSteps && (
				<div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
					<h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
				</div>
			)}
			<div className="w-full flex justify-end gap-2 mb-2">
				{hasCompletedAllSteps ? (
					<Button size="sm" onClick={resetSteps}>
						Reset
					</Button>
				) : (
					<>
						<Button
							disabled={isDisabledStep}
							onClick={prevStep}
							size="sm"
							variant="secondary"
						>
							Prev
						</Button>
						<Button size="sm" onClick={nextStep}>
							{isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
						</Button>
					</>
				)}
			</div>
		</>
	);
};