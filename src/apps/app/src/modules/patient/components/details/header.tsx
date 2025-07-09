'use client';

import { useSession } from '@/src/app/(app)/(main)/_components/session-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Card, CardContent } from '@helsa/ui/components/card';
import { AlertTriangle, Mail, MessageSquare, Plus } from 'lucide-react';
import { usePatient } from '../../hooks/use-patient';

const civilStatuses: Record<string, string> = {
  SINGLE: 'Soltero/a',
  MARRIED: 'Casado/a',
  DIVORCED: 'Divorciado/a',
  WIDOWED: 'Viudo/a',
};

const educativeLevels: Record<string, string> = {
  PRIMARY: 'Primaria',
  SECONDARY: 'Secundaria',
  HIGH_SCHOOL: 'Bachillerato',
  UNIVERSITY: 'Universidad',
  POSTGRADUATE: 'Posgrado',
};

const HeaderPatient = ({ id }: { id?: string }) => {
  const { profile } = useSession();
  const { patient, isPending } = usePatient(id ?? profile.id, {
    user: true,
    contacts: true,
  });
  if (isPending || !patient) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <span>Cargando paciente...</span>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border">
              <AvatarImage src={patient.user?.image} className="object-contain" />
              <AvatarFallback className="text-lg">MG</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{patient.user?.name}</h1>
              <p className="text-muted-foreground">Sangre: {patient.biometric.bloodType}</p>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>{patient.user?.email}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">20 años</Badge>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-muted-foreground">Sangre: {patient.biometric.bloodType}</p>
              <p className="text-muted-foreground">Altura: {patient.biometric.height} cm</p>
              <p className="text-muted-foreground">Donante: {patient.biometric.organDonor}</p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">Estado civil: {civilStatuses[patient.demographic.civilStatus]}</p>
              <p className="text-muted-foreground">
                Nivel Educativo: {educativeLevels[patient.demographic.educativeLevel]}
              </p>
              <p className="text-muted-foreground">Ocupación: {patient.demographic.occupation}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Contacto emergencia:</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {patient.contacts!.length > 0 ? (
                  <>
                    <p>{patient.contacts?.[0]?.name ?? ''}</p>
                    <p>{patient.contacts?.[0]?.phone ?? ''}</p>
                  </>
                ) : (
                  <span>No hay contactos de emergencia registrados</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Cita
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contactar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderPatient;
