'use client';

import { useTheme } from '@helsa/ui';
import { Button } from '@helsa/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@helsa/ui/components/dialog';
import { Label } from '@helsa/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@helsa/ui/components/radio-group';
import { Check, CreditCard, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { getCheckoutSession } from '../../api/subscription';

export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}
export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Descubre',
    price: 'Gratis',
    description: 'Para personas atentas de su salud',
    features: [
      '5 Terapias al mes',
      '20 Reportes al mes',
      '10K tokens de IA al mes',
      'Recordatorios de medicamentos y exámenes',
    ],
  },
  {
    id: 'standard',
    name: 'Pro',
    price: '$8/mes',
    description: 'Para personas que quieren empezar procesos de salud',
    features: ['Terapias ilimitadas', 'Reportes ilimitados', '2M tokens de IA al mes', 'Todo lo del plan gratuito'],
  },
  {
    id: 'pro',
    name: 'Familiar',
    price: '$16/mes',
    description: 'Para familias o parejas que quieren cuidar su salud',
    features: [
      'Interacciones ilimitadas con la IA',
      'Hasta 5 miembros del núcleo familiar',
      'Terapia familiar',
      'Seguimiento personalizado',
      'Todo lo del plan pro',
    ],
  },
];

const Prices = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>('free');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    setLoading(true);
    const data = await getCheckoutSession(selectedPlan);
    window.location.href = data.url;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upgrade to Pro</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Escoge tu plan</DialogTitle>
          <DialogDescription>
            Cada plan incluye un periodo de prueba gratuito de 14 días. Puedes cancelar en cualquier momento.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup value={selectedPlan ?? ''} onValueChange={setSelectedPlan} className="grid  grid-cols-1 gap-4 py-4">
          {plans.map((plan) => {
            return (
              <div key={plan.id} className="relative h-full">
                <RadioGroupItem value={plan.id} id={plan.id} className="peer sr-only" />
                <Label
                  htmlFor={plan.id}
                  className={`flex flex-col sm:flex-row items-start p-4 border rounded-lg cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5  h-full`}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-base font-semibold">{plan.name}</div>
                      <div className="text-base font-bold text-primary">{plan.price}</div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                    <ul className="mt-2 space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <Check className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
        <DialogFooter>
          <Button disabled={!selectedPlan} className="w-full sm:w-auto" onClick={handleSubscribe}>
            <CreditCard className="mr-2 h-4 w-4" />
            Continuar al pago
            {loading && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Prices;
