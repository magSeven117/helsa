'use client';

import { Card, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';

type EmailFormValues = {
  email: string;
};

export const EmailSection = ({ email }: EmailFormValues) => {
  return (
    <Card className="rounded-none bg-transparent">
      <CardHeader className="">
        <div>
          <CardTitle>Email</CardTitle>
          <p className="text-muted-foreground text-sm mt-5">
            Tu dirección de correo electrónico es privada y no será compartida con nadie.
          </p>
          <p className="text-primary font-bold mt-3">{email}</p>
        </div>
      </CardHeader>
    </Card>
  );
};
