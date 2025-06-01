import { Button } from '@helsa/ui/components/button';
import { PolarEmbedCheckout } from '@polar-sh/checkout/embed';

const PayButton = ({ id }: { id: string }) => {
  const handleClick = async () => {
    const response = await fetch(`/api/v1/payment/appointment?appointmentId=${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to create payment checkout');
    }
    const url = await response.json();
    const checkout = await PolarEmbedCheckout.create(url.url, 'light');
  };
  return (
    <Button className="flex-1 w-full h-9 gap-2" variant={'secondary'} onClick={handleClick}>
      Pagar
    </Button>
  );
};

export default PayButton;
