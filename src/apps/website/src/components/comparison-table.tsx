import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@helsa/ui/components/table';
import { Check, X } from 'lucide-react';

interface Feature {
  name: string;
  includedIn: string[];
}

interface FeatureComparisonTableProps {
  plans: string[];
  features: Feature[];
}

export function FeatureComparisonTable({ plans, features }: FeatureComparisonTableProps) {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-semibold text-center mb-8">Comparación de Características</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Característica</TableHead>
            {plans.map((plan) => (
              <TableHead key={plan} className="text-center">
                {plan}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              {plans.map((plan) => (
                <TableCell key={plan} className="text-center">
                  {feature.includedIn.includes(plan) ? (
                    <Check className="inline-block h-4 w-4 text-green-500" />
                  ) : (
                    <X className="inline-block h-4 w-4 text-red-500" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
