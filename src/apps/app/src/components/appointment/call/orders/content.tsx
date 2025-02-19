'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Order } from '@helsa/engine/order/domain/order';
import { useState } from 'react';
import OrdersForm from './form';
import OrdersList from './list';

type Props = {
  data?: Primitives<Appointment>;
  orders: Primitives<Order>[];
};

const OrdersContent = ({ orders, data }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {!isEditing && <OrdersList data={data!} orders={orders} toggle={() => setIsEditing((current) => !current)} />}
      {isEditing && <OrdersForm data={data!} toggle={() => setIsEditing((current) => !current)} />}
    </>
  );
};

export default OrdersContent;
