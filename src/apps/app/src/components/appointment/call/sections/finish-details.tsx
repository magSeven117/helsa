'use client';

import { useError } from '@/src/components/error';
import {
  appointmentInitialData,
  getAppointment,
  getNotes,
} from '@helsa/engine/appointment/infrastructure/api/http-appointment-api';
import { appointmentDiagnoses, patientDiagnoses } from '@helsa/engine/diagnostic/infrastructure/http-diagnosis-api';
import { appointmentOrders } from '@helsa/engine/order/infrastructure/http-oder-api';
import { appointmentTreatments, patientTreatments } from '@helsa/engine/treatment/infrastructure/http-treatment-api';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Card, CardContent } from '@helsa/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@helsa/ui/components/tabs';
import { useQueries, useQuery } from '@tanstack/react-query';
import { addMinutes } from 'date-fns/addMinutes';
import { format } from 'date-fns/format';
import { es } from 'date-fns/locale';
import {
  AudioLines,
  Calendar,
  ClipboardMinus,
  Clock,
  Loader2,
  NotebookPen,
  Pill,
  Printer,
  ScrollText,
  Stethoscope,
  User,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import Cancel from '../../details/actions/cancel';
import Confirm from '../../details/actions/confirm';
import Pay from '../../details/actions/pay';
import ReSchedule from '../../details/actions/re-schedule';
import { StateColumn } from '../../table/columns';
import { NotesContent } from '../details/notes';
import { Diagnoses } from '../indications/diagnoses';
import { Orders } from '../indications/orders';
import { Treatments } from '../indications/treatments';
import PayButton from './pay-button';

const FinishDetails = ({ id }: { id: string }) => {
  const { setError } = useError();
  const {
    data: appointment,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointment', id],
    initialData: appointmentInitialData,
    queryFn: async () =>
      getAppointment(id, {
        doctor: { include: { user: true } },
        patient: { include: { user: true } },
      }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-between px-5">
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col justify-between px-5">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-6 py-5">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <StateColumn state={appointment.status} />
              {['CONFIRMED', 'STARTED', 'PAYED', 'READY'].includes(appointment.status) && (
                <Link href={`/appointments/${id}/call`}>
                  <Button className="h-9 gap-2 border-emerald-500 text-emerald-500" variant={'outline'}>
                    <Video className="size-4" />
                    Entrar a llamada
                  </Button>
                </Link>
              )}
              <PayButton id={id} />
              {['CANCELED', 'FINISHED'].includes(appointment.status) && (
                <Button
                  variant="outline"
                  onClick={() =>
                    setError({
                      message: 'No se puede agendar seguimiento a una cita cancelada o finalizada',
                      status: 500,
                      title: 'Error al agendar seguimiento',
                      type: 'error',
                      action: {
                        label: 'Accion',
                        action: () => alert('Error'),
                        variant: 'outline',
                        icon: <Loader2 className="h-4 w-4 animate-spin" />,
                      },
                    })
                  }
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Seguimiento
                </Button>
              )}
            </div>
            <div>
              <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Paciente</h3>
              <div className="flex items-center mt-1 gap-2">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-border">
                  <img src={appointment.patient?.user?.image} alt="" />
                </div>
                <div>
                  <div className="flex items-center mt-1 gap-2">
                    <User className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">{appointment.patient?.user?.name}</span>
                  </div>
                  <div className="flex items-center mt-1 gap-2">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">{appointment.patient?.user?.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Fecha y Hora</h3>
              <div className="flex items-center mt-1 gap-2">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium">
                  {format(appointment.date, 'PPPP', {
                    locale: es,
                  })}{' '}
                </span>
              </div>
              <div className="flex items-center mt-1 gap-2">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium">
                  {appointment.hour} - {format(addMinutes(appointment.date ?? new Date(), 30), 'HH:mm')}
                </span>
              </div>
            </div>
            <div className="flex justify-start w-full items-center gap-3 border-b  pb-5 mt-7">
              {appointment?.status !== 'CANCELLED' && (
                <>
                  <ReSchedule status={appointment.status ?? ''} />
                  <Confirm status={appointment.status ?? ''} id={appointment.id ?? id} />
                  <Pay id={appointment.id ?? ''} status={appointment.status ?? ''} />
                  <Cancel status={appointment.status ?? ''} />
                </>
              )}
            </div>

            <div className="w-2/3">
              <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Motivo de la Consulta</h3>
              <p className="mt-1 prose">{appointment.motive}</p>
            </div>

            <HistoryDetails id={appointment.patientId} />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Button className="gap-2" variant="outline">
                <Printer className="h-4 w-4" />
                Descargar Receta
              </Button>
            </div>
            <TabsDetails id={appointment.id} patientId={appointment.patientId} doctorId={appointment.doctorId} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinishDetails;

const HistoryDetails = ({ id }: { id: string }) => {
  const { diagnoses, loading, treatments } = useQueries({
    queries: [
      {
        initialData: [],
        queryKey: ['diagnoses'],
        queryFn: async () => patientDiagnoses(id),
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['treatments'],
        queryFn: async () => patientTreatments(id),
        refetchOnWindowFocus: false,
      },
    ],
    combine: (results) => {
      const [diagnoses, treatments] = results;
      return {
        diagnoses: diagnoses.data,
        treatments: treatments.data,
        loading: diagnoses.isLoading || treatments.isLoading,
      };
    },
  });

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-xs font-medium text-muted-foreground mb-1">Cargando...</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg  font-medium text-[var(--color-brand-primary)]">Historial Clínico</h3>
      <p className="text-md  font-medium text-[var(--color-brand-primary)]">Diagnósticos previos:</p>
      <div className="flex flex-col gap-2">
        {diagnoses.map((diagnosis) => (
          <p key={diagnosis.id} className="flex gap-2 items-center">
            <Stethoscope className="text-violet-500" /> {diagnosis.description}
          </p>
        ))}
      </div>
      <p className="text-md  font-medium text-[var(--color-brand-primary)]">Tratamientos:</p>
      <div className="space-x-2 space-y-2">
        {treatments.map((treatment) => (
          <Badge key={treatment.id} className="rounded-sm text-sm" variant="secondary">
            {treatment.medication?.name} {treatment.medication?.dose}
          </Badge>
        ))}
      </div>
    </div>
  );
};

const TabsDetails = ({ id, patientId, doctorId }: { id: string; patientId: string; doctorId: string }) => {
  const { diagnoses, loading, notes, orders, recordings, transcriptions, treatments } = useQueries({
    queries: [
      {
        initialData: [],
        queryKey: ['treatments'],
        queryFn: async () => appointmentTreatments(id),
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['diagnosis'],
        queryFn: async () => appointmentDiagnoses(id),
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['orders'],
        queryFn: async () => appointmentOrders(id),
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['notes'],
        queryFn: async () => getNotes(id),
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['recordings'],
        queryFn: async () => {
          return [];
        },
        refetchOnWindowFocus: false,
      },
      {
        initialData: [],
        queryKey: ['transcriptions'],
        queryFn: async () => {
          return [];
        },
        refetchOnWindowFocus: false,
      },
    ],
    combine: (results) => {
      const [treatments, diagnoses, orders, notes, recordings, transcriptions] = results;
      return {
        diagnoses: diagnoses.data,
        treatments: treatments.data,
        orders: orders.data,
        notes: notes.data,
        recordings: recordings.data,
        transcriptions: transcriptions.data,
        loading:
          diagnoses.isLoading ||
          treatments.isLoading ||
          orders.isLoading ||
          notes.isLoading ||
          recordings.isLoading ||
          transcriptions.isLoading,
      };
    },
  });
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="text-xs font-medium text-muted-foreground mb-1">Cargando...</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md" />
        </div>
      </div>
    );
  }
  return (
    <Tabs defaultValue="orders" className="flex flex-col flex-1 h-max">
      <TabsList className="bg-transparent border-b-2 border-b-border rounded-none w-full justify-start">
        <TabsTrigger value="orders" className="gap-2  data-[state=active]:text-violet-500 cursor-pointer">
          <ScrollText className="size-4" /> Ordenes
        </TabsTrigger>
        <TabsTrigger value="treatments" className="gap-2  data-[state=active]:text-violet-500 cursor-pointer">
          <Pill className="size-4" />
          Tratamientos
        </TabsTrigger>
        <TabsTrigger value="diagnosis" className="gap-2  data-[state=active]:text-violet-500 cursor-pointer">
          <ClipboardMinus className="size-4" />
          Diagnósticos
        </TabsTrigger>
        <TabsTrigger value="notes" className="gap-2  data-[state=active]:text-violet-500 cursor-pointer">
          <NotebookPen className="size-4" />
          Notas
        </TabsTrigger>
        <TabsTrigger value="recordings" className="gap-2  data-[state=active]:text-violet-500 cursor-pointer">
          <Video className="size-4" />
          Grabaciones
        </TabsTrigger>
        <TabsTrigger value="transcriptions" className="gap-2  data-[state=active]:text-violet-500 cursor-pointer">
          <AudioLines className="size-4" />
          Transcripciones
        </TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="flex flex-col grow">
        <Orders orders={orders} appointmentId={id} patientId={patientId} />
      </TabsContent>
      <TabsContent value="treatments">
        <Treatments treatments={treatments} appointmentId={id} patientId={patientId} doctorId={doctorId} />
      </TabsContent>
      <TabsContent value="diagnosis" className="flex flex-col grow">
        <Diagnoses diagnoses={diagnoses} appointmentId={id} patientId={patientId} doctorId={doctorId} />
      </TabsContent>
      <TabsContent value="notes">
        <NotesContent id={id} notes={notes} />
      </TabsContent>
      <TabsContent value="recordings">
        {recordings.map((recording: any) => (
          <div key={recording.url} className="border-b py-3">
            <video src={recording.url} controls></video>
          </div>
        ))}
      </TabsContent>
      <TabsContent value="transcriptions">
        {transcriptions.map((recording: any) => (
          <div key={recording.url} className="border-b py-3">
            <a href={recording.url} download={true} target="_blank">
              {recording.start_time}
            </a>
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};
