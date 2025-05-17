'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { OrderTypeValues } from '@helsa/engine/order/domain/enum-types';
import { Order } from '@helsa/engine/order/domain/order';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { RadioGroup, RadioGroupItem } from '@helsa/ui/components/radio-group';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ellipsis, Loader2, ScrollText } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { z } from 'zod';
import { useAddIndications } from './use-indications';

const orderStatus = {
  PENDING: 'Pendiente',
  COMPLETED: 'Completado',
  CANCELED: 'Cancelado',
};
const orderTypes = {
  TEST: 'Prueba',
  REMITTANCE: 'Remisión',
};

export const Orders = ({
  orders,
  patientId,
  appointmentId,
}: {
  orders: Primitives<Order>[];
  patientId: string;
  appointmentId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggle = () => setIsEditing((current) => !current);
  return (
    <>
      {!isEditing && <OrdersList orders={orders} toggle={toggle} />}
      {isEditing && <OrdersForm patientId={patientId} appointmentId={appointmentId} toggle={toggle} />}
    </>
  );
};

const OrdersList = ({ orders, toggle }: { orders: Primitives<Order>[]; toggle: VoidFunction }) => {
  return (
    <div className="flex justify-between flex-col gap-4 flex-1">
      <div className="flex flex-col gap-3">
        {orders?.map((order, index) => (
          <div
            key={`${order.id}-${index}`}
            className="flex flex-col items-start justify-between p-3 gap-2 border  rounded-lg"
          >
            <div className="flex justify-between items-center w-full">
              <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">{orderTypes[order.type]}</div>
              <p className="text-sm">{order.description}</p>
              <Badge variant={'outline'}>{orderStatus[order.status]}</Badge>
              <Ellipsis className="size-4 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
      <Button onClick={toggle}>
        <ScrollText className="size-4" />
        Agregar Orden
      </Button>
    </div>
  );
};

const formSchema = z.object({
  type: z.enum(['TEST', 'REMITTANCE']),
  description: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

type FormProps = {
  toggle: VoidFunction;
  patientId: string;
  appointmentId: string;
};

const OrdersForm = ({ patientId, appointmentId, toggle }: FormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'TEST',
      description: '',
    },
  });
  const { createOrder } = useAddIndications();
  const submit = async (values: FormSchema) => {
    try {
      const id = v4();
      await createOrder({
        id,
        type: values.type as OrderTypeValues,
        description: values.description,
        appointmentId,
        patientId,
      });
      toast.success('Orden agregada correctamente');
      toggle();
    } catch (error) {
      console.log(error);
      toast.error('Error al agregar la orden');
    }
  };
  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(submit, (e) => console.log(e))}
        className="flex flex-col gap-4 justify-between flex-1"
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Tipo de orden</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-between items-center"
                  >
                    <FormItem className="flex  items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="TEST" />
                      </FormControl>
                      <FormLabel className="font-normal">Prueba</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center p-3 gap-3 border flex-1 space-y-0 rounded-lg">
                      <FormControl>
                        <RadioGroupItem value="REMITTANCE" />
                      </FormControl>
                      <FormLabel className="font-normal">Remisión</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm">Descripcion</FormLabel>
                <FormControl>
                  <Textarea {...field} className=""></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-3">
          <Button onClick={toggle} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting} className=" flex-1">
            {form.formState.isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar orden'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
