export const getSubscription = async () => {
  try {
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
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
};

export const getCheckoutSession = async (plan: string) => {
  try {
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
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};
