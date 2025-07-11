export const getSubscription = async () => {
  const response = await fetch('/api/v1/payment', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch subscription data');
  }

  const data = await response.json();
  return data.data;
};

export const getCheckoutSession = async (plan: string) => {
  const response = await fetch(`/api/v1/payment/checkout/${plan}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const data = await response.json();
  return data;
};
