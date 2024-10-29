'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/libs/shadcn-ui/components/card';
import { Hospital, Stethoscope, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SelectRoleForm = () => {
  const [role, setRole] = useState(null);
  const router = useRouter();
  const onContinue = () => {
    if (!role) return;

    router.push(`/onboarding?role=${role}`);
  }
  return (
    <div className="grid w-full h-full grow items-center px-20">
      <Card className="border-none shadow-none w-full mt-10">
        <CardHeader className='text-center'>
          <CardTitle>Elige tu rol</CardTitle>
          <CardDescription>Por favor elige tu rol para continuar</CardDescription>
        </CardHeader>
        <CardContent className="my-5">
          <div className="flex flex-col items-center justify-around gap-4 w-full h-32">
            <div
              className="flex items-center justify-start gap-4 p-4 w-1/2 border rounded-lg cursor-pointer hover:bg-primary hover:text-background transition-all duration-500 group"
              onClick={() => setRole('PATIENT')}
            >
              <User className="mb-2 h-8 w-8" />
              <div className='gap-2'>
                <p className='text-lg font-semibold'>Paciente</p>
                <p className=''>Si buscas atención médica, esta es tu opción</p>
              </div>
            </div>
            <div
              className="flex items-center justify-start gap-4 p-4 w-1/2 border rounded-lg cursor-pointer hover:bg-primary hover:text-background transition-all duration-500"
              onClick={() => setRole('DOCTOR')}
            >
              <Stethoscope className="mb-2 h-8 w-8" />
              <div className='gap-2'>
                <p className='text-lg font-semibold'>Doctor</p>
                <p className=''>
                  Si eres un profesional de la salud y buscas pacientes, esta es tu opción
                </p>
              </div>
            </div>
            <div
              className="flex items-center justify-start gap-4 p-4 w-1/2 border rounded-lg cursor-pointer hover:bg-primary hover:text-background transition-all duration-500"
              onClick={() => setRole('HOSPITAL')}
            >
              <Hospital className="mb-2 h-8 w-8" />
              <div className='gap-2'>
                <p className='text-lg font-semibold'>Hospital</p>
                <p className=''>
                  Si eres un hospital y buscas pacientes, esta es tu opción
                </p>
              </div>
            </div>
            <Button className='w-1/2' onClick={onContinue}>
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectRoleForm;
