import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@helsa/ui/components/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@helsa/ui/components/tooltip';
import { format } from 'date-fns';
import { Calendar, Clock, Eye, MapPin, Shapes, User, Video } from 'lucide-react';
import Link from 'next/link';
import { useSession } from '../../../auth/components/session-provider';
import { StateColumn } from '../table/columns';
import Cancel from './actions/cancel';
import Confirm from './actions/confirm';
import Pay from './actions/pay';
import ReSchedule from './actions/re-schedule';

type Props = {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  data?: Primitives<Appointment>;
};

const AppointmentDetailsSheet = ({ data, isOpen, setOpen }: Props) => {
  const { user } = useSession();
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-xl">
          <SheetHeader className="flex flex-row justify-between items-center gap-4 p-2">
            <div className="flex flex-row justify-start items-center gap-4">
              <div>
                <SheetTitle className="text-xl flex justify-start items-center">Detalle de la cita</SheetTitle>
                <StateColumn state={data?.status ?? 'SCHEDULED'} />
              </div>
            </div>
            <div className="flex gap-2 ">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/appointments/${data?.id}`}>
                      <Button variant={'ghost'} className="[&_svg]:size-5 cursor-pointer">
                        <Eye className="size-6 text-violet-500" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Ver detalles</p>
                  </TooltipContent>
                </Tooltip>

                {['CONFIRMED', 'STARTED', 'PAYED', 'READY'].includes(data?.status ?? 'SCHEDULED') && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/appointments/${data?.id}/call`}>
                        <Button variant={'ghost'} className="[&_svg]:size-5 cursor-pointer">
                          <Video className="size-6 animate-pulse text-green-500" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Iniciar consulta</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>
          </SheetHeader>

          <div className="flex justify-start w-full items-center gap-3 border-b  pb-5 mt-7">
            {data?.status !== 'CANCELLED' && (
              <>
                <ReSchedule status={data?.status ?? ''} />
                <Confirm status={data?.status ?? ''} />
                <Pay id={data?.id ?? ''} status={data?.status ?? ''} />
                <Cancel status={data?.status ?? ''} />
              </>
            )}
          </div>
          <div className="flex justify-between items-center gap">
            <div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
              <Shapes className="size-4" />
              Tipo de consulta
            </div>
            <div className="flex justify-start items-center gap-3">
              <div className="size-3 rounded-lg" style={{ backgroundColor: data?.type?.color }}></div>
              <span className="">{data?.type?.name}</span>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Fecha</p>
                <p className="text-sm">{format(data?.date ?? new Date(), 'PP')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Hora</p>
                <p className="text-sm">{format(data?.date ?? new Date(), 'pp')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Ubicación</p>
                <p className="text-sm">
                  {data?.doctor?.consultingRoomAddress?.address} Urb La Paz, Pampatar, Nueva Esparta
                </p>
              </div>
            </div>
          </div>

          {user.role === 'DOCTOR' ? (
            <div>
              <h3 className="text-sm font-medium mb-3">Paciente</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data?.patient?.user?.image || '/placeholder.svg'} alt={data?.patient?.user?.name} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{data?.patient?.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{data?.patient?.user?.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-medium mb-3">Médico</h3>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data?.doctor?.user?.image || '/placeholder.svg'} alt={data?.doctor?.user?.name} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{data?.doctor?.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{data?.doctor?.specialty?.name ?? ''}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 px-1 py-3">
            <p className="text-lg text-violet-500">Motivo de la consulta</p>
            <p className="text-sm text-muted-foreground">{data?.motive ?? ''}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppointmentDetailsSheet;
