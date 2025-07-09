import { Primitives } from '@helsa/ddd/types/primitives';
import { Order } from '../domain/order';

export async function appointmentOrders(id: string) {
  const response = await fetch(`/api/v1/order?appointmentId=${id}`);
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
  const json = await response.json();
  return json.data as Primitives<Order>[];
}

export async function saveOrder(order: Partial<Primitives<Order>>) {
  const response = await fetch('/api/v1/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}
