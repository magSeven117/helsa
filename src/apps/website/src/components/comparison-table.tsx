import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@helsa/ui/components/table';

interface Feature {
  name: string;
  benefits: string[];
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
              {feature.benefits.map((benefit, index) => (
                <TableCell key={`${feature.name}-${benefit}-${index}`} className="text-center">
                  {benefit}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
