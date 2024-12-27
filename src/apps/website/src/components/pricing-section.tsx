import { Button } from '@helsa/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { cn } from '@helsa/ui/lib/utils';
import { Check } from 'lucide-react';
import { FeatureComparisonTable } from './comparison-table';

interface PlanProps {
  name: string;
  price: string;
  features: string[];
}

interface PricingSectionProps {
  title: string;
  plans: PlanProps[];
  features: { name: string; includedIn: string[] }[];
}

export function PricingSection({ title, plans, features }: PricingSectionProps) {
  return (
    <div className="mt-8">
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={cn('sm:rounded-none', {
              'border-primary': index === 1,
            })}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Elegir Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <FeatureComparisonTable plans={plans.map((plan) => plan.name)} features={features} />
    </div>
  );
}
