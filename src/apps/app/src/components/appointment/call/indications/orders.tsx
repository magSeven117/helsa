'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { OrderTypeValues } from '@helsa/engine/order/domain/enum-types';
import { Order } from '@helsa/engine/order/domain/order';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@helsa/ui/components/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { RadioGroup, RadioGroupItem } from '@helsa/ui/components/radio-group';
import { Textarea } from '@helsa/ui/components/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ellipsis, Loader2, Pencil, Plus } from 'lucide-react';
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
  const [isCreating, setIsCreating] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Primitives<Order> | undefined>(undefined);
  const toggle = () => setIsCreating((current) => !current);
  const editOrder = (order: Primitives<Order>) => {
    setEditingOrder(order);
    setIsCreating(true);
  };
  return (
    <>
      {!isCreating && <OrdersList orders={orders} toggle={toggle} edit={editOrder} />}
      {isCreating && (
        <OrdersForm patientId={patientId} appointmentId={appointmentId} toggle={toggle} editingOrder={editingOrder} />
      )}
    </>
  );
};

const OrdersList = ({
  orders,
  toggle,
  edit,
}: {
  orders: Primitives<Order>[];
  toggle: VoidFunction;
  edit: (order: Primitives<Order>) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div>
        <Button onClick={toggle} variant={'outline'}>
          <Plus className="size-4" />
          Agregar Orden
        </Button>
      </div>
      <div className="flex flex-col gap-3 grow max-h-[650px] overflow-y-scroll no-scroll">
        {orders?.map((order, index) => (
          <div
            key={`${order.id}-${index}`}
            className="flex flex-col items-start justify-between p-3 gap-2 border  rounded-lg"
          >
            <div className="flex justify-between items-center w-full">
              <div className="px-2 py-1 bg-color-brand-primary rounded-sm w-fit text-xs">{orderTypes[order.type]}</div>
              <p className="text-sm">{order.description}</p>
              <Badge variant={'outline'}>{orderStatus[order.status]}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 rounded-full hover:bg-color-secondary cursor-pointer">
                  <Ellipsis className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => edit(order)} className="flex items-center gap-2">
                    <Pencil className="size-4" />
                    Editar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
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
  editingOrder?: Primitives<Order>;
};

const OrdersForm = ({ patientId, appointmentId, toggle, editingOrder }: FormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: editingOrder ? editingOrder.type : 'TEST',
      description: editingOrder ? editingOrder.description : '',
    },
  });
  const { createOrder } = useAddIndications();
  const submit = async (values: FormSchema) => {
    try {
      const id = editingOrder ? editingOrder.id : v4();
      await createOrder({
        id,
        type: values.type as OrderTypeValues,
        description: values.description,
        appointmentId,
        patientId,
      });
      toast.success('Orden guardada correctamente');
      toggle();
    } catch (error) {
      console.log(error);
      toast.error('Error al guardar la orden');
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
